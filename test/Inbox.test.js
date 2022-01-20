// contract test code will go here

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')

const web3 = new Web3(ganache.provider());    // To connect ganache local test network

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {

    /* web3.eth.getAccounts()
        .then(fetchedAccounts =>{
            console.log(fetchedAccounts);
        }) */

    accounts = await web3.eth.getAccounts();       // To get accounts 
    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there']})       // Deploying the contract to ganache local test network
        .send({from: accounts[0], gas: '1000000'})


});



describe('Inbox', () => {
   
    it('deploys a contract', ()=>{

        assert.ok(inbox.options.address);
    });

    it('It has a default message', async ()=> {

        const message = await inbox.methods.message().call()
        assert.equal(message,'Hi there')                                    // Test Cases

    });

    it('can change the message', async ()=> {

        await inbox.methods.setMessage('Salih').send({from: accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message,'Salih')
    })


})

