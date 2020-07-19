'use strict';

var Client = require('../../model/clientModel.js');

exports.list_all_clients = function (req, res) {
    Client.getAllClients(function (err, client) {

        if (err)
            res.send(err);
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

        Client.createClient(client, function (err, clientId) {
            res.json(client);
        });
    }
};

exports.update_a_client = function (req, res) {
    var client = new Client(req.body);

    Client.updateClient(req.params.clientId, client, function (err, client) {
        if (err)
            res.send(err);
        res.json(client);
    });
};

exports.read_a_client = function (req, res) {
    Client.getClientById(req.params.clientId, function (err, client) {
        if (err)
            res.send(err);
        res.json(client);
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
