console.log("server.js file start");

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(__dirname + "/public"));

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'springstudent',
    password: 'springstudent',
    database: 'squash-reservation'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes'); //importing route
var webRoutes = require('./routes/webRoutes');
routes(app); //register the route
webRoutes(app);