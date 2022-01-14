'use strict'
const userService = require('../services/UserService');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USERNAME, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
});

class ApiUserController{
    async getAccount(req, res, next){
        try{
            //Get id user to get info
            let idUser = req.user.MaKhachHang;

            //Get info of user
            let userInfo = await userService.getUserInformation(idUser);

            //Return data
            res.status(200).json(userInfo);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async saveAccount(req, res, next){
        try{
            //Get id user to get info
            let idUser = req.user.MaKhachHang;
            let userInfo = req.body;

            //Get info of user
            await userService.updateAccount(idUser, userInfo);

            //Return data
            res.status(200).json({message: 'Cập nhật thành công!'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async addOTP(req, res, next){
        try{
            //Get id user
            let email = req.body.email;

            //Check account use email
            let idUser =  await userService.getIdUser(email);

            if(!idUser){
                res.status(422).json({error: 'Email chưa được đăng kí!'});
                return;
            }

            //Generate otp, 6 digits
            const otp = crypto.randomInt(100000, 999999).toString();
            
            //Write data to DB
            await userService.addOTP(idUser, otp, "");

            //Send OTP to email for user
            await transporter.sendMail({
                from: `"Smartphone Shop" <${process.env.NODEMAILER_USERNAME}>`,
                to: email,
                subject: "Smartphone Shop - Mã OTP",
                html:   `<p>Chào bạn! Đây là mã OTP được gửi từ tài khoản của bạn. Tuyệt đối không cung cấp cho bất kì ai!
                        <br><br>Chúc bạn một ngày làm việc tốt lành!</p>
                        <b style="font-size: 3em;">${otp}</b>`,
            });

            //Return message to client
            res.status(200).json({message: "OTP đã gửi đến Email của bạn! Hãy kiểm tra!"})
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async resetPassword(req, res, next){
        try{
            //Get id user to get info
            let {email, otp, password} = req.body;

            //Check email
            let idUser = await userService.getIdUser(email);
            if(!idUser){
                res.status(422).json({error: 'Email chưa được đăng kí!'});
                return;
            }

            //Check otp before reset
            let otpUser = await userService.getOTP(idUser);
            if(otp != otpUser){
                res.status(402).json({error: "OTP hết hạn hoặc không chính xác!"});
                return;
            }

            //Reset password
            await userService.resetPassword(idUser, password);

            //Return data
            res.status(200).json({message: 'Đổi thành công!', redirectUrl: '/user/login'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async updatePassword(req, res, next){
        try{
            //Get id user to get info
            let idUser = req.user.MaKhachHang;
            let {oldPassword, newPassword} = req.body;

            //Check old password
            let oldPasswordUser = await userService.getPassword(idUser);
            let match = await bcrypt.compare(oldPassword, oldPasswordUser);
            if(!match){
                res.status(422).json({error: 'Mật khẩu cũ không chính xác!'});
                return;
            }

            //Reset password
            await userService.resetPassword(idUser, newPassword);

            //Return data
            res.status(200).json({message: 'Đổi thành công!', redirectUrl: '/'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async verifyAccount(req, res, next){
        try{
            //Get id and otp
            let idUser = req.user.MaKhachHang;
            let otp = req.body.otp;
            
            //Check otp before reset
            let otpUser = await userService.getOTP(idUser);
            if(otp != otpUser){
                res.status(402).json({error: "OTP hết hạn hoặc không chính xác!"});
                return;
            }

            //Update status of account
            await userService.updateStatusAccount(idUser);

            //Return message
            res.status(200).json({message: "Xác minh thành công!"});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }
}

module.exports = new ApiUserController;