'use strict';
module.exports = function (app) {
    console.log("webRoutes.js file start");
    var webClientMethod = require('../controller/WebControllers/webClientController');
    var webReservationMethod = require('../controller/WebControllers/webReservationController');
    var webCourtMethod = require('../controller/WebControllers/webCourtController');

    //Client Methods
    app.route('/web/clients/:pageSite')
        .get(webClientMethod.list_clients);

    app.route('/web/addClient')
        .get(webClientMethod.add_client_page)
        .post(webClientMethod.add_client);

    app.route('/web/deleteClient/:clientId')
        .get(webClientMethod.delete_client);

    app.route('/web/editClient/:clientId')
        .get(webClientMethod.edit_client_page)
        .post(webClientMethod.edit_client);

    app.route('/web/deleteAll')
        .get(webClientMethod.delete_all_clients);

    //Reservation Methods
    app.route('/web/deleteRandomReservation')
        .get(webReservationMethod.delete_random_reservation);

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

    //Court Methods
    app.route('/web/courts')
        .get(webCourtMethod.list_courts);

    app.route('/web/editCourt/:courtId')
        .get(webCourtMethod.edit_court_page)
        .post(webCourtMethod.edit_court);

    app.route('/web/addCourt')
        .get(webCourtMethod.add_court_page)
        .post(webCourtMethod.add_court);

    app.route('/web/deleteCourt/:courtId')
        .get(webCourtMethod.delete_court);
};