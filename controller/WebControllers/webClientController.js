'use strict';
console.log("webClientController.js file start");

var Client = require('../../model/clientModel.js');
var Reservation = require('../../model/reservationModel');

exports.list_clients = function (req, res) {
    Client.getAllClients(function (err, client) {
        console.log('Web controller list all clients');
        if (err)
            res.send(err);
        res.render('clientView', {
            client: client
        });
    });
};

exports.edit_client_page = function (req, res) {
    let clientId = req.params.clientId;
    console.log("WebController - edit_client: " + clientId);

    Client.getClientById(clientId, function (err, client) {
        console.log('Web controller edit_client_page');
        if (err)
            res.send(err);

        console.log("Passed parameter: " + client[0].first_name);
        res.render('edit-client', {
            client: client[0]
        });
    });
};

exports.edit_client = function (req, res) {
    console.log("Edit Client body: " + req.params.clientId + " | " + req.body.first_name + " | " + req.body.last_name + " | " + req.body.phone_number + " | " + req.body.email);
    let client = new Client(req.body);
    let clientId = req.params.clientId;

    console.log("Edit client with id: " + clientId);
    Client.updateClient(clientId, client, function (err, client) {
        res.redirect('/web/clients');
    });
};

exports.add_client_page = function (req, res) {
    console.log("addClientPage function");
    res.render('add-client.ejs', {
        message: ''
    });
};

exports.add_client = function (req, res) {
    console.log("Add Client body: " + req.params.clientId + " | " + req.body.first_name + " | " + req.body.last_name + " | " + req.body.phone_number + " | " + req.body.email);
    var client = new Client(req.body);

    Client.createClient(client, function (err, client) {
        res.redirect('/web/clients');
    });
};

exports.delete_client = function (req, res) {

    let clientId = req.params.clientId;

    Reservation.removeAllReservationsForClient(clientId, function (err, results) {
        if (err)
            console.log("We couldn't delete reservations for client: " + clientId);
        else
            console.log("Reservations for client: " + clientId + " removed");
    });

    console.log("WebController - Delete client with Id: " + clientId);
    Client.remove(clientId, function (err, result) {
        res.redirect('/web/clients');
    });
};

exports.delete_all_clients = function (req, res) {

    Reservation.removeAllReservations(function (err) {
        if (err)
            console.log("We couldn't delete all reservations");
        else
            console.log("All reservations removed");
    });

    console.log("WebController - Delete All Clients");
    Client.removeAll(function (err, result) {
        res.redirect('/web/clients');
    });

};