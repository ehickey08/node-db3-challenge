const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const schemes = await Schemes.find();
        res.json(schemes);
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to get schemes' });
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const scheme = await Schemes.findById(id);
        if (scheme) res.json(scheme);
        else
            next({
                status: 404,
                message: 'Could not find scheme with given id.',
            });
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to get scheme' });
    }
});

router.get('/:id/steps', async (req, res, next) => {
    const { id } = req.params;

    try {
        const steps = await Schemes.findSteps(id);

        if (steps.length) res.json(steps);
        else
            next({
                status: 404,
                message: 'Could not find steps for given scheme',
            });
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to get steps' });
    }
});

router.post('/', async (req, res, next) => {
    const schemeData = req.body;

    try {
        const scheme = await Schemes.add(schemeData);
        res.status(201).json(scheme);
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to create new scheme' });
    }
});

router.post('/:id/steps', async (req, res, next) => {
    const stepData = req.body;
    const { id } = req.params;

    try {
        const scheme = await Schemes.findById(id);

        if (scheme) {
            const step = await Schemes.addStep(stepData, id);
            res.status(201).json(step);
        } else
            next({
                status: 404,
                message: 'Could not find scheme with given id.',
            });
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to create new step' });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const scheme = await Schemes.findById(id);

        if (scheme) {
            const updatedScheme = await Schemes.update(changes, id);
            res.json(updatedScheme);
        } else
            next({
                status: 404,
                message: 'Could not find scheme with given id.',
            });
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to update scheme' });
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const removedItem = await Schemes.findById(id);
        const deleted = await Schemes.remove(id);

        if (deleted) {
            res.json(removedItem);
        } else
            next({
                status: 404,
                message: 'Could not find scheme with given id.',
            });
    } catch (err) {
        next({ err: err, status: 500, message: 'Failed to delete scheme' });
    }
});

module.exports = router;
