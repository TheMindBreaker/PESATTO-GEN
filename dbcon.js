const mysql = require('mysql');
const config = require('./config.json');
const connection = mysql.createConnection(config.db);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
