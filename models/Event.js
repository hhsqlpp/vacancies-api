const { Schema, model } = require('mongoose');

const event = new Schema({
    name: String,
    date: String,
    organization: String,
    location: String,
    description: String,
    img: String,
    slug: String,
});

module.exports = model('event', event);
