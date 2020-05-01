'use strict';
module.exports = function (app) {
    console.log("webRoutes.js file start");
    var webMethod = require('../controller/webController');

    // todoList Routes
    app.route('/web/clients')
        .get(webMethod.list_clients);

    app.route('/web/addClient')
        .get(webMethod.add_client_page)
        .post(webMethod.add_client);

    app.route('/web/deleteClient/:clientId')
        .get(webMethod.delete_client);
    
    app.route('/web/editClient/:clientId')
        .get(webMethod.edit_client_page)
        .post(webMethod.edit_client);
};
