

const fs = require('fs');
const dir = './files';
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'./server.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    }, log = SimpleNodeLogger.createSimpleLogger( opts );


module.exports = {
    addToFile: (device, date, data) => {
        let fullPath = dir + "/" + device + "/data/" + date + ".dat";
        fs.writeFile(fullPath, data, (err) => {
            log.error(err);

        })

    }
}

function connections(device, date,data) {

}




