let response = {
    device:"",
    message:{method: "LongCon",message: "OK",retcode: "000000"},
    success: true
}
const commands = require('../../../schemas/commands');

function init(params, logging, callback) {
    logging.warn(params)
    if(params.params) {
        if(params.params.split(",")[1] === "1") {
            commands.model.findOneAndUpdate({_id: params.uid}, {STATUS: 1, MESSAGE: "COMMAND EXECUTED ON DEVICE AND CONFIRMED"}, (err,result)=> {})
        } else {
            commands.model.findOneAndUpdate({_id: params.uid}, {STATUS: -1, MESSAGE: "COMMAND FAILD ON DEVICE"}, (err,result)=> {})
        }
    }
    callback(response);
}

module.exports = init;
