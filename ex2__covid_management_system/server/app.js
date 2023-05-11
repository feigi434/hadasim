const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();

const apiRoutes = require('./routes');


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
});


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    next();
});

app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}/main`)
});

