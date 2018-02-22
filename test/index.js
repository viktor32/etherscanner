const assert = require('assert');
const Web3 = require('web3');
const EtherScanner = require('../index');

// ropsten testnet
let web3Provider = new Web3.providers.HttpProvider(`http://localhost:6082`);

let etherScanner = EtherScanner(web3Provider, 'trace');

describe('ScanTransaction with preinstalled txs', function() {
	
	this.timeout(30000);
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

	it('CALL with ether value is still sent. should find 1 transaction. (1 internal). tx - 0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2', (done) => {
		etherScanner.scanTransaction('0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2', (err, result) => {
			let txs = [{
				hash: '0x879952951cca5c3192d153579b29b4ea1f7d56d0783ca4b67d1377cfd1dff5e2',
				from: '0xacb3b44deff7a28de951f3f99e99551c9a88464d',
				to: '0x86b1db31bb203eef507ff4002f01d556c076c2f9',
				value: 120000000000000000,
				blockNumber: 1819180,
				blockHash: '0xe72a9909cd820d5655fba9cf12ac920cfd81ece10758e44506b5be4e0b51780c',
				isInternal: true,
				type: 'SELFDESTRUCT'
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});

	it('Selfdestruct contract. should find 1 transaction. (1 internal). tx - 0xfd8c6b06617ca5c5eb528024cf383e150daa0988ee2b998cbaf3c01b951d1b8a', (done) => {
		etherScanner.scanTransaction('0xfd8c6b06617ca5c5eb528024cf383e150daa0988ee2b998cbaf3c01b951d1b8a', (err, result) => {
			let txs = [{
				hash: '0xfd8c6b06617ca5c5eb528024cf383e150daa0988ee2b998cbaf3c01b951d1b8a',
				from: '0xe380e3d54880d2ed3ae9e8970e34268262a24c40',
				to: '0x86e6f572f57a49595defb8cbd2af84fa50d36b49',
				value: 5000000000000000000,
				blockNumber: 1711480,
				blockHash: '0xa9095edfbe84dde5a4adf387b904cacc55f35b7081f17ee368e058791883266e',
				isInternal: true,
				type: 'CALL'
			}];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});

	it('tx - 0x9fe73c221f5e61260ff590f92a16deed0ffd7856f507cc0e8d3b9db0a3456957', (done) => {
		etherScanner.scanTransaction('0x9fe73c221f5e61260ff590f92a16deed0ffd7856f507cc0e8d3b9db0a3456957', (err, result) => {
			let txs = [];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});
	it('should find 52 zero transactions. tx - 0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75', (done) => {
		etherScanner.scanTransaction('0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75', (err, result) => {
			let txs = [
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
				from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
				to: '0xe4aeb0a8b8d976a47852064d6fd9aef1aaf270dc',
				value: 0,
				blockNumber: 2695144,
				blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
				isInternal: true,
				type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xe4aeb0a8b8d976a47852064d6fd9aef1aaf270dc',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x8d0eaf77e56a8a6f36a5f09029f09e24110594ad',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8d0eaf77e56a8a6f36a5f09029f09e24110594ad',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x10c818d5520de4116569dcb53fbbbc48a5e64f1a',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x10c818d5520de4116569dcb53fbbbc48a5e64f1a',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x644fec7d6329af53a78ab9b3eeda9d098b3d7ace',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x644fec7d6329af53a78ab9b3eeda9d098b3d7ace',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x8351517f9e2efb7fe097884400c6aac255e8acb6',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8351517f9e2efb7fe097884400c6aac255e8acb6',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xb4e8d9e92ff11c83f1b2fb82e1e91ef9596abd0b',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xb4e8d9e92ff11c83f1b2fb82e1e91ef9596abd0b',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x495bfb82b861fe49a863f27d27fd72cf206ef67d',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x495bfb82b861fe49a863f27d27fd72cf206ef67d',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xf923517f2ba3715286a5650c20b7ce85afeb5334',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xf923517f2ba3715286a5650c20b7ce85afeb5334',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xcbc7c8fbcdf12ffbba291c897f3c611d88935ff7',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xcbc7c8fbcdf12ffbba291c897f3c611d88935ff7',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x732015a1e2819a76610d82cee623a4b6dca30114',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x732015a1e2819a76610d82cee623a4b6dca30114',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x7b52e308cb240692afe9d27df4f0d15cda517490',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x7b52e308cb240692afe9d27df4f0d15cda517490',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xee89c97eee3525048f9a89a66b3c66ac19944af1',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xee89c97eee3525048f9a89a66b3c66ac19944af1',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xd3cb9c794911225074d756c6bf23c79125c5e695',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xd3cb9c794911225074d756c6bf23c79125c5e695',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x2f76af7d0b41279ccb103d34a8db0413a48d291e',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x2f76af7d0b41279ccb103d34a8db0413a48d291e',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x803f1b0f1d4e69f450f7cf59f0f36f7963b85cfc',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x803f1b0f1d4e69f450f7cf59f0f36f7963b85cfc',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xbbe623c455154ff33a3cb4f1dcff3718ad935030',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xbbe623c455154ff33a3cb4f1dcff3718ad935030',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x3e1d55af446dbac16e4373450293bb5182165803',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x3e1d55af446dbac16e4373450293bb5182165803',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x3e604b6078c383587c80a7c778fee3dbe98ee335',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x3e604b6078c383587c80a7c778fee3dbe98ee335',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xf030fcc06602aa96c143f486481885ffcd23377e',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xf030fcc06602aa96c143f486481885ffcd23377e',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xe0ce04ce93833ddf01b0f89b65865f9da29efb82',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xe0ce04ce93833ddf01b0f89b65865f9da29efb82',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xfa9d19b452dc1f16e0ae4d850de841752f15adce',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xfa9d19b452dc1f16e0ae4d850de841752f15adce',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x6727ef511b72cbee9f1c8e1c7611c5c02e29a8f2',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x6727ef511b72cbee9f1c8e1c7611c5c02e29a8f2',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x640bde5e6126de0a457413d967c7db3ee9a03e07',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x640bde5e6126de0a457413d967c7db3ee9a03e07',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x9bec95578a8bab31c7123210dd188c8f9f8c08e2',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x9bec95578a8bab31c7123210dd188c8f9f8c08e2',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0xc9d8eb0ecbb18bdd3f2e77917d3fbd8973771f62',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0xc9d8eb0ecbb18bdd3f2e77917d3fbd8973771f62',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x8bd0d48bbd7f5ccf48d2f26c5a8c261e646868e2',
					to: '0x66c1e9510a653900446d6b658197aebdadcd1ee9',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'CREATION' },
				{ hash: '0x063b5c5e57a0a09208bde401b4b0e9974e21906f0422070ed919f4e11d416a75',
					from: '0x66c1e9510a653900446d6b658197aebdadcd1ee9',
					to: '0x8355b546a202ce6be74ba7d1a93e6db5d6bebbf4',
					value: 0,
					blockNumber: 2695144,
					blockHash: '0xd6502db0238c1eb50068571c9fd6a25c2e9598dbca6f8cd7714a7c86c611047d',
					isInternal: true,
					type: 'SELFDESTRUCT' }
					];
			assert.deepEqual(txs, result);
			assert.equal(null, err);
			done();
		});
	});
	
	it('tx - 0x9bf2190ad13ca90e96162c96437d53e8647debf376916577e350c90d8824ef4a', (done) => {
		etherScanner.scanTransaction('0x9bf2190ad13ca90e96162c96437d53e8647debf376916577e350c90d8824ef4a', (err, result) => {
			// TODO add test
			done();
		});
	});
});

describe('ScanBlock with preinstalled blocks', function() {
	this.timeout(30000);
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
