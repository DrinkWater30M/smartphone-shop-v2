'use strict';
const Sequelize = require('sequelize');
const {sequelize, models} = require('../models/index');

class AuthenticationService{
    getUserInformation(email){
        return models.khach_hang.findOne({
            raw: true,
            where: {Email: email}
        })
    }
}

module.exports = new AuthenticationService;