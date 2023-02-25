/* eslint-disable */
import {eventBus} from "./eventBus";
export function reportErr(err){
    eventBus.$emit('message', {
        type: "error",
        message:err
    })
}
export function dealResult(result,web3,contract,message){
    if (result.isInBlock || result.isFinalized) {
        console.log(result)
        if(result.isCompleted){
            eventBus.$emit('message', {
                message: message + " isCompleted",
                type: "success"
            })
        }
        result.events
            // find/filter for failed events
            .filter(({ event }) =>
                web3.events.system.ExtrinsicFailed.is(event)
            )
            // we know that data for system.ExtrinsicFailed is
            // (DispatchError, DispatchInfo)
            .forEach(({ event: { data: [error, info] } }) => {
                if (error.isModule) {
                    // for module errors, we have the section indexed, lookup
                    const decoded = contract.registry.findMetaError(error.asModule);
                    const { docs, method, section } = decoded;

                    console.log(`${section}.${method}: ${docs.join(' ')}`);
                    eventBus.$emit('message', {
                        type: "error",
                        message:`${section}.${method}: ${docs.join(' ')}`
                    })

                } else {
                    // Other, CannotLookup, BadOrigin, no extra info
                    console.log(error.toString());
                    eventBus.$emit('message', {
                        type: "error",
                        message:error.toString()
                    })
                }
            });
    }
}
