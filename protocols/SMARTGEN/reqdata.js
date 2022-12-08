const Modbus = require("modbus-pdu");
const device_values = require("./db/device_values");
let response = {
    device:"",
    message:{method: "reqdata",message: "OK",retcode: "000000"},
    success: true
}


function init(params, logging,callback) {

    logging.info("REQDATA :",params);
    let data = params.params.split(";");
    data.forEach(info => {
        if(info !="") {
            let realInfo = info.substring(2);
            realInfo = realInfo.slice(0, -4);
            switch (realInfo.slice(0,2)) {
                case "01":
                    Modbus.ReadCoils.Response.parse(Buffer.from(realInfo,"hex"));
                    break
                case "03":
                    device_values(Modbus.ReadHoldingRegisters.Response.parse(Buffer.from(realInfo,"hex")).map(res => parseInt(res.toString("hex"),16)),params.hostid,logging);
                    break

            }
        }

    })
    callback(response);
}

module.exports = init;
