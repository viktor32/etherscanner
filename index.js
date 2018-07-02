const Web3 = require('web3');
const logger = require('log4js').getLogger('etherscanner');
const async = require('async');
const fs = require('fs');
const Geth = require('./geth.js');
const Parity = require('./parity.js');

class EtherScanner {

	/**
	 *
	 * @param HttpProvider
	 * @param loggerLevel
	 */
	constructor(HttpProvider, loggerLevel = 'OFF') {
		logger.level = loggerLevel;

		this.requestId = 1;

		this.web3 = new Web3(HttpProvider);
		if (!this.web3.isConnected()) {
			logger.error("Ethereum node is not connected");
			return;
		}
		logger.info('WEB3 connected');
		this.node = this.web3.version.node.match(/Parity/) ? new Parity(this.web3) : new Geth(this.web3);
	}
}

module.exports = (HttpProvider, loggerLevel) => {
	let scanner = new EtherScanner(HttpProvider, loggerLevel);

	return {
		scanBlock: scanner.node.scanBlock.bind(scanner.node),
		scanTransaction: scanner.node.scanTransaction.bind(scanner.node),
	}
};

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