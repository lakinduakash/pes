const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) return console.log(err);
    db = client.db('pes');
});

app.get('/', (req, res) => {
    let myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
    });
        console.log("1 document inserted");

    res.send('Hello World!')});

app.listen(3000, () => console.log('Example app listening on port 3000!'));