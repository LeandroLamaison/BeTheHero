const express = require('express');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const router = express.Router();

router.post('/sessions', sessionController.create);

router.get('/ongs', ongController.index);
router.post('/ongs', ongController.create);

router.get('/profile', profileController.index);

router.get('/incidents', incidentController.index);
router.post('/incidents', incidentController.create);
router.delete('/incidents/:id', incidentController.delete);

module.exports = router;