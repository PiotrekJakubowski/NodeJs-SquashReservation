'use strict';
module.exports = function (app) {
    console.log("appRoutes.js file start");
    var restMethod = require('../controller/appController');

    // todoList Routes
    app.route('/clients')
        .get(restMethod.list_all_clients)
        .post(restMethod.createClient);

    app.route('/clients/:clientId')
        .get(restMethod.read_a_client)
        .put(restMethod.update_a_client)
        .delete(restMethod.delete_a_client);

    app.route('/reservations')
        .get(restMethod.list_all_reservations)
        .post(restMethod.createReservation);

    app.route('/reservations/:reservationId')
        .get(restMethod.read_a_reservation)
        .put(restMethod.update_a_reservation)
        .delete(restMethod.delete_a_reservation);
};