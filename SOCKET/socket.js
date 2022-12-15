const config = require('../config.json');
const app2 = require('express');
const https = require('http');


const server = https.createServer(app2);
const io = require('socket.io')(server,{cors: {origin: "*"}});
const device = require('./schemas/device');
server.listen(config.server.socketPort, config.server.hostname, () => console.log('SOCKET is LISTENING AT ' + config.server.socketPort));

io.on('connection', (socket) => {

    socket.join(socket.handshake.headers.devices.toLowerCase().split(","));
});


let pipeline = [
    {
        $match: {
            $and: [
                {operationType: 'update'},
            ],
        },
    },
];

let options = {fullDocument: 'updateLookup'};

device.model.watch(pipeline, options).on('change', data => {
    io.to(data.fullDocument._id.toString()).emit('device', JSON.stringify(data.fullDocument));
    io.to(data.fullDocument._id.toString()).emit('device_multiple', JSON.stringify({
        _id: data.fullDocument._id,
        STATUS: data.fullDocument.STATUS,
        ALIAS: data.fullDocument.ALIAS,
        LAST_UPDATE: data.fullDocument.DEVICE_VALUE.UPDATED
    }))

})



