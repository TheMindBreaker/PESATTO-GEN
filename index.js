const config = require('./config.json');
const services = [];
const device_info = require('./schemas/device')
const device_values = require('./schemas/device_values')
config.protocols.forEach(protocol => {
    if(protocol.enable){
        services.push(require("./protocols/"+protocol.name));
    }
})

let info = device_info.model({
    IDENTIFIER: "3439333633355115004B003D",
    LAST_CON: Date.now(),
    LAST_SOCKET: 0,
    LAST_IP: "",
    STATUS: false,
    MODULE_PORT: 4,
    DATA_MODE: 1,
    MODULE_BAUD: 0,
    MODULE_TYPE: 'HGM6120N',
    LATITUDE: 20,
    LONGITUDE: 20,
    PASSWORD: 12345,
    DEVICE_VALUE: device_values.data
})

//info.save();


const socket = require('./socket');
socket();




