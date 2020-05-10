'use strict';
console.log("webCourtController.js file start");

var Court = require('../../model/courtModel');
var Reservation = require('../../model/reservationModel');

exports.list_courts = function (req, res) {
    Court.getAllCourts(function (err, court) {
        console.log('webCourtController list all courts');
        if (err)
            res.send(err);
        res.render('courtView', {
            court: court
        });
    });
};

exports.edit_court_page = function (req, res) {
    let courtId = req.params.courtId;
    console.log("WebController - edit_court: " + courtId);

    Court.getCourtById(courtId, function (err, court) {
        console.log('Web controller edit_court_page');
        if (err)
            res.send(err);

        console.log("Passed parameter: " + court[0].type);
        res.render('edit-court', {
            court: court[0]
        });
    });
};

exports.edit_court = function (req, res) {
    console.log("Edit Court body: " + req.params.courtId + " | " + req.body.type + " | " + req.body.sector);
    let court = new Court(req.body);
    let courtId = req.params.courtId;

    console.log("Edit court with id: " + courtId);
    Court.updateCourt(courtId, court, function (err, court) {
        res.redirect('/web/courts');
    });
};

exports.add_court_page = function (req, res) {
    console.log("addCourtPage function");
    res.render('add-court.ejs', {
        message: ''
    });
};

exports.add_court = function (req, res) {
    console.log("Add Court body: " + req.body.type + " | " + req.body.sector);
    var court = new Court(req.body);

    Court.createCourt(court, function (err, court) {
        res.redirect('/web/courts');
    });
};

exports.delete_court = function (req, res) {

    let courtId = req.params.courtId;

    Reservation.removeAllReservationsForCourt(courtId, function (err, results) {
        if (err)
            console.log("We couldn't delete reservations for court: " + courtId);
        else
            console.log("Reservations for court: " + courtId + " removed");
    });

    console.log("WebController - Delete court with Id: " + courtId);
    Court.remove(courtId, function (err, result) {
        res.redirect('/web/courts');
    });
};
