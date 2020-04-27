'user strict';

console.log("db.js file start");

var mysql = require('mysql');

//local mysql db connection
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