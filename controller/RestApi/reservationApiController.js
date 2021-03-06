'use strict';

var Reservation = require('../../model/reservationModel.js');

exports.list_all_reservations = function (req, res) {
    Reservation.getAllReservations(function (err, reservation) {

        if (err)
            res.send(err);
        res.send(reservation);
    });
};

exports.createReservation = function (req, res) {
    var reservation = new Reservation(req.body);
    
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
