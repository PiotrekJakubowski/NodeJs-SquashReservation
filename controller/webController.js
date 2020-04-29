'use strict';
console.log("webController.js file start");

var Client = require('../model/clientModel.js');

exports.list_clients = function (req, res) {
    Client.getAllClients(function (err, client) {

        console.log('Web controller list all clients');
        if (err)
            res.send(err);
        //console.log('res', client);
        res.render('clientView', {client:client});
    });
};