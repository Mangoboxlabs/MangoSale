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
        state.contract = await connectContract(web3, 'mangoLock')
    }
}

const state = {
    contract: null
}
const mutations = {};
const actions = {
    async lock({rootState}, {contract, amount, end_time}) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)

        await state.contract.tx.lock({storageDepositLimit, gasLimit},
            //params
            contract, amount, end_time
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "Lock")

        }).catch(err=>{
            reportErr(err)
        });

    },
    async additional_tokens({rootState}, index, amount) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.additional_tokens({storageDepositLimit, gasLimit},
            //params
            index, amount
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async additional_time({rootState}, index, end_time) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.additional_time({storageDepositLimit, gasLimit},
            //params
            index, end_time
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async withdraw_token({rootState}, index) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.withdraw_token({storageDepositLimit, gasLimit},
            //params
            index
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async getUserLocks({rootState}) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getUserLocks(AccountId, {value, queryGasLimit},)
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
