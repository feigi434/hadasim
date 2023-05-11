const express = require('express');
const router = express.Router();

const covidCtrl = require('../controllers/covid');

router.post('/', covidCtrl.addCovid);
router.get('/', covidCtrl.getCovid);

module.exports = router;