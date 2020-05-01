'use strict';
console.log("appController.js file start");

var Client = require('../model/clientModel.js');
var Reservation = require('../model/reservationModel.js');

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

//////////////Reservation///////////////

exports.list_all_reservations = function (req, res) {
    Reservation.getAllReservations(function (err, reservation) {

        console.log('controller list all reservations');
        if (err)
            res.send(err);
        //console.log('res', reservation);
        res.send(reservation);
    });
};

exports.createReservation = function (req, res) {
    var reservation = new Reservation(req.body);

    console.log("Create Reservation request body: " + req.body.reservation_date + " | " + req.body.court + " | " + req.body.clientId);
    console.log("Create Reservation client value: " + client.reservation_date + " | " + client.court)

    //handles null error 
    if (!reservation.reservation_date || !reservation.client_id) {

        res.status(400).send({
            error: true,
            message: 'Please provide reservation info'
        });

    } else {

        Reservation.createReservation(reservation, function (err, reservation) {

            if (err)
                res.send(err);
            res.json(reservation);
        });
    }
};

exports.update_a_reservation = function (req, res) {
    var reservation = new Reservation(req.body);

    Reservation.updateReservation(req.params.reservationId, reservation, function (err, client) {
        if (err)
            res.send(err);
        res.json(Reservation);
    });
};

exports.read_a_reservation = function (req, res) {
    Reservation.getReservationById(req.params.reservationId, function (err, reservation) {
        if (err)
            res.send(err);
        res.json(Reservation);
    });
};

exports.delete_a_reservation = function (req, res) {
    Reservation.remove(req.params.reservationId, function (err, reservation) {
        if (err)
            res.send(err);
        res.json({
            message: 'Reservation successfully deleted'
        });
    });
};

