const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const vacancy = require('./routes/vacancy');
const auth = require('./routes/auth');
const event = require('./routes/event');

app.use(express.json());
app.use('/vacancies', vacancy);
app.use('/user', auth);
app.use('/events', event);

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
        });
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;
