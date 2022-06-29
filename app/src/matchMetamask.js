const ethers = require('ethers');
const url = "https://eth-goerli.g.alchemy.com/v2/M1RrvssTvMF6yg1eGSY_EPQkzEUQ88dx";
const mnemonic = "burst define same episode negative hero mistake attend fire surround allow letter";
//ethers.getDefaultProvider(url);

let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
console.log(mnemonicWallet.privateKey);