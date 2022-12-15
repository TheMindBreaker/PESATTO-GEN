let response = {
    device:"",
    message:"",
}

function init(params, logging, callback){
    logging.warn(params);
    callback(response);
}

module.exports = init;
