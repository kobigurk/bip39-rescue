let bitcoin = require('bitcoinjs-lib');
let bip39 = require('bip39');

let mnemonic = process.argv[2];
let keyIndex = process.argv[3];
let address = process.argv[4];
let amount = process.argv[5];
let txsRaw = process.argv[6];

let network = bitcoin.networks.bitcoin;
let seed = bip39.mnemonicToSeed(mnemonic);
let hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, network);
let keyPair = hdMaster.derivePath('m/44\'/0\'/0\'/0/' + keyIndex);

let txs = txsRaw.split(',');
console.log('Sending with mnemonic ' + keyPair.keyPair.toWIF() + ' (' + keyPair.getAddress() + ') to address ' + address + ' with amount ' + amount + ' from txs ' + txs);

let txb = new bitcoin.TransactionBuilder(network);

for (let i = 0; i < txs.length; i++) {
  let splitTx = txs[i].split('|');
  let txHash = splitTx[0];
  let index = parseInt(splitTx[1]);
  txb.addInput(txHash, index);
}
txb.addOutput(address, parseInt(amount));	

for (let i = 0; i < txs.length; i++) {
  txb.sign(i, keyPair);
}

console.log('-------------------');
console.log(txb.build().toHex());
