'use strict';
const Sequelize = require('sequelize');
const {sequelize, models} = require('../models/index');
const { QueryTypes } = require('sequelize/dist/lib/sequelize');

class AuthenticationService{
    async getAccount(email){
        try{
            let user  = await sequelize.query(
                `SELECT KHACH_HANG.MaKhachHang, KHACH_HANG.Email, KHACH_HANG.MatKhau 
                FROM KHACH_HANG WHERE KHACH_HANG.Email = '${email}'`,
                {type: QueryTypes.SELECT}
            );

            return user[0];
        }
        catch(error){
            console.log(error);
        }

    }
}

module.exports = new AuthenticationService;