'use strict';

var Client = require('../../model/clientModel.js');
var Reservation = require('../../model/reservationModel');

exports.list_clients = function (req, res) {
    let pageSite = req.params.pageSite;
    console.log("PageSite: " + pageSite);
    let clientsCounts;
    Client.getNumberOfClients(function(err, clientsAmount) {
        if (err)
            res.send(err);
        else {
            console.log("Clients counts list_clients = " + clientsAmount[0].count);
            clientsCounts = Math.floor(clientsAmount[0].count/10 + 1);
        }
    })

    Client.getAllClients(pageSite, function(err, client) {
        if (err)
            res.send(err);
        res.render('clientView', {
            client: client,
            clientsAmount: clientsCounts
        });
    });
};

exports.edit_client_page = function (req, res) {
    let clientId = req.params.clientId;

    Client.getClientById(clientId, function (err, client) {
        if (err)
            res.send(err);

        res.render('edit-client', {
            client: client[0]
        });
    });
};

exports.edit_client = function (req, res) {
    let client = new Client(req.body);
    let clientId = req.params.clientId;

    Client.updateClient(clientId, client, function (err, client) {
        res.redirect('/web/clients/1');
    });
};

exports.add_client_page = function (req, res) {
    res.render('add-client.ejs', {
        message: ''
    });
};

exports.add_client = function (req, res) {
    var client = new Client(req.body);

    Client.createClient(client, function (err, client) {
        res.redirect('/web/clients/1');
    });
};

exports.delete_client = function (req, res) {

    let clientId = req.params.clientId;

    Reservation.removeAllReservationsForClient(clientId, function (err, results) {});

    Client.remove(clientId, function (err, result) {
        res.redirect('/web/clients/1');
    });
};

exports.delete_all_clients = function (req, res) {

    Reservation.removeAllReservations(function (err) {});

    Client.removeAll(function (err, result) {
        res.redirect('/web/clients/1');
    });

};