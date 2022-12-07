const config = require('./config.json');
const Web = require("./web");
const services = [];



config.protocols.forEach(protocol => {
    if(protocol.enable){
        services.push(require("./protocols/"+protocol.name));
    }
})


Web();
