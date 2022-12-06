const Modbus = require("modbus-pdu");
const crc16 = require("node-crc16");
const {parseAddressValue} = require("modbus-pdu/lib/Helpers");
let response = {
    device:"",
    message:{method: "reqdata",message: "OK",retcode: "000000"},
    success: true
}


function init(params, logging, callback) {
    let data = params.params.split(";");
    logging.info("+++++++++++++++++++++++++++++++++++++DATA++++++++++++++++++++++++++")
    data.forEach(info => {
        if(info !="") {
            let realInfo = info.substring(2);
            realInfo = realInfo.slice(0, -4);
            switch (realInfo.slice(0,2)) {
                case "01":
                    logging.info(Modbus.ReadCoils.Response.parse(Buffer.from(realInfo,"hex")));
                    break
                case "03":
                    logging.info(Modbus.ReadHoldingRegisters.Response.parse(Buffer.from(realInfo,"hex")).map(res => parseInt(res.toString("hex"),16)));
                    break

            }
        }

    })
    callback(response);
}

module.exports = init;
