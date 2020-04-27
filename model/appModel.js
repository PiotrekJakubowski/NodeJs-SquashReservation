'user strict';
var sql = require('./db.js');

//Task object constructor
var Client = function (client) {
    this.client = client.first_name;
    this.client = client.last_name;
    this.client = client.phone_number;
    this.client = client.email;
};
Client.createClient = function (newClient, result) {
    sql.query("INSERT INTO client set ?", newClient, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Client.getClientById = function (clientId, result) {
    sql.query("Select * from client where id = ? ", clientId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Client.getAllClients = function (result) {
    sql.query("Select * from client", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};
Client.remove = function (id, result) {
    sql.query("DELETE FROM client WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = Client;