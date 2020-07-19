'use strict';

var Court = require('../../model/courtModel');
var Reservation = require('../../model/reservationModel');

exports.list_courts = function (req, res) {
    Court.getAllCourts(function (err, court) {
        if (err)
            res.send(err);
        res.render('courtView', {
            court: court
        });
    });
};

exports.edit_court_page = function (req, res) {
    let courtId = req.params.courtId;

    Court.getCourtById(courtId, function (err, court) {
        if (err)
            res.send(err);

        res.render('edit-court', {
            court: court[0]
        });
    });
};

exports.edit_court = function (req, res) {
    let court = new Court(req.body);
    let courtId = req.params.courtId;

    Court.updateCourt(courtId, court, function (err, court) {
        res.redirect('/web/courts');
    });
};

exports.add_court_page = function (req, res) {
    res.render('add-court.ejs', {
        message: ''
    });
};

exports.add_court = function (req, res) {
    var court = new Court(req.body);

    Court.createCourt(court, function (err, court) {
        res.redirect('/web/courts');
    });
};

exports.delete_court = function (req, res) {

    let courtId = req.params.courtId;

    Reservation.removeAllReservationsForCourt(courtId, function (err, results) {
    });

    Court.remove(courtId, function (err, result) {
        res.redirect('/web/courts');
    });
};
