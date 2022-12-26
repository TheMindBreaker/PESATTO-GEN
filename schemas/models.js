const mongoose = require('../dbcon');
const db = require("../dbcon");
// Define a schema
const Schema = mongoose.Schema;

let models = new Schema({
    MODEL: {
        type: String,
        required: [true, "Missing Device"]
    },
    COMMAND_NAME: {
        type: String,
        required: [true, "Missing Command Name"]
    },
    COMMAND: {
        type: String,
        required: [true, 'Missing Command']
    },
    ICON: {
        type: String,
        required: [true, "Missing Icon"]
    }
})

module.exports.model = db.model("models", models);
module.exports.data = models
