'user strict';
var sql = require('./db.js');

var Court = function (court) {
    this.type = court.type;
    this.sector = court.sector;
};

Court.createCourt = function (newCourt, result) {
    sql.query("INSERT INTO court set ?", newCourt, function (err, res) {

        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Court.getCourtById = function (courtId, result) {
    let getCourtQuery = "Select * from court where courtid = '" + courtId + "'"
    sql.query(getCourtQuery, function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Court.getAllCourts = function (result) {
    sql.query("Select * from court", function (err, res) {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Court.updateCourt = function (courtId, court, result) {
    let type = court.type;
    let sector = court.sector;

    let updateQuery = "UPDATE court SET type = '" + type + "', sector = '" + sector + "' WHERE courtid= " + courtId;

    sql.query(updateQuery, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Court.remove = function (courtId, result) {
    sql.query("DELETE FROM court WHERE courtid = ?", [courtId], function (err, res) {

        if (err) {
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = Court;