const mongoose = require('../dbcon');
const db = require("../dbcon");
// Define a schema
const Schema = mongoose.Schema;

let commands = new Schema({
    DEVICE: {
        type: String,
        required: [true, "Missing Device"]
    },
    COMMAND_NAME: {
        type: String,
        required: [true, 'Missing Command']
    },
    COMMAND: {
        type: String,
        default: [true, 'Missing Command']
    },
    MADE: {
        type: Date,
        default: Date.now()
    },
    MADE_BY: {
        type: String,
        required: [true, "Missing User"]
    },
    MESSAGE: {
        type: String,
        default: ''
    },
    STATUS: {
        type: Number,
        default: 0
    }
})

module.exports.model = db.model("commands", commands);
module.exports.data = commands
