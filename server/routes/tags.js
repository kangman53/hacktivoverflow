const express = require('express');
const router = express.Router();

const { TagController } = require('../contollers');

router.get('/', TagController.findAll);
module.exports = router