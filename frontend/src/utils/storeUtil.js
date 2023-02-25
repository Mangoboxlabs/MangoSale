require('dotenv').config();
const fs = require('fs');
//Batch generation of interactive JS
const buildDir = "../../src/abi/";

const writeDir = "../../src/store/modules/abisMethods/"
if (!fs.existsSync(buildDir)) {
    throw new Error('ABI buildDir not exists');
}
if (!fs.existsSync(writeDir)) {
    throw new Error('ABI abisDirMap not exists');
}
const files = fs.readdirSync(buildDir);

console.log("All Contract Quantities：", files.length)
//Create index.js to export all contracts
let indexStr = ``, exportStr = `export default { `;
//Process all contracts
for (let i = files.length - 1; i >= 0; i--) {
    // Obtain a contract name 、 abi
    let file = JSON.parse(fs.readFileSync(buildDir + files[i]), 'utf8');
    let name = file.contract.name;
    let abi = file.V1.spec.messages;
    let tempFileStr = `
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
                state.contract = await connectContract(web3, '${name}')
            }
        }
        const state = {
            contract:null
        }
		const mutations = {};
	`
    let actions = ` const actions = { \n`;

    console.log("generate" + name + ".js")

    // To deal with index.js
    indexStr += `import ${name} from "@/store/modules/abisMethods/${name}";`
    exportStr += `${name},`
    // end To deal with index.js

    // Treatment Method
    for (let j = 0; j < abi.length; j++) {

        let functionObj = abi[j];
        //call methods
        if (functionObj.payable === false && functionObj.mutates === false) {
            // Processing parameters
            let params = functionObj.args;
            let tempParamStr = ``
            for (let k = 0; k < params.length; k++) {
                tempParamStr += params[k].name + ","
            }
            // Process parameter end

            tempParamStr = tempParamStr.substr(0, tempParamStr.length - 1)
            actions += `async ${functionObj.name[0]} ({rootState}${tempParamStr.length > 0 ? ',' : ''} ${tempParamStr}){
				    await judgeContract(rootState.app.web3)
				    const AccountId = await Accounts.accountAddress();
                     let data = await state.contract.query.${functionObj.name}(AccountId, {value, queryGasLimit},${tempParamStr})
                    data = formatResult(data);
                    return data
				
			},\n`

        }
        //end call methods
        //send methods
        if (functionObj.payable == false && functionObj.mutates == true) {
            // Processing parameters
            let params = functionObj.args;
            let tempParamStr = ``
            for (let k = 0; k < params.length; k++) {
                tempParamStr += params[k].name + ","
            }
            // Process parameter end

            tempParamStr = tempParamStr.substr(0, tempParamStr.length - 1)
            actions += `async ${functionObj.name} ({rootState}${tempParamStr.length > 0 ? ',' : ''} ${tempParamStr}){
                        await judgeContract(rootState.app.web3)
                        const injector = await Accounts.accountInjector();
                        const AccountId = await Accounts.accountAddress();
                        const timeMemory = new Date().getTime()
                        window.messageBox.push(timeMemory)
                        await state.contract.tx.${functionObj.name}( {storageDepositLimit, gasLimit},
                         //params
                  ${tempParamStr}
                ).signAndSend(AccountId, { signer: injector.signer }, result => {
                    if (result.status.isInBlock) {
                        console.log('in a block');
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                    }
                });
				
			},\n`

        }
        //end send methods
        // send with value methods
        if (functionObj.type == "function" && functionObj.stateMutability == "payable") {
            // Processing parameters
            let params = functionObj.args;
            let tempParamStr = ``
            for (let k = 0; k < params.length; k++) {
                tempParamStr += params[k].name + ","
            }
            // Process parameter end

            tempParamStr = tempParamStr.substr(0, tempParamStr.length - 1)
            actions += `${functionObj.name} ({rootState}, value ${tempParamStr.length > 0 ? ',' : ''} ${tempParamStr}){
                        judgeToken(rootState)
                        return new Promise((resolve,reject) => {
                            state.contract.methods.${functionObj.name}(${tempParamStr}).estimateGas({
                            from: rootState.app.account,
                        }).then(gas => {
                            state.contract.methods.${functionObj.name}(${tempParamStr}).send({
                                from: rootState.app.account,
                                gas: parseInt(gas * 1.2),
                                value: rootState.app.web3.utils.toWei(value)
                            }).then(res => {
                              let operateLogs = localStorage.getItem("operateLogs")?JSON.parse(localStorage.getItem("operateLogs")):[]
                              operateLogs.push({
                                name:"${functionObj.name}",
                                from:res.from,
                                to:res.to,
                                gasUsed:res.gasUsed,
                                blockHash: res.blockHash
                              })
                              if(operateLogs.length>20){
                                operateLogs.shift()
                              }
                              localStorage.setItem("operateLogs", JSON.stringify(operateLogs))
                              resolve(res)
                            })
                        }).catch(err=>{
                            reject(JSON.parse(err.message.substr(24,err.message.length)).message)
                        })
				    })
			},\n`

        }
        //end send with value methods
    }
    actions += `}`
    tempFileStr += actions
    // end Procedure

    tempFileStr += `
			export default {
			namespaced: true,
			mutations,
			state,
			actions
		}
	`
    fs.writeFileSync(`${writeDir}${name}.js`, tempFileStr, 'utf8');
}
//end Process all contracts
exportStr += `}`
indexStr += exportStr
fs.writeFileSync(`${writeDir}index.js`, indexStr, 'utf8');
