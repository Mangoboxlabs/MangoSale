/* eslint-disable */
import connectContract from "@/api/connectContract"
import {formatResult} from "@/utils/formatUtils"
import Accounts from "@/api/Account.js";
import {dealResult,reportErr} from "@/utils/dealResult"

const value = 0;
const queryGasLimit = -1;
const gasLimit = 3000n * 100000000n;
const storageDepositLimit = null;


async function judgeContract(web3) {
    if (!state.contract) {
        state.contract = await connectContract(web3, 'mangoAirdrop')
    }
}

const state = {
    airdropList:[],
    contract: null
}
const mutations = {
    SET_List(state,data){
        state.airdropList = data
    },
};
const actions = {
    async newAirdrop({rootState},{ token, title, information, description, start_time}) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.newAirdrop({storageDepositLimit, gasLimit},
            //params
            token, title, information, description, start_time
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "Create")

        }).catch(err=>{
            reportErr(err)
        });

    },

    async distribution({rootState}, {id, information}) {
        console.log(id, information)
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.distribution({storageDepositLimit, gasLimit},
            //params
            id, information
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "Distribution")

        }).catch(err=>{
            reportErr(err)
        });

    },
    async getIdDistribution({rootState}, id) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getIdDistribution(AccountId, {value, queryGasLimit}, id)
        data = formatResult(data);
        return data

    },
    async getIdCollect({rootState}, id) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getIdCollect(AccountId, {value, queryGasLimit}, id)
        data = formatResult(data);
        return data

    },
    async collect({rootState}, id) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.collect({storageDepositLimit, gasLimit},
            //params
            id
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "Claim")

        }).catch(err=>{
            reportErr(err)
        });

    },
    async getUserCollect({rootState}, id) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getUserCollect(AccountId, {value, queryGasLimit}, id)
        data = formatResult(data);
        return data

    },
    async getUserAirdrops({rootState}, owner) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getUserAirdrops(AccountId, {value, queryGasLimit}, owner)
        data = formatResult(data);
        return data

    },
    async getAllAirdrops({rootState}) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getAllAirdrops(AccountId, {value, queryGasLimit},)
        data = formatResult(data);
        return data

    },


}
export default {
    namespaced: true,
    mutations,
    state,
    actions
}
