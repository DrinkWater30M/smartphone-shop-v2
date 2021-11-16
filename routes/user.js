var express = require('express');
var router = express.Router();

/* GET account page. */
router.get('/account', function(req, res, next) {
  res.render('user/account.hbs');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('user/login.hbs');
});

module.exports = router;
