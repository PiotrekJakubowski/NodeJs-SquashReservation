'user strict';
var sql = require('./db.js');

//Task object constructor
var Reservation = function (reservation) {
    this.reservation_date = reservation.reservation_date;
    this.court = reservation.court;
    this.client_id = reservation.client_id;
};

Reservation.createReservation = function (newReservation, result) {
    sql.query("INSERT INTO reservation set ?", newReservation, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Reservation.getReservationById = function (reservationId, result) {
    sql.query("Select * from reservation where id = ? ", reservationId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Reservation.getAllReservations = function (result) {
    sql.query("Select * from reservation", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);
            result(null, res);
        }
    });
};
Reservation.updateReservation = function (reservationId, reservation, result) {
    sql.query("UPDATE reservation SET ? WHERE id = ?", [reservation, reservationId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Reservation.remove = function (reservationId, result) {
    sql.query("DELETE FROM reservation WHERE id = ?", [reservationId], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Reservation;