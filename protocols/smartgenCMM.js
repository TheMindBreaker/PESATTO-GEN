const net = require("net");
const config = require("../config.json");
const db = require("../dbcon");
let server = net.createServer();
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {logFilePath:'./files/SmartGenCMM.log', timestampFormat:'YYYY-MM-DD HH:mm:ss',},
    log = SimpleNodeLogger.createSimpleLogger( opts );

let sockets = [];

server.on("connection", (socket) => {
    log.info("NEW CONNECTION: ", socket.remoteAddress,":",socket.remotePort);
    sockets.push([socket.remotePort,socket,""]);
    socket.on("data", (data) => {
        log.info("DATA FROM: ",socket.remotePort," DATA: ",data)

    })

    socket.on("error", (error) => {
        console.log()
    })
})

server.on("listening", () => {
    log.info("SERVER LISTENING:",config.server.hostname," : ",config.protocols[2].port);
})

server.listen(config.protocols[2].port,config.server.hostname);
