'user strict';
var sql = require('./db.js');

//Task object constructor
var Reservation = function (reservation) {
    this.reservation_date = reservation.reservation_date;
    this.court_id = reservation.court_id;
    this.client_id = reservation.client_id;
};

// Client.getAllClients = function (pageSite, result) {
//     let numPageSite = Math.floor(Number(pageSite) / 10);;

//     if (pageSite > 1) {
//         console.log("If statement");
//         numPageSite = (Math.floor(Number(pageSite) / 10) + 1) * 10;
//     }

//     let getAllClientsQuery = "SELECT * FROM client LIMIT 10 OFFSET " + String(numPageSite);
//     console.log("Query: " + getAllClientsQuery)
//     sql.query(getAllClientsQuery, function (err, res) {
//         if (err) {
//             result(null, err);
//         } else {
//             result(null, res);
//         }
//     });
// };

Reservation.getNumberOfClientReservations = function (clientId, result) {
    sql.query("SELECT count(*) AS count FROM reservation WHERE client_id = ?", clientId, function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Reservation.getAllReservationsForClient = function (pageSite, clientId, result) {
    let numPageSite = Math.floor(Number(pageSite) / 10);;

    if (pageSite > 1) {
        console.log("If statement");
        numPageSite = (Math.floor(Number(pageSite) / 10) + 1) * 10;
    }

    sql.query("Select * from reservation where client_id = ? LIMIT 10 OFFSET ?", [clientId, String(numPageSite)], function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reservation.getAllReservationsForCourt = function (courtId, result) {
    sql.query("Select * from reservation where court_id = ?", courtId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Reservation.createReservation = function (newReservation, result) {
    sql.query("INSERT INTO reservation set ?", newReservation, function (err, res) {

        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Reservation.getReservationById = function (reservationId, result) {
    sql.query("Select * from reservation where id = ? ", reservationId, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Reservation.getAllReservations = function (result) {
    sql.query("Select * from reservation", function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Reservation.updateReservation = function (reservationId, reservation, result) {
    sql.query("UPDATE reservation SET ? WHERE id = ?", [reservation, reservationId], function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Reservation.getClientIdForReservation = function (reservationId, result) {
    sql.query("Select * from reservation WHERE id = ?", reservationId, function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Reservation.remove = function (reservationId, result) {
    sql.query("DELETE FROM reservation WHERE id = ?", reservationId, function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Reservation.removeAllReservationsForCourt = function (courtId, result) {

    sql.query("DELETE FROM reservation WHERE court_id = ?", courtId, function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Reservation.removeAllReservationsForClient = function (clientId, result) {

    sql.query("DELETE FROM reservation WHERE client_id = ?", clientId, function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Reservation.removeAllReservations = function (result) {

    sql.query("DELETE FROM reservation", function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Reservation.removeRandomReservation = function (result) {

    sql.query("DELETE FROM reservation ORDER BY RAND() LIMIT 1", function (err, res) {

        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
}
module.exports = Reservation;