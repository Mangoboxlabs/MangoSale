/* eslint-disable */
import connectContract from "@/api/connectContract"
import {formatResult} from "@/utils/formatUtils"
import Accounts from "@/api/Account.js";

import {dealResult,reportErr} from "@/utils/dealResult"
const value = 0;
const queryGasLimit = -1;
const gasLimit = 3000n * 100000000n;
const storageDepositLimit = null;


async function judgeContract(web3,address) {
    state.contract = await connectContract(web3, 'token',address)
}

const state = {
    contract: null
}
const mutations = {};
const actions = {
    async queryInfo({rootState},address) {
        await judgeContract(rootState.app.web3,address)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.queryInfo(AccountId, {value, queryGasLimit},)
        data = formatResult(data);
        return data

    },
    async setConfigure({rootState}, {burn_tax, marketing_tax, marketing_address, transfer_limit, wallet_limit,address}) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.setConfigure({storageDepositLimit, gasLimit},
            //params
            burn_tax, marketing_tax, marketing_address, transfer_limit, wallet_limit
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "set")

        }).catch(err=>{
            reportErr(err)
        });

    },
    async get_configure({rootState}) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_configure(AccountId, {value, queryGasLimit},)
        data = formatResult(data);
        return data

    },
    async balanceOf({rootState}, {owner,address}) {
        await judgeContract(rootState.app.web3,address)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.balanceOf(AccountId, {value, queryGasLimit}, owner)
        data = formatResult(data);
        return data

    },
    async allowance({rootState}, owner, spender) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.allowance(AccountId, {value, queryGasLimit}, owner, spender)
        data = formatResult(data);
        return data

    },
    async transfer({rootState}, to, value) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.transfer({storageDepositLimit, gasLimit},
            //params
            to, value
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async approve({rootState}, {spender, value,address}) {

        await judgeContract(rootState.app.web3,address)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.approve({storageDepositLimit, gasLimit},
            //params
            spender, value
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "approve")

        }).catch(err=>{
            reportErr(err)
        });
    },
    async transfer_from({rootState}, from, to, value) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.transfer_from({storageDepositLimit, gasLimit},
            //params
            from, to, value
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
    async get_current_votes({rootState}, user) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_current_votes(AccountId, {value, queryGasLimit}, user)
        data = formatResult(data);
        return data

    },
    async get_prior_votes({rootState}, account, block_number) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.get_prior_votes(AccountId, {value, queryGasLimit}, account, block_number)
        data = formatResult(data);
        return data

    },
    async delegate({rootState}, delegatee) {
        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.delegate({storageDepositLimit, gasLimit},
            //params
            delegatee
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        });

    },
}
export default {
    namespaced: true,
    mutations,
    state,
    actions
}
