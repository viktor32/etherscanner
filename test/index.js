const assert = require('assert');
const Web3 = require('web3');
const EtherScanner = require('../index');

// ropsten testnet
let web3Provider = new Web3.providers.HttpProvider(`https://parity-ropsten.pixelplex.io`);

let etherScanner = EtherScanner(web3Provider, 'trace');

describe('ScanTransaction with preinstalled txs', function() {

	this.timeout(30000);
	it('should find 0 transactions (tx to contract with error). tx - 0x4ea1bb56abfd2b309794b6f537d202580fe24d53382c6ef775258cf6084fca30', (done) => {
		etherScanner.scanTransaction('0x4ea1bb56abfd2b309794b6f537d202580fe24d53382c6ef775258cf6084fca30', (err, result) => {
			assert.equal(null, err);
			let txs = [];
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('should find 2 transactions (tx to contract and from contract). tx - 0x14aeb207242b261a622ded82a61a05ed10fa760462a7a8ecfda2a63d6793dfad', (done) => {
		etherScanner.scanTransaction('0x14aeb207242b261a622ded82a61a05ed10fa760462a7a8ecfda2a63d6793dfad', (err, result) => {
			assert.equal(null, err);
			let txs = [{
				"blockNumber": 3555600,
				"blockHash": "0xd680f04e3d38922958ceac83dee2721746087f104a2de4b31e8a85bb31f65785",
				"to": "0x975e178c53850123755814c6bb6446d462381c48",
				"from": "0x5b08e4596b6c21d8190a8e745d6e028d57680bb3",
				"value": 10000000000000,
				"type": "call",
				"hash": "0x14aeb207242b261a622ded82a61a05ed10fa760462a7a8ecfda2a63d6793dfad",
				"isSuicide": false,
			}, {
				"blockNumber": 3555600,
				"blockHash": "0xd680f04e3d38922958ceac83dee2721746087f104a2de4b31e8a85bb31f65785",
				"to": "0x5b08e4596b6c21d8190a8e745d6e028d57680bb3",
				"from": "0x975e178c53850123755814c6bb6446d462381c48",
				"value": 10000000000000,
				"type": "call",
				"hash": "0x14aeb207242b261a622ded82a61a05ed10fa760462a7a8ecfda2a63d6793dfad",
				"isSuicide": false,
			}];
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('should find 1 transactions. tx - 0xf1bb68e0cea722a3e1afecbf68d1e48cc20ef29a00108ce25030e782d1678193', (done) => {
		etherScanner.scanTransaction('0xf1bb68e0cea722a3e1afecbf68d1e48cc20ef29a00108ce25030e782d1678193', (err, result) => {
			assert.equal(null, err);
			let txs = [{
				"blockNumber": 3555593,
				"blockHash": "0x622785c4e06053a7f11249d8a46f95dddd3b75c062787e07073469daeb91ead8",
				"to": "0x250807fb63e4a3d8f08208402983f0cbfa074444",
				"from": "0xec41db4dd92ddea990f30e2daec8ab1471f8dbb5",
				"value": 100000,
				"type": "call",
				"hash": "0xf1bb68e0cea722a3e1afecbf68d1e48cc20ef29a00108ce25030e782d1678193",
				"isSuicide": false,
			}];
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('should find 1 transaction. tx - 0x6baa6981120a984f0bf8b637445c2e7228de7b53b190e21158765824d8776e8f', (done) => {
		etherScanner.scanTransaction('0x6baa6981120a984f0bf8b637445c2e7228de7b53b190e21158765824d8776e8f', (err, result) => {
			assert.equal(null, err);
			let txs = [{
				"blockNumber": 3555715,
				"blockHash": "0xca24403cda309839a09b95a417fa77818d6667c822e9965614d5b5951117b0c9",
				"to": "0x20ed1ef0f608606585aad411d01ad858c463306c",
				"from": "0x776d658cf9fe5024610c324e8d370182874f12c4",
				"value": 3000000000000000,
				"type": "call",
				"hash": "0x6baa6981120a984f0bf8b637445c2e7228de7b53b190e21158765824d8776e8f",
				"isSuicide": false,
			}];
			assert.deepEqual(txs, result);
			done();
		});
	});

	it('should find 1 transaction. tx - 0x180d8ffccbae5338b39a7ca1be86427ce878579b0ca65824ed5f30c8ebc37def', (done) => {
		etherScanner.scanTransaction('0x180d8ffccbae5338b39a7ca1be86427ce878579b0ca65824ed5f30c8ebc37def', (err, result) => {
			assert.equal(null, err);
			let txs = [{
				"blockNumber": 3555715,
				"blockHash": "0xca24403cda309839a09b95a417fa77818d6667c822e9965614d5b5951117b0c9",
				"to": "0xb0fe6752d27dd6874a2884ffffc05e9f497dd688",
				"from": "0x81b7e08f65bdf5648606c89998a9cc8164397647",
				"value": 10 ** 18,
				"type": "call",
				"hash": "0x180d8ffccbae5338b39a7ca1be86427ce878579b0ca65824ed5f30c8ebc37def",
				"isSuicide": false,
			}];
			assert.deepEqual(txs, result);
			done();
		});
	});
});
//
// describe('ScanBlock with preinstalled blocks', function() {
// 	this.timeout(30000);
// 	it('should find 7 transactions . block - 3061839', (done) => {
// 		etherScanner.scanBlock(3061839, (err, result) => {
// 			assert.equal(null, err);
// 			assert.equal(7, result.length);
// 			done();
// 		});
// 	});
// });
