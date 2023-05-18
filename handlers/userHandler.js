const user = require('../pkg/user/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.getLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send('Please provide a valid email or password');
        }
        const korisnik = await user.findOne({ email })
        if (!korisnik) {
            return res.status(400).send('user does not exist')
        }
        const validatePassword = bcrypt.compareSync(password, korisnik.password);
        if (!validatePassword) {
            return res.status(401).send('Please provide a valid email or password')
        }
        let token = jwt.sign({ id: korisnik._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            secure: false,
            httpOnly: true
        });
        res.status(200).redirect('/kursevi');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.signUp = async (req, res) => {
    try {
        res.render('signUp')
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err })
    }
};
exports.createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password) {
            return res.status(400).send('Please provide an email or password');
        };
        await user.create({
            name: name,
            email: email,
            password: password,
        });
        res.status(201).redirect('/login');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.protectRoute = async (req, res, next) => {
    try {
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return res.status(401).render('error');
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const korisnik = await user.findById(decoded.id);
        if (!korisnik) {
            return res.status(401).send('user does not exist');
        }
        next();
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie('jwt', 'sessionExpired', {
            expires: new Date(Date.now() + 5 * 10),
            httpOnly: true
        });
        res.status(200).redirect('/login');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};