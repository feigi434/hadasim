const express = require('express');
const router = express.Router();

const memberRoutes = require('./member');
const covidRoutes = require('./covid');
const imageRoutes = require('./image');

router.use('/member', memberRoutes);
router.use('/covid', covidRoutes);
router.use('/image',imageRoutes);

module.exports = router;