const express = require('express');
const router = express.Router();

const imageCtrl = require('../controllers/image');

router.post('/upload', imageCtrl.addImage);
router.get('/:name', imageCtrl.getImage);

module.exports = router;