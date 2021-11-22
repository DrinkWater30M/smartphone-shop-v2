'use strict'

class IndexController{
    getIndexPage(req, res, next) {
        res.render('index');
      }
}

module.exports = new IndexController;