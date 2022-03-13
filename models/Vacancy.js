const { Schema, model } = require('mongoose');

const vacancy = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    salary: {
        type: Object,
        required: true,
    },
    workType: {
        type: String,
        required: true,
    },
    contacts: {
        type: Object,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
});

module.exports = model('Vacancy', vacancy);
