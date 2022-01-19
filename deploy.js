// deploy code will go here

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')



const provider = new HDWalletProvider(
    'phone tuition snap food orchard dirt pool struggle winter angle forest upgrade',
    'https://rinkeby.infura.io/v3/b40e8dd408444ef79a3ea68dade63915'
     
);

const web3 = new Web3(provider)

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])

    const contract_r = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [' Selam Rinkeby']})
    .send({gas: '1000000', from: accounts[0]})


    console.log(contract_r.options.address)

    provider.engine.stop()
}

deploy();