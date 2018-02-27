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

let pubKey = keyPair.getPublicKeyBuffer();
let pubKeyHash = bitcoin.crypto.hash160(pubKey);
let redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(pubKeyHash);
let redeemScriptHash = bitcoin.crypto.hash160(redeemScript);
let scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
let segwitAddress = bitcoin.address.fromOutputScript(scriptPubKey);

let txs = txsRaw.split(',');
console.log('Sending with WIF ' + keyPair.keyPair.toWIF() + ' (' + segwitAddress + ') to address ' + address + ' with amount ' + amount + ' from txs ' + txs);

let txb = new bitcoin.TransactionBuilder(network);

for (let i = 0; i < txs.length; i++) {
  let splitTx = txs[i].split('|');
  let txHash = splitTx[0];
  let index = parseInt(splitTx[1]);
  txb.addInput(txHash, index);
}
txb.addOutput(address, parseInt(amount));	

for (let i = 0; i < txs.length; i++) {
  let splitTx = txs[i].split('|');
  let value = parseInt(splitTx[2]);
  txb.sign(i, keyPair, redeemScript, null, value);
}

console.log('-------------------');
console.log(txb.build().toHex());
