const abiMap ={
    mangoLock:{
        address:'5GJ2tM9JsCSkfHhS7gbP4dtzFWnGxb3W6R8bp72AyfnZvMa8',
        abi:require("../abi/mango_lock.json")
    },
    tokenFactory : {
        address:'5GmuLGx64vvavTkxyZRUYjckDQwg7kgmi3wk9TYwGHa5cMML',
        abi:require("../abi/token_factory.json")
    },
    mangoAirdrop:{
        address:'5Cc2bQSGoAZ51adtNT6fQLeXyR4dJnThX5psudzxhh4zNTSy',
        abi:require('../abi/mango_airdrop.json')
    },
    Erc20Hash:{
        address:'0x6b81fcb80496c9c4877c22c4eb907e5fcec2dd6c131cbead1f26ff1682e4641e',
    },
    token:{
        abi:require("../abi/erc20.json")
    }

}
export default abiMap
