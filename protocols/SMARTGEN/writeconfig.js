let response = {
    device:"",
    message:{method: "LongCon",message: "OK",retcode: "000000"},
    success: true
}
function init(params, logging, callback) {
    callback(response);
}

module.exports = init;
