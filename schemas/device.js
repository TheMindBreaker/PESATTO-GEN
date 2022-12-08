const mongoose = require('../dbcon');
const device_values = require('./device_values');
const db = require("../dbcon");
// Define a schema
const Schema = mongoose.Schema;

let device = new Schema({
    IDENTIFIER: {
        type: String
    },
    LAST_CON: {
        type: Date,
        default: Date.now()
    },
    LAST_SOCKET: {
        type: Number
    },
    LAST_IP: {
        type: String
    },
    STATUS: {
        type: Boolean,
        default: false
    },
    MODULE_PORT: Number,
    DATA_MODE: Number,
    MODULE_BAUD: Number,
    MODULE_TYPE: String,
    LATITUDE: Number,
    LONGITUDE: Number,
    PASSWORD: Number,
    DEVICE_VALUE: device_values.data
});

module.exports.model = db.model("device", device);
