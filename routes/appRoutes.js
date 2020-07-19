'use strict';
module.exports = function (app) {
    var clientRestMethod = require('../controller/RestApi/clientApiController');

    //Clients
    app.route('/api/clients')
        .get(clientRestMethod.list_all_clients)
        .post(clientRestMethod.createClient);

    app.route('/api/clients/:clientId')
        .get(clientRestMethod.read_a_client)
        .put(clientRestMethod.update_a_client)
        .delete(clientRestMethod.delete_a_client);

    var reservationRestMethod = require('../controller/RestApi/reservationApiController');
    var courtRestMethod = require('../controller/RestApi/courtApiController');


    //Reservations
    app.route('/api/reservations')
        .get(reservationRestMethod.list_all_reservations)
        .post(reservationRestMethod.createReservation);

    app.route('/api/reservations/:reservationId')
        .get(reservationRestMethod.read_a_reservation)
        .put(reservationRestMethod.update_a_reservation)
        .delete(reservationRestMethod.delete_a_reservation);

    //Courts
    app.route('/api/courts')
        .get(courtRestMethod.list_all_courts)
        .post(courtRestMethod.createCourt);

    app.route('/api/courts/:courtId')
        .get(courtRestMethod.read_a_court)
        .put(courtRestMethod.update_a_court)
        .delete(courtRestMethod.delete_a_court);
};