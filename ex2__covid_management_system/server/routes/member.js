const express = require('express');
const router = express.Router();

const memberCtrl = require('../controllers/member');

router.post('/', memberCtrl.addMember);
router.get('/', memberCtrl.getMember);

module.exports = router;