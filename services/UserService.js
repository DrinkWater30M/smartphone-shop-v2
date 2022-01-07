'use strict';
const {sequelize, models} = require('../models/index');
const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize/dist');

class UserService{
    async getUserInformation(idUser){
        try{
            let user  = await sequelize.query(
                `SELECT khach_hang.MaKhachHang, khach_hang.HoTen, khach_hang.Email, 
                    khach_hang.SoDienThoai, khach_hang.DiaChiGiaoHang
                FROM khach_hang WHERE khach_hang.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT}
            );

            return user[0];
        }
        catch(error){
            console.log(error);
        }

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

    async updateAccount(idUser, userInfo){
        try{
            await sequelize.query(
                `UPDATE khach_hang
                SET khach_hang.HoTen = '${userInfo.name}', khach_hang.Email = '${userInfo.email}', 
                khach_hang.SoDienThoai = '${userInfo.phone}', khach_hang.DiaChiGiaoHang ='${userInfo.address}'
                WHERE khach_hang.MaKhachHang = ${idUser};`
            )

        }
        catch(error){
            console.log(error);
        }
    }

    // async getWishList(idUser){
    //     try{
    //         let products = await sequelize.query(
    //             `SELECT loai_san_pham.MaSanPham, loai_san_pham.LoaiSanPham, san_pham.TenSanPham,
    //                 loai_san_pham.TenLoaiSanPham, loai_san_pham.DonGia, loai_san_pham.SoLuong,
    //                 (SELECT hinh_anh_san_pham.HinhAnh FROM hinh_anh_san_pham WHERE hinh_anh_san_pham.MaSanPham = loai_san_pham.MaSanPham LIMIT 0,1) AS HinhAnh
    //             FROM gio_yeu_thich JOIN loai_san_pham ON gio_yeu_thich.LoaiSanPham = loai_san_pham.LoaiSanPham 
    //                 AND gio_yeu_thich.MaSanPham = loai_san_pham.MaSanPham
    //                 JOIN san_pham ON gio_yeu_thich.MaSanPham = san_pham.MaSanPham
    //             WHERE gio_yeu_thich.MaKhachHang = ${idUser}`,
    //             {type: QueryTypes.SELECT}
    //         );

    //         return products;
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    // async getCart(idUser){
    //     try{
    //         let products = await sequelize.query(
    //             `SELECT loai_san_pham.MaSanPham, loai_san_pham.LoaiSanPham, san_pham.TenSanPham,
    //                 loai_san_pham.TenLoaiSanPham, loai_san_pham.DonGia, loai_san_pham.SoLuong,
    //                 (SELECT hinh_anh_san_pham.HinhAnh FROM hinh_anh_san_pham WHERE hinh_anh_san_pham.MaSanPham = loai_san_pham.MaSanPham LIMIT 0,1) AS HinhAnh
    //             FROM gio_hang JOIN loai_san_pham ON gio_hang.LoaiSanPham = loai_san_pham.LoaiSanPham 
    //                 AND gio_hang.MaSanPham = loai_san_pham.MaSanPham
    //                 JOIN san_pham ON gio_hang.MaSanPham = san_pham.MaSanPham
    //             WHERE gio_hang.MaKhachHang = ${idUser}`,
    //             {type: QueryTypes.SELECT}
    //         );

    //         return products;
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }
}

module.exports = new UserService;