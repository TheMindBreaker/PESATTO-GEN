console.log("Ruptela Server is Runnning");

const net = require('net');
const config = require('../config.json');
const fs = require("fs");

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {logFilePath:'./files/RuptelaLog.log', timestampFormat:'YYYY-MM-DD HH:mm:ss',},
    log = SimpleNodeLogger.createSimpleLogger( opts );



const server = net.createServer();

let devices = [];

server.on("connection", (socket) => {
    const addr = socket.remoteAddress + ':' + socket.remotePort;

    socket.setKeepAlive(true);

    devices.push([socket.remotePort,socket,'']);


    socket.on('data', (data) => {

    })


})


server.listen(config.protocols[0].port, config.server.hostname, () => {
    log.info(`Ruptela Server Running at: ${config.server.hostname}:${config.server.port}`)
});
