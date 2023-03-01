const abiMap ={
    mangoLock:{
        address:'5FmRR5mawVsJM5joznywbwqJKCaUHyQwprNANyVJd5K3zQ6X',
        abi:require("../abi/mango_lock.json")
    },
    tokenFactory : {
        address:'5D3JqQBskZiT8NPeXy3gKHRHEtNQ5HpvcJ57sxy6X1W1k7HD',
        abi:require("../abi/token_factory.json")
    },
    mangoAirdrop:{
        address:'5DNJ1rhJZsBvCurnkp9V31ZX47mk7LnFbyQxA8FzHNZoXyTd',
        abi:require('../abi/mango_airdrop.json')
    },
    Erc20Hash:{
        address:'0xc0dea8848268dbe173d3b1a387cd78150fce9f21e937c2fd19ddbaf460f39c19',
    },
    token:{
        abi:require("../abi/erc20.json")
    }

}
export default abiMap
