const device = require('../../../SOCKET/schemas/device');
const config = require('../../../SOCKET/config.json');
let response = {
    device:"",
    message:"",
    deviceID:null,
    success: false
}
function init(params, logging, socket, callback) {
    logging.info(params)

    device.model.find({IDENTIFIER: params.params.hostid},(err,docs) => {
        if(docs.length<1) {
            response.success = false;
            response.message = JSON.stringify({
                "method": "login",
                "result":
                    {
                        "register": 0,
                        historic: config.server.protocol +":"+ config.protocols[2].port,
                        liveData: config.server.protocol +":"+ config.protocols[2].port,
                        "realTime": new Date().getTime(),
                        para_command: "01030000005045F6;0101000000503C36",
                        con_command: "01030000005045F6;0101000000503C36",
                        "online_rate": 15,
                        "offline_rate": 15,
                        "modulePort": 4,
                        "moduleBaud": 0
                    },
                "retcode": "000000"
            });
            callback(response);
        }
        else {
            device.model.update({_id: docs[0]._id},{
                LAST_SOCKET: socket.remotePort,
                LAST_IP:socket.remoteAddress,
                LAST_CON: Date.now(),
                STATUS: true
            })

            logging.info("DEVICE CONNECTED TO SERVER AS ",docs[0].IDENTIFIER)
            response.success = true;
            response.device = docs[0].IDENTIFIER;
            response.deviceID = docs[0].ObjectID;
            response.message = {
                method: "login",
                result:
                    {
                        register: 1,
                        historic: config.server.protocol +":"+ config.protocols[2].port,
                        liveData: config.server.protocol +":"+ config.protocols[2].port,
                        realTime: new Date().getTime(),
                        para_command: "01030000005045F6;0101000000503C36",
                        con_command: "01030000005045F6;0101000000503C36",
                        online_rate: 15,
                        offline_rate: 15,
                        data_mode:1,
                        moduletype:"HGM6120N",
                        modulePort:docs[0].MODULE_PORT,
                        moduleBaud:docs[0].MODULE_BAUD,
                    },
                retcode: "000000"
            };
            callback(response)
        }

    });

}



module.exports.init = init;
module.exports.extInit = (params, socket, callback) => {
    device.model.find({IDENTIFIER: params.hostid},(err,docs) => {
        if(docs.length<1) {
            response.success= false;
            callback(response)
        } else {
            device.model.updateOne({_id: docs[0]._id},{
                LAST_SOCKET: socket.remotePort,
                LAST_IP:socket.remoteAddress,
                LAST_CON: Date.now(),
                STATUS: true
            },(err,rest)=>{})
            response.success=true;
            response.device = docs[0].IDENTIFIER;
            response.deviceID = docs[0]._id.toString();
            response.moduleBaud = docs[0].MODULE_BAUD;
            response.modulePort = docs[0].MODULE_PORT;
            callback(response)
        }

    });
};

module.exports.logout = (port,address, id) => {
    device.model.updateOne({_id: id},{
        LAST_SOCKET: port,
        LAST_IP:address,
        LAST_CON: Date.now(),
        STATUS: false
    },(err,rest) => {
    })
}
