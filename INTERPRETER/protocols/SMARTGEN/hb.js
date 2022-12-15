let response = {
    device:"",
    message:{method: "HB",message: "OK",retcode: "000000"},
    success: true
}
function init(params, logging, callback) {
    response.device = params.hostid;
    callback(response);
}

module.exports = init;
