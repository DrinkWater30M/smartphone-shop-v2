'use strict';
const Sequelize = require('sequelize');
const {sequelize, models} = require('../models/index');

class UserService{
    getUserInformation(email){
        return models.khach_hang.findOne({
            where: {Email: email},
            attributes: { exclude: ['MatKhau'] },
            raw: true,
        })
    }
}

module.exports = new UserService;