'use strict';
console.log("appController.js file start");

var Client = require('../model/appModel.js');

exports.list_all_clients = function (req, res) {
    Client.getAllClients(function (err, client) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', client);
        res.send(client);
    });
};

exports.createClient = function (req, res) {
    var client = new Client(req.body);

    //handles null error 
    if (!client.first_name || !client.last_name) {

        res.status(400).send({
            error: true,
            message: 'Please provide client info'
        });

    } else {

        Client.createClient(client, function (err, client) {

            if (err)
                res.send(err);
            res.json(client);
        });
    }
};


exports.read_a_client = function (req, res) {
    Client.getClientById(req.params.clientId, function (err, client) {
        if (err)
            res.send(err);
        res.json(Client);
    });
};

exports.delete_a_client = function (req, res) {
    Client.remove(req.params.clientId, function (err, client) {
        if (err)
            res.send(err);
        res.json({
            message: 'Client successfully deleted'
        });
    });
};