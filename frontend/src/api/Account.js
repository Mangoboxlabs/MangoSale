import {
    web3Accounts,
    web3Enable,
    web3FromAddress
} from '@polkadot/extension-dapp';
/* eslint-disable*/
import {eventBus} from "../utils/eventBus"
let showErr = false
const accountList = async () => {
    const allInjected = await web3Enable('MangoBox');

    if (allInjected.length === 0) {
        console.error("!!!!! No wallet extention detected!!");
        return {
            status:false,
            type:"wallet",
            msg:"No wallet extention detected!"
        } ;
    }
    const allAccounts = await web3Accounts();
    if (!allAccounts) {
        console.error("no valid accounts available!");
        return{
            status:false,
            type:"account",
            msg:"Sorry, there is no account！"
        }  ;
    }
    return{
        status:true,
        allAccounts
    };
}
const accountAddress = async () =>{
    let accountAddress;
    const allInjected = await web3Enable('MangoBox');
    if (allInjected.length === 0) {
        console.error("!!!!! No wallet extention detected!!");
        // return;
    }
    const Accounts = JSON.parse(sessionStorage.getItem('account'));
    if (Accounts && Accounts.length > 0) {
        accountAddress = sessionStorage.getItem('currentAccount');
    } else {
        let accounts = await accountList
        if(accounts&&accounts.allAccounts&&accounts.allAccounts.length>0){
            accountAddress = sessionStorage.getItem('currentAccount');
        }else{
            if(!showErr){
                showErr = true
                // eventBus.$emit('message', {
                //     type: "error",
                //     message: "Please connect"
                // })
                setTimeout(()=>{
                    showErr = false
                },1000)
            }

        }

    }
    return accountAddress;

}
const accountName = async () =>{
    let accountName;
    const allInjected = await web3Enable('MangoBox');
    if (allInjected.length === 0) {
        console.error("!!!!! No wallet extention detected!!");
        return;
    }
    const Accounts = JSON.parse(sessionStorage.getItem('account'));
    if (Accounts && Accounts.length > 0) {
        accountName = Accounts[0].meta.name;
    } else {
        accountName = '';

    }
    return accountName;

}
const accountInjector = async () => {
    let injector;
    const Accounts = JSON.parse(sessionStorage.getItem('account'));

    if (Accounts && Accounts.length > 0) {
        const AccountId = sessionStorage.getItem('currentAccount');
        injector = await web3FromAddress(AccountId);
    }
    return injector;

}
export default {
    accountList,
    accountAddress,
    accountName,
    accountInjector,
}
