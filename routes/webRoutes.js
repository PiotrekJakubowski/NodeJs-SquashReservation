'use strict';
module.exports = function (app) {
    console.log("webRoutes.js file start");
    var webMethod = require('../controller/webController');

    // todoList Routes
    app.route('/web/clients')
        .get(webMethod.list_clients);
};
