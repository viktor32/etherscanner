const Web3 = require('web3');
const logger = require('log4js').getLogger('etherscanner');
const async = require('async');
const fs = require('fs');

class EtherScanner {
	
	/**
	 *
	 * @param HttpProvider
	 * @param loggerLevel
	 */
	constructor(HttpProvider, loggerLevel = 'OFF') {
		logger.level = loggerLevel;
		
		this.web3 = new Web3(HttpProvider);
		if(!this.web3.isConnected()) {
			logger.error("Ethereum node is not connected");
			return;
		}
		logger.info('WEB3 connected');
	}
	
	scanBlock(number, cb) {
		this.web3.eth.getBlock(number, (err, block) => {
			if(err) return cb(err);
			if(!block) return cb(number, []);
			let result = [];
			async.eachSeries(block.transactions, (txHash, cb) => {
				this.scanTransaction(txHash, (err, transactions) => {
					if(err) return cb(err);
					result = result.concat(transactions);
					return cb();
				});
			}, (err) => cb(err, result));
		});
	}
	
	scanTransaction(hash, cb) {
		let transactions = [];
		async.waterfall([
			cb => {
				this.web3.eth.getTransaction(hash, (err, tx) => {
					if(err) {
						logger.error(`Get transaction ${hash} error`, err);
						return cb(err)
					}
					return cb(null, tx);
				});
			},
			// add real tx
			(tx, cb) => {
				if(!tx.to && tx.value == 0)
					return cb(null, tx);
				
				if(tx.value == 0)
					return cb(null, tx);
				
				return this.web3.eth.getTransactionReceipt(hash, (err, receipt) => {
					if(receipt.status == '0x1') {
						transactions.push({
							hash: hash,
							from: tx.from,
							to: tx.to,
							value: tx.value.toNumber(),
							blockNumber: tx.blockNumber,
							blockHash: tx.blockHash,
							isInternal: false,
							type: ''
						});
					}
					return cb(null, tx);
				});
			},
			// scan and add internal transactions
			(tx, cb) => {
				this._checkOffChainTx(tx, (err, txs, createContractAddress) => {
					if(err)
						return cb(err);
					if(transactions.length && !transactions[0]['to'])
						transactions[0]['to'] = createContractAddress;
					transactions = transactions.concat(txs.map(tx => ({
						hash: tx.hash,
						from: tx.from,
						to: tx.to,
						value: tx.value,
						blockNumber: tx.blockNumber,
						blockHash: tx.blockHash,
						isInternal: true,
						type: tx.kind
					})));
					cb(null, transactions);
				});
			}
		], (err) => cb(err, transactions));
	}
	_checkOffChainTx(tx, cb) {
		this._getTransactionsFromTrace(tx.hash, (err, internalTransactions) => {
			if(err) return cb(err);
			let transactions = [];
			internalTransactions.forEach(stackRow => {
				stackRow.transfers.forEach(internalTx => transactions.push({
					blockNumber: tx.blockNumber,
					blockHash: tx.blockHash,
					to: this._getAddress(internalTx.to),
					from: this._getAddress(internalTx.from),
					value: internalTx.value,
					hash: tx.hash,
					kind: internalTx.kind,
					isSuicide: internalTx.kind == 'SELFDESTRUCT'
				}));
			});
			cb(null, transactions, internalTransactions.length ? internalTransactions[0]['accountAddress'] : '');
		});
	}
	
	/**
	 * Description:
	 *      Not all accruals of balances in the ether network are
	 *      saved on the blockchain. This is due to the fact
	 *      that funds can be transferred to the address from contract
	 *      We're interested here in capturing value transfers between accounts.
	 *      To do so, we need to watch for several opcodes: CREATE, CALL,
	 *      CALLCODE, DELEGATECALL, and SUICIDE. CREATE and CALL can
	 *      result in transfers to other accounts. CALLCODE and DELEGATECALL
	 *      don't transfer value, but do create new failure domains, so we
	 *      track them too. SUICIDE results in a transfer of any remaining
	 *      balance back to the calling account.
	 *
	 *      Since a failed call, due to out of gas, invalid opcodes, etc,
	 *      causes all operations for that call to be reverted, we need
	 *      to track the set of transfers that are pending in each call,
	 *      which consists of the value transfer made in the current call,
	 *      if any, and any transfers from successful operations so far.
	 *      When a call errors, we discard any pending transsfers it had.
	 *      If it returns successfully - detected by noticing the VM depth
	 *      has decreased by one - we add that frame's transfers to our own.
	 *
	 * @param txHash
	 * @param cb
	 * @private
	 */
	_getTransactionsFromTrace(txHash, cb) {
		return this.web3.currentProvider.sendAsync({
			method: "debug_traceTransaction",
			params: [txHash, {tracer: `{data: [], step: ${fs.readFileSync(__dirname + '/traceStepFunction.js').toString()}, result: function() { return this.data; }}`, Timeout: "60s"}],
			jsonrpc: "2.0",
			id: "2"
		}, (err, result) => {
			if(result.error)
				return cb(result.error.message);
			return cb(null, result.result);
		});
	}
	
	_getAddress(value) {
		if(!value)
			return value;
		if(value.match(/^0x[a-zA-Z0-9]{40}/))
			return value;
		
		let address = this.web3.toHex(value);
		while(address.length < 42)
			address = address.replace(/^0x/, '0x0');
		return address;
	}
}

module.exports = (HttpProvider, loggerLevel) => {
	let scanner = new EtherScanner(HttpProvider, loggerLevel);
	return {
		scanBlock: scanner.scanBlock.bind(scanner),
		scanTransaction: scanner.scanTransaction.bind(scanner)
	}
};

/**
 * @typedef {object} etherscannerObj
 * @property {String} etherscannerObj.hash
 * @property {String} etherscannerObj.from
 * @property {String} etherscannerObj.to
 * @property {Number} etherscannerObj.value
 * @property {Number} etherscannerObj.blockNumber
 * @property {String} etherscannerObj.blockHash
 * @property {Boolean} etherscannerObj.isInternal
 * @property {String} etherscannerObj.type
 */