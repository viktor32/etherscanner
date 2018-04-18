const assert = require('assert');
const Web3 = require('web3');
const EtherScanner = require('../index');

// ropsten testnet
let web3Provider = new Web3.providers.HttpProvider(`http://localhost:6082`);

let etherScanner = EtherScanner(web3Provider, 'trace');

describe('ScanTransaction with preinstalled txs', function() {

	this.timeout(30000);
	it('should find 0 transactions (tx to contract). tx - 0x44a4a202171441fabfa3b77eb8f42187a73263fe84e9963ee730e5cf9dad8758', (done) => {
		etherScanner.scanTransaction('0x44a4a202171441fabfa3b77eb8f42187a73263fe84e9963ee730e5cf9dad8758', (err, result) => {
			assert.equal(null, err);
			let txs = [];
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('should find 1 transactions (1 normal. tx to account). tx - 0x23fbd224651fa46aec3b69c923b5f472a8dc9f6b5dc4319c112a2daf4aa13043', (done) => {
		etherScanner.scanTransaction('0x23fbd224651fa46aec3b69c923b5f472a8dc9f6b5dc4319c112a2daf4aa13043', (err, result) => {
			let txs = [{
				hash: '0x23fbd224651fa46aec3b69c923b5f472a8dc9f6b5dc4319c112a2daf4aa13043',
				from: '0x81b7e08f65bdf5648606c89998a9cc8164397647',
				to: '0x65513ecd11fd3a5b1fefdcc6a500b025008405a2',
				value: 1000000000000000000,
				blockNumber: 3061850,
				blockHash: '0x5c61f5f4603eadfff4f50e318fbced72ad8d58b2b7c047eca99085a684b4bb27',
				isSuicide: false,
				type: 'CALL',
			}];
			assert.equal(null, err);
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('Tx to contract, tx to account from contract. should find 3 transactions. (1 normal, 2 internal). tx - 0x89253c4c641988083e19592c7befb1f0ec5811e4de4f19dff92925f5c6bd6dd7', (done) => {
		etherScanner.scanTransaction('0x89253c4c641988083e19592c7befb1f0ec5811e4de4f19dff92925f5c6bd6dd7', (err, result) => {
			assert.equal(null, err);
			let txs = [{
				blockNumber: 3061839,
				blockHash: '0x1ec39150d6d4c54dd85b65478089f2fe75b311a25cd0052ab0324ea61a036524',
				to: '0x36496509ceaff13e16940f2980bb342c4c29f934',
				from: '0xb546499a35c70c2b5707806181c732d6b34b8dc7',
				value: 10000000000000000,
				hash: '0x89253c4c641988083e19592c7befb1f0ec5811e4de4f19dff92925f5c6bd6dd7',
				type: 'CALL',
				isSuicide: false,
			}, {
				blockNumber: 3061839,
				blockHash: '0x1ec39150d6d4c54dd85b65478089f2fe75b311a25cd0052ab0324ea61a036524',
				to: '0x14f6cea293e9f6e3f6da0d5146779c2ebd5e1b23',
				from: '0x36496509ceaff13e16940f2980bb342c4c29f934',
				value: 1,
				hash: '0x89253c4c641988083e19592c7befb1f0ec5811e4de4f19dff92925f5c6bd6dd7',
				type: 'CALL',
				isSuicide: false,
			}, {
				blockNumber: 3061839,
				blockHash: '0x1ec39150d6d4c54dd85b65478089f2fe75b311a25cd0052ab0324ea61a036524',
				to: '0x36496509ceaff13e16940f2980bb342c4c29f934',
				from: '0x14f6cea293e9f6e3f6da0d5146779c2ebd5e1b23',
				value: 1,
				hash: '0x89253c4c641988083e19592c7befb1f0ec5811e4de4f19dff92925f5c6bd6dd7',
				type: 'CALL',
				isSuicide: false,
			}];
			assert.deepEqual(txs, result);
			done();
		});
	});
});

describe('ScanBlock with preinstalled blocks', function() {
	this.timeout(30000);
	it('should find 7 transactions . block - 3061839', (done) => {
		etherScanner.scanBlock(3061839, (err, result) => {
			assert.equal(null, err);
			assert.equal(7, result.length);
			done();
		});
	});
});
