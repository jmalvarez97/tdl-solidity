// consultar el balance de la cuenta creadora de juego mediante ethersjs

const ethers = require('ethers')
const network = 'goerli'
const provider = ethers.getDefaultProvider(network)
const address = '0x9b6F4b9F0cDEBde2062Ad901Bb1a7cf08f88E54B'
provider.getBalance(address).then((balance) => {
 // convert a currency unit from wei to ether
 const balanceInEth = ethers.utils.formatEther(balance)
 console.log(`balance: ${balanceInEth} ETH`)
})