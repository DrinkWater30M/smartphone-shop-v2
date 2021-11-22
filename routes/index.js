const express = require('express');
const router = express.Router();
const indexController = require('../controller/IndexController');

/* GET home page. */
router.get('/', indexController.getIndexPage);

module.exports = router;
