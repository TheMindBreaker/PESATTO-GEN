const config = require('./config.json');
const mongoose = require('mongoose');
let conn = null;

mongoose.set('strictQuery', true)
mongoose.connect(config.mongo.url, {
            serverSelectionTimeoutMS: 5000
        }).then(() => mongoose);

module.exports = mongoose;
