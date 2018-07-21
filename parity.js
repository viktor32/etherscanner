const async = require('async');
const fs = require('fs');
const BigNumber = require('bignumber.js');

class Parity {

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
			(cb) => {
				this.web3.eth.getTransactionReceipt(hash, (err, result) => cb(err, result));
			},
			(receipt, cb) => {
				this._replayTransaction(hash, (err, result) => cb(err, receipt, result));
			},
			(receipt, trace, cb) => {
				if (trace.trace.some((row) => row.error)) {
					return cb(null, []);
				}
				const txs = [];
				trace.trace.forEach((callObject) => {
					if (parseInt(callObject.action.value, 16) > 0) {
						txs.push({
							blockNumber: receipt.blockNumber,
							blockHash: receipt.blockHash,
							to: this._getAddress(callObject.action.to),
							from: this._getAddress(callObject.action.from),
							value: new BigNumber(callObject.action.value).toString(),
							hash: hash,
							type: callObject.type,
							isSuicide: callObject.type == 'SELFDESTRUCT',
						});
					}
				});
				cb(null, txs);
			},
		], (err, transactions) => cb(err, transactions));
	}

	_replayTransaction(hash, cb) {
		this.requestId++;
		return this.web3.currentProvider.sendAsync({
			method: "trace_replayTransaction",
			params: [hash, ["trace"]],
			jsonrpc: "2.0",
			id: this.requestId.toString(),
		}, (err, result) => {
			if (err)
				return cb(err);
			if (result.error)
				return cb(result.error.message);
			return cb(null, result.result);
		});
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

module.exports = Parity;

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