const mongoose = require('../dbcon');
const db = require("../dbcon");
// Define a schema
const Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String,
        required: [true, 'Plase place a name']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Plase place a email'],
    },
    password: {
        type: String,
        required: [true, 'Plase place a password']
    }
});

module.exports.model = db.model("users", user);
