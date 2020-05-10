'use strict';
console.log("webReservationController.js file start");

var Reservation = require('../../model/reservationModel');

/////////////////////Reservations/////////////////////
exports.list_reservations_for_client = function (req, res) {
    console.log("list_reservations_for_client for id: " + req.params.clientId);
    let clientId = req.params.clientId;

    Reservation.getAllReservationsForClient(req.params.clientId, function(err, reservation) {
        console.log('Web Reservation Controller list all reservations for client');
        if (err)
            res.send(err);
        res.render('reservationView', {
            reservation: reservation,
            clientId: clientId
        });
    });
};

exports.edit_reservation_page = function (req, res) {
    let reservationId = req.params.reservationId;

    Reservation.getReservationById(reservationId, function (err, reservation) {
        if (err)
            res.send(err);
        res.render('edit-reservation', {
            reservation: reservation[0]
        });
    });
};

exports.edit_reservation = function (req, res) {
    let reservation = new Reservation(req.body);
    let reservationId = req.params.reservationId;
    let clientId = reservation.client_id;

    console.log("Edit reservation with id: " + reservationId);
    console.log("Edit reservation for client: " + clientId);

    Reservation.updateReservation(reservationId, reservation, function (err, reservation) {
        res.redirect('/web/clientReservations/' + clientId);
    });
};

exports.add_reservation_page = function (req, res) {
    let clientId = req.params.clientId;
    res.render('add-reservation', {
        clientId: clientId
    });
};

exports.add_reservation = function (req, res) {
    let reservation = new Reservation(req.body);
    let clientId = req.body.client_id;

    console.log("List reservations for client with id: " + clientId);

    Reservation.createReservation(reservation, function (err, reservation) {
        res.redirect('/web/clientReservations/' + clientId);
    });
};

exports.delete_reservation = function (req, res) {

    let reservationId = req.params.reservationId;
    Reservation.remove(reservationId, function (err, result) {
        res.redirect('/web/clients/');
    });
};


