const express = require ('express');
const cors = require ('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express ();
const port = process.env.PORT || 5000;

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use(express.json());



var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());


const password = process.env.ATLAS_PASSWORD;
const ATLAS_URI = "mongodb+srv://edument:" + password+ "@cluster0-07rrr.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

const router = require('./routes/crud.js');

app.use('/path', router);