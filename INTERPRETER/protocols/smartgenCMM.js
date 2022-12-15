const net = require("net");
const config = require("../../SOCKET/config.json");
let server = net.createServer();

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {logFilePath: './files/SmartGenCMM.log', timestampFormat: 'YYYY-MM-DD HH:mm:ss',},
    log = SimpleNodeLogger.createSimpleLogger(opts);
const {response} = require("express");


const login = require("./SMARTGEN/login");
const smartGen = require("./SMARTGEN/default")
const longcon = require("./SMARTGEN/longcon");
const reqdata = require("./SMARTGEN/reqdata");
const writeConfig = require("./SMARTGEN/writeconfig");
const hb = require("./SMARTGEN/hb");


const commands = require("../schemas/commands");

log.setLevel("all")
let clients = {};

server.on("connection", (socket) => {
    log.info("NEW CONNECTION: ", socket.remoteAddress, ":", socket.remotePort);
    socket.setKeepAlive(true);
    socket.setTimeout(10000);
    socket.on("data", function (data) {
        try {
            let params = JSON.parse(data.toString());
            existsNotLogin(socket, params.hostid, params);
            switch (params.method) {
                case "login":
                    login.init(params, log, socket, response => {
                        if (response.success) {
                            log.info("LOGIN FROM : ", socket.remotePort)
                            log.info(response)
                        }
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                case"LongCon":
                    longcon(params, log, (response) => {
                        if (response.success) {
                            log.info("LONGCON FROM : ", socket.remotePort);
                            log.info(response);
                            socket.write(JSON.stringify(response.message))
                        }
                    })
                    break
                case "reqdata":
                    reqdata(params, log, (response) => {
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                case "writeConfig":
                    writeConfig(params, log, (response) => {})
                    break
                case "HB":
                    hb(params, log, (response) => {
                        log.info("HB FROM : ", socket.remotePort);
                        log.info(response);
                        socket.write(JSON.stringify(response.message))
                    })
                    break
                default:
                    smartGen(params, log, (response) => {

                    });
                    break
            }
        } catch (e) {
            log.error(e);
        }
    })

    socket.on("timeout", () => {
        login.logout(socket.remotePort, socket.remoteAddress, clients[socket.remotePort].id);
        delete clients[socket.remotePort];
    })

    socket.on("error", (err) => {})


})
server.on("error", (err) => {})


let pipeline = [
    {
        $match: {
            $and: [
                {operationType: 'insert'},
            ],
        },
    },
];

let options = {fullDocument: 'updateLookup'};

commands.model.watch(pipeline, options).on('change', data => {




    let divId = data.fullDocument.DEVICE;
    for (const [key, value] of Object.entries(clients)) {
        if(value.id === divId) {
            let serv = {
                method: "writeConfig",
                result: data.fullDocument.COMMAND,
                uid: data.fullDocument._id
            }
            if(data.fullDocument.STATUS==0) {
                value.socket.write(JSON.stringify(serv))
            }
            break;
        }
    }
})


function existsNotLogin(sock, hostId, params) {
    if (!clients[sock.remotePort]) {
        login.extInit(params, sock, res => {
            if (res.success) {
                clients[sock.remotePort] = {
                    port: sock.remotePort,
                    device: res.device,
                    id: res.deviceID,
                    socket: sock,
                    mod_baud: res.moduleBaud,
                    mod_port: res.modulePort
                }
            }
        })
    }
}

server.on("listening", () => {
    log.info("SERVER LISTENING:", config.server.hostname, " : ", config.protocols[2].port);
})


server.listen(config.protocols[2].port, config.server.hostname);


