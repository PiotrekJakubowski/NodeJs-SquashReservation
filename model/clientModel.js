'user strict';
var sql = require('./db.js');

//Task object constructor
var Client = function (client) {
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.phone_number = client.phone_number;
    this.email = client.email;
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
            console.log('Clients : ', res);

            result(null, res);
        }
    });
};
Client.updateClient = function (clientId, client, result) {
    sql.query("UPDATE client SET ? WHERE id = ?", [client, clientId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
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