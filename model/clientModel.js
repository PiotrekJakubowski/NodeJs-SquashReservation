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
    console.log("Get Client By Id: " + clientId);
    let getClientQuery = "Select * from client where id = '" + clientId + "'"
    sql.query(getClientQuery, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('getClientById results : ', res);
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
            console.log('getAllClients results : ', res);
            result(null, res);
        }
    });
};
Client.updateClient = function (clientId, client, result) {
    let first_name = client.first_name;
    let last_name = client.last_name;
    let phone_number = client.phone_number;
    let email = client.email;

    let updateQuery = "UPDATE client SET first_name= '" + first_name + "', last_name= '" + last_name
                        +"', phone_number= " + phone_number + ", email= '" + email + "' WHERE id= " + clientId;

    console.log("Query: " + updateQuery);
    sql.query(updateQuery, function (err, res) {
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