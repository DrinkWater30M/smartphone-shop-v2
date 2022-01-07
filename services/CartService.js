'use strict';
const {sequelize, models} = require('../models/index');
const { QueryTypes } = require('sequelize/dist');

class CartService{
    async getWishList(idUser){
        try{
            let products = await sequelize.query(
                `SELECT loai_san_pham.MaSanPham, loai_san_pham.LoaiSanPham, san_pham.TenSanPham,
                    loai_san_pham.TenLoaiSanPham, loai_san_pham.DonGia,
                    (SELECT hinh_anh_san_pham.HinhAnh FROM hinh_anh_san_pham WHERE hinh_anh_san_pham.MaSanPham = loai_san_pham.MaSanPham LIMIT 0,1) AS HinhAnh
                FROM gio_yeu_thich JOIN loai_san_pham ON gio_yeu_thich.LoaiSanPham = loai_san_pham.LoaiSanPham 
                    AND gio_yeu_thich.MaSanPham = loai_san_pham.MaSanPham
                    JOIN san_pham ON gio_yeu_thich.MaSanPham = san_pham.MaSanPham
                WHERE gio_yeu_thich.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT}
            );

            return products;
        }
        catch(error){
            console.log(error);
        }
    }

    async getCart(idUser){
        try{
            let products = await sequelize.query(
                `SELECT loai_san_pham.MaSanPham, loai_san_pham.LoaiSanPham, san_pham.TenSanPham,
                    loai_san_pham.TenLoaiSanPham, loai_san_pham.DonGia, gio_hang.SoLuongMua,
                    (SELECT hinh_anh_san_pham.HinhAnh FROM hinh_anh_san_pham WHERE hinh_anh_san_pham.MaSanPham = loai_san_pham.MaSanPham LIMIT 0,1) AS HinhAnh
                FROM gio_hang JOIN loai_san_pham ON gio_hang.LoaiSanPham = loai_san_pham.LoaiSanPham 
                    AND gio_hang.MaSanPham = loai_san_pham.MaSanPham
                    JOIN san_pham ON gio_hang.MaSanPham = san_pham.MaSanPham
                WHERE gio_hang.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT}
            );

            return products;
        }
        catch(error){
            console.log(error);
        }
    }

    async addToCart(idUser, idProduct, idCategory, quantityProduct){
        try{
            //Check cart previous
            let product = await sequelize.query(
                `SELECT * FROM gio_hang
                WHERE gio_hang.MaKhachHang = ${idUser} AND gio_hang.MaSanPham = ${idProduct} 
                    AND gio_hang.LoaiSanPham = '${idCategory}'`,
                {type: QueryTypes.SELECT}
            )

            if(product.length != 0){
                let newQuantity = product[0].SoLuongMua + Number.parseInt(quantityProduct);
                await sequelize.query(
                    `UPDATE gio_hang SET gio_hang.SoLuongMua = ${newQuantity}
                    WHERE gio_hang.MaKhachHang = ${idUser} AND gio_hang.MaSanPham = ${idProduct} 
                    AND gio_hang.LoaiSanPham = '${idCategory}'`
                );
            }
            else{
                await sequelize.query(
                    `INSERT INTO gio_hang(MaKhachHang, MaSanPham, LoaiSanPham, SoLuongMua)
                        VALUE(${idUser}, ${idProduct}, '${idCategory}', ${quantityProduct});`
                );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteProductInWishList(idUser, idProduct, idCategory){
        try{
            await sequelize.query(
                `DELETE FROM gio_yeu_thich
                WHERE gio_yeu_thich.MaKhachHang = ${idUser} AND gio_yeu_thich.MaSanPham = ${idProduct}
                    AND gio_yeu_thich.LoaiSanPham = '${idCategory}';`
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteProductInCart(idUser, idProduct, idCategory){
        try{
            await sequelize.query(
                `DELETE FROM gio_hang
                WHERE gio_hang.MaKhachHang = ${idUser} AND gio_hang.MaSanPham = ${idProduct}
                    AND gio_hang.LoaiSanPham = '${idCategory}';`
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteAllProductInCart(idUser){
        try{
            await sequelize.query(
                `DELETE FROM gio_hang
                WHERE gio_hang.MaKhachHang = ${idUser};`
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async updateCart(idUser, productList){
        try{
            for(let i = 0; i < productList.length; i++){
                await sequelize.query(
                    `UPDATE gio_hang SET gio_hang.SoLuongMua = ${productList[i].quantityProduct}
                    WHERE gio_hang.MaKhachHang = ${idUser} AND gio_hang.MaSanPham = ${productList[i].idProduct}
                    AND gio_hang.LoaiSanPham = '${productList[i].idCategory}';`
                ) 
            };
        }
        catch(error){
            console.log(error);
        }
    }

    async addBill(idUser, billInfo, products){
        //Get time for bill
        let dateTime = new Date().toJSON().slice(0, 19).replace('T', ' ');
        let statusBill = 0; //bill is pedding
        try{
            for(let i = 0; i < products.length; i++){
                await sequelize.query(
                    `INSERT INTO don_hang(MaKhachHang, MaSanPham, LoaiSanPham, DonGia, SoLuongSanPham, ThoiGian,
                        HoTen, SoDienThoai, Email, DiaChiGiaoHang, TrangThaiDonHang, LuuYCuaNguoiMua)
                    VALUE(${idUser}, ${products[i].MaSanPham}, '${products[i].LoaiSanPham}', ${products[i].DonGia},
                        ${products[i].SoLuongMua}, '${dateTime}', '${billInfo.name}', '${billInfo.phone}', '${billInfo.email}', '${billInfo.address}', ${statusBill}, '${billInfo.message}');`
                )
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async getBill(idUser){
        try{
            let bills = await sequelize.query(
                `SELECT don_hang.*, san_pham.TenSanPham, loai_san_pham.TenLoaiSanPham
                FROM don_hang JOIN san_pham ON don_hang.MaSanPham = san_pham.MaSanPham
                        JOIN loai_san_pham ON don_hang.LoaiSanPham = loai_san_pham.LoaiSanPham
                            AND don_hang.MaSanPham = loai_san_pham.MaSanPham
                WHERE don_hang.MaKhachHang = ${idUser} ORDER BY don_hang.ThoiGian DESC`,
                {type: QueryTypes.SELECT}
            )            
            
            return bills
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = new CartService;