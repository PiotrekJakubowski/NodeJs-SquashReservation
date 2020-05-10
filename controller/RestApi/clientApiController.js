'use strict';
console.log("clientApiController.js file start");

var Client = require('../../model/clientModel.js');

exports.list_all_clients = function (req, res) {
    Client.getAllClients(function (err, client) {

        console.log('controller list all clients');
        if (err)
            res.send(err);
        //console.log('res', client);
        res.send(client);
    });
};

exports.createClient = function (req, res) {
    var client = new Client(req.body);

    console.log("Create Client request body: " + req.body.first_name + " | " + req.body.last_name);
    console.log("Create Client client value: " + client.first_name + " | " + client.last_name)

    //handles null error 
    if (!client.first_name || !client.last_name) {

        res.status(400).send({
            error: true,
            message: 'Please provide client info'
        });

    } else {

        Client.createClient(client, function (err, client) {
            res.redirect('/web/clients');
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
