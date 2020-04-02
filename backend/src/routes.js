const express = require('express');

const {celebrate, Segments, Joi} = require('celebrate');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const router = express.Router();

router.post('/sessions', sessionController.create);

router.get('/ongs', ongController.index);
router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2)
    })
}), ongController.create);

router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index);

router.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object({}).keys({
        page: Joi.number()
    })
}), incidentController.index);

router.post('/incidents', incidentController.create);

router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),incidentController.delete);

module.exports = router;