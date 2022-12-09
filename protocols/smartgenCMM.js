const net = require("net");
const config = require("../config.json");
let server = net.createServer();


const SimpleNodeLogger = require('simple-node-logger'),
    opts = {logFilePath:'./files/SmartGenCMM.log', timestampFormat:'YYYY-MM-DD HH:mm:ss',},
    log = SimpleNodeLogger.createSimpleLogger( opts );
const {response} = require("express");

log.setLevel("all")
let sockets = [];
let clients = {};

server.on("connection", (socket) => {
    socket.setKeepAlive(true);

    log.info("NEW CONNECTION: ", socket.remoteAddress,":",socket.remotePort);

    socket.on("data", function (data) {
        try {
            let params = JSON.parse(data.toString());
            existsNotLogin(socket,params.hostid,params);
            switch (params.method) {
                case "login":
                    let login = require("./SMARTGEN/login")
                    login.init(params,log,socket, response => {
                        if(response.success){
                            log.info("LOGIN FROM : ",socket.remotePort)
                            log.info(response)
                        }
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                case"LongCon":
                    let longcon = require("./SMARTGEN/longcon");
                    longcon(params,log,(response)=> {
                        if(response.success) {
                            log.info("LONGCON FROM : ",socket.remotePort);
                            log.info(response);
                            socket.write(JSON.stringify(response.message))
                        }
                    })
                    break
                case "reqdata":
                    let reqdata = require("./SMARTGEN/reqdata");
                    reqdata(params,log,(response) => {
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                case "HB":
                    let hb = require("./SMARTGEN/hb");
                    hb(params,log,(response) => {
                        log.info("HB FROM : ",socket.remotePort);
                        log.info(response);
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                default:
                    let smartGen = require("./SMARTGEN/default")
                    smartGen(params,log, (response) => {

                    });
                    break
            }
        } catch (e) {
            log.error(e);
        }
    })

    socket.on("error", () => {
        let login = require("./SMARTGEN/login")
        login.logout(socket.remotePort,socket.remoteAddress,clients[socket.remotePort].id)
        delete clients[socket.remotePort];
    })

})

function existsNotLogin(sock, hostId, params) {
    if(clients[sock.remotePort]) {

    }else {
        let login = require("./SMARTGEN/login")
        login.extInit(params,sock,res => {
            if(res.success) {
                clients[sock.remotePort] = {
                    port: sock.remotePort,
                    device: res.device,
                    id: res.deviceID,
                    socket: sock
                }
            }
        })
    }
}
function lookForIndexSocket(array, key) {
    for (const [i, value] of array.entries()) {
        if(value[0] == key){
            return i
        }
    }
}

function lookForIndexDeviceId(array, key) {
    for (const [i, value] of array.entries()) {
        if(value[0] == key){
            return i
        }
    }
}

server.on("listening", () => {
    log.info("SERVER LISTENING:",config.server.hostname," : ",config.protocols[2].port);
})


server.listen(config.protocols[2].port,config.server.hostname);

