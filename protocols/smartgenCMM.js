const net = require("net");
const config = require("../config.json");
const http = require("http");
const db = require("../dbcon");
let server = net.createServer();


const SimpleNodeLogger = require('simple-node-logger'),
    opts = {logFilePath:'./files/SmartGenCMM.log', timestampFormat:'YYYY-MM-DD HH:mm:ss',},
    log = SimpleNodeLogger.createSimpleLogger( opts );

let sockets = [];

server.on("connection", (socket) => {
    socket.setKeepAlive(true);

    log.info("NEW CONNECTION: ", socket.remoteAddress,":",socket.remotePort);

    socket.on("data", function (data) {
        try {
            let params = JSON.parse(data.toString());
            switch (params.method) {
                case "login":
                    let login = require("./SMARTGEN/login")
                    login(params,log,socket, response => {
                        if(response.success){
                            sockets.push([socket.remotePort,socket,response.device]);
                        }
                        let me = Buffer.from(JSON.stringify(response.message));
                        log.info(me);
                        socket.write(me)
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

})

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


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(sockets));
}

const web = http.createServer(requestListener);
web.listen(8080);
