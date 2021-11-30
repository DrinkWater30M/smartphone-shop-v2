const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')

/* GET account page. */
router.get('/account', userController.getAccountPage);

/* GET login page. */
router.get('/login', userController.getLoginPage);

module.exports = router;
