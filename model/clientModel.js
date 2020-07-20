'user strict';

var Client = function (client) {
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.phone_number = client.phone_number;
    this.email = client.email;
};

var sql = require('./db.js');

Client.getAllClients = function (pageSite, result) {
    let numPageSite = Math.floor(Number(pageSite) / 10);;

    if (pageSite > 1) {
        numPageSite = (pageSite * 10) - 10;
        console.log("If statement numPageSite: " + numPageSite);
    }

    let getAllClientsQuery = "SELECT * FROM client LIMIT 10 OFFSET " + String(numPageSite);
    console.log("Query: " + getAllClientsQuery)
    sql.query(getAllClientsQuery, function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Client.getNumberOfClients = function (result) {
    sql.query("SELECT count(*) AS count FROM client", function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Client.getClientById = function (clientId, result) {
    let getClientQuery = "Select * from client where id = '" + clientId + "'"
    sql.query(getClientQuery, function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Client.createClient = function (newClient, result) {
    sql.query("INSERT INTO client set ?", newClient, function (err, res) {

        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Client.updateClient = function (clientId, client, result) {
    let first_name = client.first_name;
    let last_name = client.last_name;
    let phone_number = client.phone_number;
    let email = client.email;

    let updateQuery = "UPDATE client SET first_name= '" + first_name + "', last_name= '" + last_name +
        "', phone_number= " + phone_number + ", email= '" + email + "' WHERE id= " + clientId;

    sql.query(updateQuery, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};
Client.remove = function (id, result) {
    sql.query("DELETE FROM client WHERE id = ?", [id], function (err, res) {

        if (err) {
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

Client.removeAll = function (result) {
    sql.query("DELETE FROM client", function (err, res) {

        if (err) {
            result(null, err);
        } else {

            result(null, res);
        }
    });
}

module.exports = Client;