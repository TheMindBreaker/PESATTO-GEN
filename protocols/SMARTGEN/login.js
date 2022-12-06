const db = require("../../dbcon");


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
                        "historic": "f3530f55fe70.sn.mynetname.net:5003",
                        "liveData": "f3530f55fe70.sn.mynetname.net:5003",
                        "realTime": new Date().getTime(),
                        "para_command": "01030000005045F6; 01030000005045F6",
                        "con_command": "01030000005045F6; 01030000005045F6",
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
                        historic: "f3530f55fe70.sn.mynetname.net:5004",
                        liveData: "f3530f55fe70.sn.mynetname.net:5003",
                        realTime: new Date().getTime(),
                        para_command: "01010000001C3DC3;01030000005045F6;",
                        con_command: "01010000001C3DC3;01030000005045F6;",
                        online_rate: 5,
                        offline_rate: 5,
                        data_mode:1,
                        moduletype:"HGM6120N",
                        modulePort:params.params.modulePort,
                        moduleBaud:params.params.moduleBaud,
                    },
                retcode: "000000"
            };
            logging.info(response);
            callback(response)
        }

    })
}



module.exports = init;
