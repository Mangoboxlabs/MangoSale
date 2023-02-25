import abiMap from "./apiMap";

const {ContractPromise} = require('@polkadot/api-contract');
import {eventBus} from "../utils/eventBus";


const ConnectContract = async (api, type, address) => {
    if (!api) {
        eventBus.$emit('message', {
            message: "Please connect",
            type: "error"
        })
        return
    }

    if (!address && abiMap[type].address) {
        address = abiMap[type].address
    }
    return new ContractPromise(api, abiMap[type].abi, address);
}

export default ConnectContract
