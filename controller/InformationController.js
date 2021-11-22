'use strict'

class InformationController{
    getContactPage(req, res, next) {
        res.render('information/contact.hbs');
      }

    getAboutPage(req, res, next) {
    res.render('information/about.hbs');
    }
}

module.exports = new InformationController;