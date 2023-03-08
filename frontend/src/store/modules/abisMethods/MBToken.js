
    /* eslint-disable */
		import connectContract from "@/api/connectContract"
        import { formatResult} from "@/utils/formatUtils"
        import Accounts from "@/api/Account.js";
      
        
        const value = 0;
        const queryGasLimit = -1;
        const gasLimit = 3000n * 100000000n;
        const storageDepositLimit = null;

	
		async function  judgeContract(web3){
            if(!state.contract){
                state.contract = await connectContract(web3, 'MBToken')
            }
        }
        const state = {
            contract:null
        }
		const mutations = {};
	 const actions = { 
async query_info ({rootState} ){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.query_info(AccountId, {value, queryGasLimit},)
                    data = formatResult(data);
                    return data
				
			},
async balance_of ({rootState}, owner){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.balance_of(AccountId, {value, queryGasLimit},owner)
                    data = formatResult(data);
                    return data
				
			},
async allowance ({rootState}, owner,spender){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.allowance(AccountId, {value, queryGasLimit},owner,spender)
                    data = formatResult(data);
                    return data
				
			},
async transfer ({rootState}, to,value){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.transfer( {storageDepositLimit, gasLimit},
                         //params
                  to,value
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async approve ({rootState}, spender,value){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.approve( {storageDepositLimit, gasLimit},
                         //params
                  spender,value
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async total_supply ({rootState} ){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.total_supply(AccountId, {value, queryGasLimit},)
                    data = formatResult(data);
                    return data
				
			},
async transfer_from ({rootState}, from,to,value){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.transfer_from( {storageDepositLimit, gasLimit},
                         //params
                  from,to,value
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async burn ({rootState}, from,value){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.burn( {storageDepositLimit, gasLimit},
                         //params
                  from,value
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async mint_token_by_owner ({rootState}, to,value){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.mint_token_by_owner( {storageDepositLimit, gasLimit},
                         //params
                  to,value
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async get_current_votes ({rootState}, user){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.get_current_votes(AccountId, {value, queryGasLimit},user)
                    data = formatResult(data);
                    return data
				
			},
async get_prior_votes ({rootState}, account,block_number){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.get_prior_votes(AccountId, {value, queryGasLimit},account,block_number)
                    data = formatResult(data);
                    return data
				
			},
async delegate ({rootState}, delegatee){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.delegate( {storageDepositLimit, gasLimit},
                         //params
                  delegatee
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},
async get_user_delegates ({rootState}, delegator){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.get_user_delegates(AccountId, {value, queryGasLimit},delegator)
                    data = formatResult(data);
                    return data
				
			},
async get_user_num_check_points ({rootState}, user){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.get_user_num_check_points(AccountId, {value, queryGasLimit},user)
                    data = formatResult(data);
                    return data
				
			},
async get_user_check_points ({rootState}, account,checkpoint){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.get_user_check_points(AccountId, {value, queryGasLimit},account,checkpoint)
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
	