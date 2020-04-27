'use strict';
module.exports = function (app) {
    console.log("appRoutes.js file start");
    var client = require('../controller/appController');

    // todoList Routes
    app.route('/clients')
        .get(client.list_all_clients)
        .post(client.createClient);

    app.route('/clients/:clientId')
        .get(client.read_a_client)
        .delete(client.delete_a_client);
};
