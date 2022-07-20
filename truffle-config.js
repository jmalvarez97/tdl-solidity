/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */
 //const {url , mnemonic } = require("./secrets.json");
 const {url, mnemonic} = require("./secretsRinkeby.json")
 const HDWallet = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_build_directory: './contracts',
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777",
    },
    goerli: {
        provider: () => { return new HDWallet(mnemonic, url) },
        network_id: "5",
        gas : 5500000,
        confirmations: 2,
        networkCheckTimeoutnetworkCheckTimeout: 10000,
        timeoutBlocks: 200
  },
    ropsten: {
      provider: () => { return new HDWallet(mnemonic, url) },
      network_id: 3,
      gas : 5500000,
      confirmations: 2,        // Ropsten has a lower block limit than mainnet
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    },

    rinkeby: {
      provider: () => { return new HDWallet(mnemonic, url) },
      network_id: 4,
      gas : 5500000,
      confirmations: 2,        // Ropsten has a lower block limit than mainnet
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    }

},

  compilers: {
    solc: {
      version: "0.8.7"
    }
  }
};