const https = require('https');
const fs = require('fs')
const serverOpts = {
    key: fs.readFileSync("../certificate/privkey.pem"),
    cert: fs.readFileSync("../certificate/fullchain.pem"),
    ca: fs.readFileSync("../certificate/chain.pem")
};
const server = https.createServer(serverOpts);
const io = require('socket.io')(server);
const device = require('./schemas/device');
const {api} = require("./api");


module.exports = () => {
    server.listen(5001, "socket.pesatto.com",() => console.log(`listening on port 5001}`));

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

    device.model.watch(pipeline,options).on('change', data => {
        io.to(data.fullDocument._id.toString()).emit('device',JSON.stringify(data.fullDocument));
        io.to(data.fullDocument._id.toString()).emit('device_multiple',JSON.stringify({
            _id: data.fullDocument._id,
            STATUS: data.fullDocument.STATUS,
            ALIAS: data.fullDocument.ALIAS,
            LAST_UPDATE: data.fullDocument.DEVICE_VALUE.UPDATED
        }))

    })



    api()

}


