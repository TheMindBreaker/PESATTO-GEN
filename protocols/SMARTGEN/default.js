let response = {
    device:"",
    message:"",
}
const commands = require("../schemas/commands");

function init(params, logging, callback){
    logging.warn(params);
    callback(response);
}

module.exports = init;
