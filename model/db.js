'user strict';


var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'springstudent',
    password: 'springstudent',
    database: 'squash-reservation'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;

