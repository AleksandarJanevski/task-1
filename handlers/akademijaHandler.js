const akademija = require('../pkg/akademijaModel/akademijaSchema');

exports.create = async (req, res) => {
    try {
        const academy = await akademija.create(req.body);
        res.status(201).json({ status: 'success', data: { academy } });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.get = async (req, res) => {
    try {
        const academy = await akademija.find().populate('kursevi');
        res.status(200).json({ status: 'success', data: { academy } });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err })
    }
};
exports.update = async (req, res) => {
    try {
        const academy = await akademija.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ status: 'success', data: { academy } });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};
exports.delete = async (req, res) => {
    try {
        await akademija.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success' });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err })
    }
};
exports.getOne = async (req, res) => {
    try {
        const academy = await akademija.findById(req.params.id).populate('kursevi');
        res.status(200).json({ status: 'success', data: { academy } });
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err });
    }
};