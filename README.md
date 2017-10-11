# EtherScanner

 Module for parse ethereum transactions or block and get from them all Eth transfers (normal and "internal")
 
[![NPM version][npm-image]][npm-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url]

## Installation

```bash
npm install etherscanner
```

## Usage

```js
const EtherScanner = require('etherscaner');
const Web3 = require('web3');

let web3Provider = new Web3.providers.HttpProvider(`http://localhost:6082`);
// or if web3 initialized before
let web3Provider = web3.currentProvider;

let etherScanner = EtherScanner(web3Provider);

```

##### Get all transfers by transaction hash
```js
etherScanner.scanTransaction('0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274', (err, result) => {
	console.log(result);
});
```

result:
```json
[{
	"hash": "0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274",
	"from": "0x1617d6e2dca84fec5c17f37d4141d2c4ec5c6d05",
	"to": "0xd1a2511bc222f38f463c62c9254faf7b710835e4",
	"value": 10000000000000000,
	"blockNumber": 1818075,
	"blockHash": "0x402a1df2fe61dcc83bec29c1202938e2fd739d97e614dbab351561dc04b01cd3",
	"isInternal": false,
	"type": ""
}, {
	"hash": "0xc475f8bf9d2721b17f7c09944c2aa32ea943f452cb54ee0aefcb98ead0735274",
	"from": "0xd1a2511bc222f38f463c62c9254faf7b710835e4",
	"to": "0x1617d6e2dca84fec5c17f37d4141d2c4ec5c6d05",
	"value": 12468329110548072,
	"blockNumber": 1818075,
	"blockHash": "0x402a1df2fe61dcc83bec29c1202938e2fd739d97e614dbab351561dc04b01cd3",
	"isInternal": true,
	"type": "CALL"
}]

```
type - "" || CALL || CREATION || SELFDESTRUCT

##### Get all transfers by block number
```js
etherScanner.scanBlock(1822433, (err, result) => {
	console.log(result);
});
```

