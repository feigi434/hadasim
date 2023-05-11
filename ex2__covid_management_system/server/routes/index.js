const express = require('express');
const router = express.Router();

const memberRoutes = require('./member');
const covidRoutes = require('./covid');

router.use('/member', memberRoutes);
router.use('/covid', covidRoutes);

module.exports = router;