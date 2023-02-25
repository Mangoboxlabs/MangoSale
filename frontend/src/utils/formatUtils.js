import {eventBus} from "./eventBus";
//Processing results tool
const formatResult =  (result) =>{
    let str;
    if (result && result.output) {
        str = result.output.toHuman();
    }
    return str;
}
window.messageBox = []
const dealResult = (result,msg,timeMemory)=>{
    if (result.status.isFinalized || result.status.isInBlock) {
        result.events
            .filter(({ event: { section } }) => section === 'system')
            .forEach(({ event: { data, method } }) => {
                if (method === 'ExtrinsicFailed') {
                    const [dispatchError] = data
                    if (dispatchError.isModule) {
                        try {
                            const mod = dispatchError.asModule;
                            console.log(mod,mod.index,mod.error)
                            const error = data.registry.findMetaError(new Uint8Array([mod.index.toNumber(), mod.error.toNumber()]));

                            console.log("error:", error.name);
                            if(window.messageBox.indexOf(timeMemory) > -1){
                                eventBus.$emit('message', {
                                    type: "error",
                                    message: error.name
                                })

                                if (window.messageBox.indexOf(timeMemory) > -1) {
                                    window.messageBox.splice(window.messageBox.indexOf(timeMemory), 1);
                                }
                            }


                        }catch (e){
                            console.log(e)
                            eventBus.$emit('message', {
                                type: "error",
                                message:"ExtrinsicFailed"
                            })
                        }
                    }


                } else if (method === 'ExtrinsicSuccess') {
                    let message = msg?msg + " Success":"SUCCESS"

                    if(message&&window.messageBox.indexOf(timeMemory)>-1){
                        eventBus.$emit('message', {
                            type: "success",
                            message
                        })
                        if (window.messageBox.indexOf(timeMemory) > -1) {
                            window.messageBox.splice(window.messageBox.indexOf(timeMemory), 1);
                        }
                    }

                }
            });
    } else if (result.isError) {
        console.log('fail2,', result.toHuman());
    }
}

const dateFormat = (dateTime) => {
    const t = new Date(dateTime);
    const format = 'Y-m-d h:i:s';
    const year = t.getFullYear();
    const month = t.getMonth() + 1;
    const day = t.getDate();
    const hours = t.getHours();
    const minutes = t.getMinutes();
    const seconds = t.getSeconds();
    const hash = {
        'Y': year,
        'm': month>=10?month:`0${month}`,
        'd': day>=10?day:`0${day}`,
        'h': hours>=10?hours:`0${hours}`,
        'i': minutes>=10?minutes:`0${minutes}`,
        's': seconds>=10?seconds:`0${seconds}`
    };
    return format.replace(/\w/g, o => {
        return hash[o]
    })
}

const formatvoteDateTime = (dateTime,endTime) =>{
    dateTime = parseInt(dateTime.replace(/,/g, ""));
    endTime = parseInt(endTime.replace(/,/g, ""));

    return dateFormat(dateTime + endTime)
}
export {
    formatResult,
    formatvoteDateTime,
    dateFormat,
    dealResult
}
