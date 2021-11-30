const express = require('express');
const router = express.Router();
const indexController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', indexController.getIndexPage);

module.exports = router;
