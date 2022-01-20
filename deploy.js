// deploy code will go here

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')



const provider = new HDWalletProvider(
    '',  // Mnemonic words here !
    'https://rinkeby.infura.io/v3/b40e8dd408444ef79a3ea68dade63915'  // Infura API key for rinkeby network
     
);

const web3 = new Web3(provider)

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])

    const contract_r = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [' Selam Rinkeby']})         // Deploy the contract to Rinkeby test network 
    .send({gas: '1000000', from: accounts[0]})


    console.log(contract_r.options.address)

    provider.engine.stop()
}

deploy();
