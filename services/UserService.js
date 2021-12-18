'use strict';
const Sequelize = require('sequelize');
const {sequelize, models} = require('../models/index');
const bcrypt = require('bcrypt');

class UserService{
    getUserInformation(email){
        return models.khach_hang.findOne({
            where: {Email: email},
            attributes: { exclude: ['MatKhau'] },
            raw: true,
        })
    }

    async registerAccount(email, password, req){
        let user = await models.khach_hang.findOne({ where: {Email: email}, raw: true,});
        
        //User existed
        if(user){
            //Return error for user
            req.flash('message', 'Tài khoản đã tồn tại, vui lòng dùng Email khác!');

            //Return status register
            return false;
        }

        //Register for user
        else{
            //Hash password
            let saltRounds = 10;
            let hash = await bcrypt.hash(password, saltRounds);

            //Register user
            await sequelize.query(
                `INSERT INTO khach_hang(Email, MatKhau) VALUE('${email}', '${hash}')`
            );

            //Return status register
            return true;
        }
    }
}

module.exports = new UserService;