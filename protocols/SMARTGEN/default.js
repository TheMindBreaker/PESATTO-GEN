let response = {
    device:"",
    message:"",
}
function init(params, logging, callback) {
    logging.info(params)
    callback(response);
}

module.exports = init;
