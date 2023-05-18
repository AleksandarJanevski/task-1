const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../config.env` });


let DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('NAME', 'exams');

exports.init = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Online');
    } catch (err) {
        return console.error(err);
    }
};