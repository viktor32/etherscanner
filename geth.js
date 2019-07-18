const logger = require('log4js').getLogger('etherscanner');
const async = require('async');
const fs = require('fs');
const BigNumber = require('bignumber.js');

class Geth {

	constructor(web3) {
		this.requestId = 1;
		this.web3 = web3;
	}

	scanBlock(number, cb) {
		this.web3.eth.getBlock(number, (err, block) => {
			if (err) return cb(err);
			if (!block) return cb(number, []);
			let result = [];
			async.each(block.transactions, (txHash, cb) => {
				this.scanTransaction(txHash, (err, transactions) => {
					if (err) return cb(err);
					result = result.concat(transactions);
					return cb();
				});
			}, (err) => cb(err, result));
		});
	}

	scanTransaction(hash, cb) {
		async.waterfall([
			cb => {
				this.web3.eth.getTransactionReceipt(hash, (err, tx) => {
					if(err) {
						logger.error(`Get transaction ${hash} error`, err);
						return cb(err)
					}
					if(!tx) {
						return cb('Transaction not found');
					}
					// if(!tx.blockNumber) {
					// 	return cb('Unconfirmed transaction');
					// }
					return cb(null, tx);
				});
			},
			(tx, cb) => {
				if (tx.status === '0x0') {
					return cb(null, []);
				}
				return this._getTransactionCalls(tx, (err, result) => cb(err, result));
			}
		], (err, transactions) => cb(err, transactions));
	}

	_getTransactionCalls(tx, cb) {
		this._getTransactionsFromTrace(tx.transactionHash, tx.blockNumber, (err, result) => {
			if (err) {
				return cb(err);
			}
			return cb(null, this._getTransactionsFromCall(tx, result));
		});
	}

	_getTransactionsFromCall(tx, callObject) {
		let txs = [];
		if (parseInt(callObject.value, 16) > 0) {
			txs.push({
				blockNumber: tx.blockNumber,
				blockHash: tx.blockHash,
				to: this._getAddress(callObject.to),
				from: this._getAddress(callObject.from),
				value: new BigNumber(callObject.value).toString(),
				hash: tx.transactionHash,
				type: callObject.type,
				isSuicide: callObject.type == 'SELFDESTRUCT',
			});
		}
		if (!callObject.calls) {
			return txs;
		}
		callObject.calls.forEach(_callObject => {
			txs = txs.concat(this._getTransactionsFromCall(tx, _callObject));
		});
		return txs;
	}

	_getTransactionsFromTrace(txHash, txBlockNumber, cb) {
		async.waterfall([
			(cb) => {
				this.web3.eth.getBlockNumber((err, blockNumber) => {
					return cb(err, blockNumber);
				});
			},
			(blockNumber, cb) => {
				this.requestId++;
				return this.web3.currentProvider.sendAsync({
					method: "debug_traceTransaction",
					params: [txHash, { tracer: "callTracer", reexec: txBlockNumber ? (blockNumber - txBlockNumber + 20) : 200, timeout: "60s"}],
					jsonrpc: "2.0",
					id: this.requestId.toString(),
				}, (err, result) => {
					if (err)
						return cb(err);
					if (result.error)
						return cb(result.error.message);
					return cb(null, result.result);
				});
			},
		], cb);
	}

	_getAddress(value) {
		if (!value)
			return value;
		if (value.match(/^0x[a-zA-Z0-9]{40}/))
			return value;

		let address = this.web3.toHex(value);
		while(address.length < 42)
			address = address.replace(/^0x/, '0x0');
		return address;
	}
}

module.exports = Geth;

/**
 * @typedef {object} etherscannerObj
 * @property {String} hash
 * @property {String} from
 * @property {String} to
 * @property {Number} value
 * @property {Number} blockNumber
 * @property {String} blockHash
 * @property {Boolean} isInternal
 * @property {String} type
 */
