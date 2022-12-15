const config = require('../config.json');
const services = [];
config.protocols.forEach(protocol => {
    if(protocol.enable){
        services.push(require("./protocols/"+protocol.name));
    }
})





