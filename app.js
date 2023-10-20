const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// middleware  
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// routes
const authRouter = require('./routes/auth');
const buyerRouter = require('./routes/buyer');
const sellerRouter = require('./routes/seller');

const api = process.env.API_URL;
app.use(`${api}/auth`, authRouter);
app.use(`${api}/buyer`, buyerRouter);
app.use(`${api}/seller`, sellerRouter);


// database connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Database is connected');
}).catch((err) => {
    console.log("Database is not connected", err);
})

// server
app.listen(3000, () => {
    console.log('server is running in port 3000');
})