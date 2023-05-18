const mongoose = require('mongoose')

const akademijaSchema = new mongoose.Schema({
    ime: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    },
    kursevi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kursevi'
    }]
})

const akademija = mongoose.model('akademija', akademijaSchema)

module.exports = akademija