var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('information/contact.hbs');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('information/about.hbs');
});

/* GET default */
router.get('/', function(req, res, next) {
  res.render('information/contact.hbs');
});

module.exports = router;
