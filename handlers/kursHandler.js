const kursevi = require('../pkg/kursModel/kursSchema');

exports.create = async (req, res) => {
    try {
        await kursevi.create(req.body);
        res.status(201).redirect('/kursevi');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.get = async (req, res) => {
    try {
        const courses = await kursevi.find();
        res.status(200).render('kursevi', { course: courses });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.update = async (req, res) => {
    try {
        const course = await kursevi.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).redirect('back');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        await kursevi.findByIdAndDelete(req.params.id);
        res.status(204).redirect('/kursevi');
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.getOne = async (req, res) => {
    try {
        const course = await kursevi.findById(req.params.id);
        res.status(200).render('singleKurs', { course });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};