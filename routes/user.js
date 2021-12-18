const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const passport = require('../authentication/passport');

/* GET account page. */
router.post('/account', userController.getAccountPage);

/* GET login page. */
router.get('/login', userController.getLoginPage);

/* POST login page. */
router.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/user/login'}
));

/* POST register page. */
router.get('/register', userController.getRegisterPage);

/* POST register page. */
router.post('/register', userController.register);

/* Log out page. */
router.get('/logout', userController.logout);

module.exports = router;
