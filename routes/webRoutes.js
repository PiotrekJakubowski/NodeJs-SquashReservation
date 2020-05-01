'use strict';
module.exports = function (app) {
    console.log("webRoutes.js file start");
    var webClientMethod = require('../controller/webClientController');
    var webReservationMethod = require('../controller/webReservationController');

    //Client Methods
    app.route('/web/clients')
        .get(webClientMethod.list_clients);

    app.route('/web/addClient')
        .get(webClientMethod.add_client_page)
        .post(webClientMethod.add_client);

    app.route('/web/deleteClient/:clientId')
        .get(webClientMethod.delete_client);
    
    app.route('/web/editClient/:clientId')
        .get(webClientMethod.edit_client_page)
        .post(webClientMethod.edit_client);

    //Reservation Methods
    app.route('/web/clientReservations/:clientId')
        .get(webReservationMethod.list_reservations_for_client);

    app.route('/web/editReservation/:reservationId')
        .get(webReservationMethod.edit_reservation_page)
        .post(webReservationMethod.edit_reservation);

    app.route('/web/addReservation/:clientId')
        .get(webReservationMethod.add_reservation_page)
        .post(webReservationMethod.add_reservation);

    app.route('/web/deleteReservation/:reservationId')
        .get(webReservationMethod.delete_reservation);

};
