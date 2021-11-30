const express = require('express');
const router = express.Router();
const informationController = require('../controllers/InformationController')

/* GET contact page. */
router.get('/contact', informationController.getContactPage);

/* GET about page. */
router.get('/about', informationController.getAboutPage);

module.exports = router;
