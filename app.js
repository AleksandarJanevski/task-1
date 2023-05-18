const express = require('express');
const db = require('./pkg/database/index');
const app = express();
const kursHandler = require('./handlers/kursHandler')
const akademijaHandler = require('./handlers/akademijaHandler')
const userHandler = require('./handlers/userHandler')
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser())

db.init();

app.route('/kursevi').get(kursHandler.get).post(userHandler.protectRoute, kursHandler.create)
app.route('/akademija').get(akademijaHandler.get).post(akademijaHandler.create)
app.route('/kursevi/:id').all(userHandler.protectRoute).get(kursHandler.getOne).post(kursHandler.update)
app.get('/delete/:id', kursHandler.delete)
app.get('/logout', userHandler.logout)
app.route('/login').get(userHandler.getLogin).post(userHandler.login)
app.route('/signUp').get(userHandler.signUp).post(userHandler.createUser)
app.get('/test', (req, res) => {
    res.render('test')
})

app.listen(process.env.PORT, err => {
    if (err) return console.log(err);
    console.log('Service Started');
});