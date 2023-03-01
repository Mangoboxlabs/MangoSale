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
        state.contract = await connectContract(web3, 'tokenFactory')
    }
}

const state = {
    contract: null
}
const mutations = {};
const actions = {
    async newErc20({rootState}, {
        erc20_code_hash,
        version,
        initial_supply,
        name,
        symbol,
        decimals,
        owner,
        burn_tax,
        marketing_tax,
        marketing_address,
        transfer_limit,
        wallet_limit
    }) {

        await judgeContract(rootState.app.web3)
        const injector = await Accounts.accountInjector();
        const AccountId = await Accounts.accountAddress();
        const timeMemory = new Date().getTime()
        window.messageBox.push(timeMemory)
        await state.contract.tx.newErc20({storageDepositLimit, gasLimit},
            //params
            erc20_code_hash, version, initial_supply, name, symbol, decimals, owner,       burn_tax,
            marketing_tax,
            marketing_address,
            transfer_limit,
            wallet_limit
        ).signAndSend(AccountId, {signer: injector.signer}, result => {
            dealResult(result, rootState.app.web3, state.contract, "Create")

        }).catch(err=>{
            reportErr(err)
        });

    },
    async getUserTokens({rootState}, owner) {
        await judgeContract(rootState.app.web3)
        const AccountId = await Accounts.accountAddress();
        let data = await state.contract.query.getUserTokens(AccountId, {value, queryGasLimit}, owner)
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
