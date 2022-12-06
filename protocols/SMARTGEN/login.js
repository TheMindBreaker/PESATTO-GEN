const db = require("../../dbcon");
const config = require('../../config.json');

function init(params, logging, socket, callback) {
    logging.info(params)
    let response = {
        device:"",
        message:"",
        success: false
    }
    db.query("SELECT * FROM devices WHERE uniqId = ?", [params.params.hostid],(error,result) => {

        if(result.length!=1) {
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
                        "online_rate": 5000,
                        "offline_rate": 5000,
                        "modulePort": 4,
                        "moduleBaud": 0
                    },
                "retcode": "000000"
            });
            callback(response);
        }
        else {
            db.query("UPDATE devices SET status=1,lastIP=?,lastSocket=? WHERE id=?",[socket.remoteAddress,socket.remotePort,result[0].id],(err,res)=>{})

            logging.info("DEVICE CONNECTED TO SERVER AS ",result[0].uniqId)
            response.success = true;
            response.device = result[0].uniqId;
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
                        online_rate: 5,
                        offline_rate: 5,
                        data_mode:1,
                        moduletype:"HGM6120N",
                        modulePort:4,
                        moduleBaud:params.params.moduleBaud,
                    },
                retcode: "000000"
            };
            callback(response)
        }

    })
}



module.exports = init;
