'use strict';

var Court = require('../../model/courtModel');
var Reservation = require('../../model/reservationModel');

exports.list_all_courts = function (req, res) {


    Court.getAllCourts(function (err, court) {

        if (err)
            res.send(err);
        res.send(court);

    });
};

exports.createCourt = function (req, res) {
    var court = new Court(req.body);


    //handles null error 
    if (!court.type || !court.sector) {

        res.status(400).send({
            error: true,
            message: 'Please provide court info'
        });

    } else {

        Court.createCourt(court, function (err, court) {

            if (err)
                res.send(err);
            res.json(court);
        });
    }
};

exports.update_a_court = function (req, res) {
    var court = new Court(req.body);

    Court.updateCourt(req.params.courtId, court, function (err, court) {
        if (err)
            res.send(err);
        res.json(court);
    });
};

exports.read_a_court = function (req, res) {
    Court.getCourtById(req.params.courtId, function (err, court) {
        if (err)
            res.send(err);
        res.json(court);
    });
};

exports.delete_a_court= function (req, res) {
    let courtId = req.params.courtId;
    Court.remove(courtId, function (err, court) {
        if (err)
            res.send(err);
        res.json({
            message: 'Court with id: ' + courtId + ' successfully deleted '
        });
    });
};