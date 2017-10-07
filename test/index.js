const assert = require('assert');
const Web3 = require('web3');
const EtherScanner = require('../index');

// ropsten testnet
let web3Provider = new Web3.providers.HttpProvider(`http://localhost:6082`);

let etherScanner = EtherScanner(web3Provider, 'trace');

describe('ScanTransaction with preinstalled txs', () => {
	it('should find 0 transactions (tx to contract). tx - 0x488022389b00bf6b5d229b154e12035a13027e5c4ccc1daf5b6721c9e89abb05', (done) => {
		etherScanner.scanTransaction('0x488022389b00bf6b5d229b154e12035a13027e5c4ccc1daf5b6721c9e89abb05', (err, result) => {
			let txs = [];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});

	it('should find 1 transactions (1 normal. tx to account). tx - 0x8ebf82e5ecbd37cca58daa97fa1bb2eaacac3deef196f4dc5850327b0d08d139', (done) => {
		etherScanner.scanTransaction('0x8ebf82e5ecbd37cca58daa97fa1bb2eaacac3deef196f4dc5850327b0d08d139', (err, result) => {
			let txs = [{
				hash: '0x8ebf82e5ecbd37cca58daa97fa1bb2eaacac3deef196f4dc5850327b0d08d139',
				from: '0xc6333447926f047bc972ad53add8ae8dd963537c',
				to: '0x5a2244ee1956f1737d9b47fafd25712b7c13d4fa',
				value: 250000000000000000,
				blockNumber: 1818566,
				blockHash: '0xc3eee8ea254913842ee969e9381909244f53702ec188b56b2b301710eaa78f76',
				isInternal: false,
				type: ''
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});

	it('Tx to contract, tx to account from contract. should find 2 transactions. (1 normal, 1 internal). tx - 0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274', (done) => {
		etherScanner.scanTransaction('0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274', (err, result) => {
			let txs = [{
				hash: '0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274',
				from: '0x1617d6e2dca84fec5c17f37d4141d2c4ec5c6d05',
				to: '0xd1a2511bc222f38f463c62c9254faf7b710835e4',
				value: 10000000000000000,
				blockNumber: 1818075,
				blockHash: '0x402a1df2fe61dcc83bec29c1202938e2fd739d97e614dbab351561dc04b01cd3',
				isInternal: false,
				type: ''
			}, {
				hash: '0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274',
				from: '0xd1a2511bc222f38f463c62c9254faf7b710835e4',
				to: '0x1617d6e2dca84fec5c17f37d4141d2c4ec5c6d05',
				value: 12468329110548072,
				blockNumber: 1818075,
				blockHash: '0x402a1df2fe61dcc83bec29c1202938e2fd739d97e614dbab351561dc04b01cd3',
				isInternal: true,
				type: 'CALL'
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});

	it('Created contract from contract. should find 2 transactions. (1 normal, 1 internal). tx - 0x148216e25432a8dddb3ad85a10860d07c2e895f726bc20d3ca040c5685c648d9', (done) => {
		etherScanner.scanTransaction('0x148216e25432a8dddb3ad85a10860d07c2e895f726bc20d3ca040c5685c648d9', (err, result) => {

			let txs = [{
				hash: '0x148216e25432a8dddb3ad85a10860d07c2e895f726bc20d3ca040c5685c648d9',
				from: '0x0166685dd1fa8e6c061b13fc16fff3dea94e8ba2',
				to: '0x93515fe472d4da89a6937b442a2a19fb7f599925',
				value: 100000000000000000,
				blockNumber: 1818608,
				blockHash: '0x04a427b004cfb4ab86cca44d500923b31907674ef2b2b5dde141036c37e9fb4d',
				isInternal: false,
				type: ''
			}, {
				hash: '0x148216e25432a8dddb3ad85a10860d07c2e895f726bc20d3ca040c5685c648d9',
				from: '0x93515fe472d4da89a6937b442a2a19fb7f599925',
				to: '0xdfffd3b2378c18eb78d9b03083ef4df2a8a6ae54',
				value: 100000000000000000,
				blockNumber: 1818608,
				blockHash: '0x04a427b004cfb4ab86cca44d500923b31907674ef2b2b5dde141036c37e9fb4d',
				isInternal: true,
				type: 'CREATION'
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});
	
	it('Created contract from account with payment. should find 1 transaction. (1 normal). tx - 0xe1a95334f1fc1c50021c98da21ade30368d083d8b63eb3014bf78d18b731e536', (done) => {
		etherScanner.scanTransaction('0xe1a95334f1fc1c50021c98da21ade30368d083d8b63eb3014bf78d18b731e536', (err, result) => {
			let txs = [{
				hash: '0xe1a95334f1fc1c50021c98da21ade30368d083d8b63eb3014bf78d18b731e536',
				from: '0x86b1db31bb203eef507ff4002f01d556c076c2f9',
				to: '0xacb3b44deff7a28de951f3f99e99551c9a88464d',
				value: 120000000000000000,
				blockNumber: 1818744,
				blockHash: '0xcd253372df15d5c91194023f756816597b9923ef0ad32c6154ee5e1d25b0ad64',
				isInternal: false,
				type: ''
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});
	
	it('Selfdestruct contract. should find 1 transaction. (1 internal). tx - 0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2', (done) => {
		etherScanner.scanTransaction('0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2', (err, result) => {
			let txs = [ { hash: '0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2',
				from: '0xacb3b44deff7a28de951f3f99e99551c9a88464d',
				to: '0x86b1db31bb203eef507ff4002f01d556c076c2f9',
				value: 120000000000000000,
				blockNumber: 1819180,
				blockHash: '0xe72a9909cd820d5655fba9cf12ac920cfd81ece10758e44506b5be4e0b51780c',
				isInternal: true,
				type: 'SELFDESTRUCT' } ];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});
});

describe('ScanBlock with preinstalled blocks', function() {
	this.timeout(15000);
	it('should find 127 transactions (19 normal, 108 internal). block - 1822433', (done) => {
		etherScanner.scanBlock(1822433, (err, result) => {
			let normalTxs = result.filter(tx => !tx.isInternal);
			assert.equal(19, normalTxs.length);
			assert.equal(108, result.length - normalTxs.length);
			done();
		});
	});
	
	it('should find 48 transactions (34 normal, 0 internal). block - 1822432', (done) => {
		etherScanner.scanBlock(1822432, (err, result) => {
			let normalTxs = result.filter(tx => !tx.isInternal);
			assert.equal(34, normalTxs.length);
			assert.equal(0, result.length - normalTxs.length);
			done();
		});
	});
});
