const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'springstudent',
    password: 'springstudent',
    database: 'squash-reservation'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//show all products
app.get('/api/clients', (req, res) => {
    let sql = "SELECT * FROM client";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//show single product
app.get('/api/clients/:id', (req, res) => {
    let sql = "SELECT * FROM client WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//add new product
app.post('/api/clients', (req, res) => {
    let data = {
        product_name: req.body.product_name,
        product_price: req.body.product_price
    };
    let sql = "INSERT INTO client SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//update product
app.put('/api/clients/:id', (req, res) => {
    let sql = "UPDATE client SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Delete product
app.delete('/api/clients/:id', (req, res) => {
    let sql = "DELETE FROM client WHERE id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});