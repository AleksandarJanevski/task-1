const mongoose = require('mongoose')

const kurseviSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    },
    oblast: {
        type: String,
        required: true
    },
})

const kursevi = mongoose.model('kursevi', kurseviSchema)

module.exports = kursevi