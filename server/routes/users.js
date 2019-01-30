const express = require('express');
const router = express.Router();
const { isLogin } = require('../middlewares');

const { UserController } = require('../contollers');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/token', isLogin, UserController.checkToken);

module.exports = router;