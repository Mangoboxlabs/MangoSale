/* eslint-disable */
import connectContract from "@/api/connectContract"
import {formatResult} from "@/utils/formatUtils"
import Accounts from "@/api/Account.js";


const value = 0;
const queryGasLimit = -1;
const gasLimit = 3000n * 100000000n;
const storageDepositLimit = null;


async function judgeContract(web3) {
    if (!state.contract) {
        state.contract = await connectContract(web3, 'mango_airdrop')
    }
}

const state = {
    contract: null
}
const mutations = {};
const actions = {
    async new_airdrop({rootState}, token, title, information, description, start_time) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.new_airdrop({storageDepositLimit, gasLimit},
            //params
            token, title, information, description, start_time
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async distribution({rootState}, id, information) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.distribution({storageDepositLimit, gasLimit},
            //params
            id, information
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

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
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async get_user_collect({rootState}, id) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_user_collect(AccountId, {value, queryGasLimit}, id)
        data = formatResult(data);
        return data

    },
    async get_user_airdrops({rootState}, owner) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_user_airdrops(AccountId, {value, queryGasLimit}, owner)
        data = formatResult(data);
        return data

    },
    async get_all_airdrops({rootState}) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_all_airdrops(AccountId, {value, queryGasLimit},)
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
