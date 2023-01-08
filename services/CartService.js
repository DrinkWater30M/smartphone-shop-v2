'use strict';
const {sequelize, models} = require('../models/index');
const { QueryTypes } = require('sequelize');

class CartService{
    async getWishList(idUser){
        try{
            let products = await sequelize.query(
                `SELECT LOAI_SAN_PHAM.MaSanPham, LOAI_SAN_PHAM.LoaiSanPham, SAN_PHAM.TenSanPham,
                    LOAI_SAN_PHAM.TenLoaiSanPham, LOAI_SAN_PHAM.MauSac, LOAI_SAN_PHAM.DonGia,
                    (SELECT HINH_ANH_SAN_PHAM.HinhAnh FROM HINH_ANH_SAN_PHAM WHERE HINH_ANH_SAN_PHAM.MaSanPham = LOAI_SAN_PHAM.MaSanPham LIMIT 0,1) AS HinhAnh
                FROM GIO_YEU_THICH JOIN LOAI_SAN_PHAM ON GIO_YEU_THICH.LoaiSanPham = LOAI_SAN_PHAM.LoaiSanPham 
                    AND GIO_YEU_THICH.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                    JOIN SAN_PHAM ON GIO_YEU_THICH.MaSanPham = SAN_PHAM.MaSanPham
                WHERE GIO_YEU_THICH.MaKhachHang = ${idUser}`,
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
                `SELECT LOAI_SAN_PHAM.MaSanPham, LOAI_SAN_PHAM.LoaiSanPham, SAN_PHAM.TenSanPham,
                    LOAI_SAN_PHAM.TenLoaiSanPham, LOAI_SAN_PHAM.MauSac, LOAI_SAN_PHAM.DonGia, GIO_HANG.SoLuongMua,
                    (SELECT HINH_ANH_SAN_PHAM.HinhAnh FROM HINH_ANH_SAN_PHAM WHERE HINH_ANH_SAN_PHAM.MaSanPham = LOAI_SAN_PHAM.MaSanPham LIMIT 0,1) AS HinhAnh
                FROM GIO_HANG JOIN LOAI_SAN_PHAM ON GIO_HANG.LoaiSanPham = LOAI_SAN_PHAM.LoaiSanPham 
                    AND GIO_HANG.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                    JOIN SAN_PHAM ON GIO_HANG.MaSanPham = SAN_PHAM.MaSanPham
                WHERE GIO_HANG.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT}
            );

            return products;
        }
        catch(error){
            console.log(error);
        }
    }

    async addToWishlist(idUser, idProduct, idCategory){
        try{
            //Check wishlist previous
            let product = await sequelize.query(
                `SELECT * FROM GIO_YEU_THICH
                WHERE GIO_YEU_THICH.MaKhachHang = ${idUser} AND GIO_YEU_THICH.MaSanPham = ${idProduct} 
                    AND GIO_YEU_THICH.LoaiSanPham = '${idCategory}'`,
                {type: QueryTypes.SELECT}
            )

            //If not in wishlist, then product will add
            if(product.length == 0){
                await sequelize.query(
                    `INSERT INTO GIO_YEU_THICH(MaKhachHang, MaSanPham, LoaiSanPham)
                        VALUE(${idUser}, ${idProduct}, '${idCategory}');`
                );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async addToCart(idUser, idProduct, idCategory, quantityProduct){
        try{
            //Check cart previous
            let product = await sequelize.query(
                `SELECT * FROM GIO_HANG
                WHERE GIO_HANG.MaKhachHang = ${idUser} AND GIO_HANG.MaSanPham = ${idProduct} 
                    AND GIO_HANG.LoaiSanPham = '${idCategory}'`,
                {type: QueryTypes.SELECT}
            )

            if(product.length != 0){
                let newQuantity = product[0].SoLuongMua + Number.parseInt(quantityProduct);
                await sequelize.query(
                    `UPDATE GIO_HANG SET GIO_HANG.SoLuongMua = ${newQuantity}
                    WHERE GIO_HANG.MaKhachHang = ${idUser} AND GIO_HANG.MaSanPham = ${idProduct} 
                    AND GIO_HANG.LoaiSanPham = '${idCategory}'`
                );
            }
            else{
                await sequelize.query(
                    `INSERT INTO GIO_HANG(MaKhachHang, MaSanPham, LoaiSanPham, SoLuongMua)
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
                `DELETE FROM GIO_YEU_THICH
                WHERE GIO_YEU_THICH.MaKhachHang = ${idUser} AND GIO_YEU_THICH.MaSanPham = ${idProduct}
                    AND GIO_YEU_THICH.LoaiSanPham = '${idCategory}';`
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteProductInCart(idUser, idProduct, idCategory){
        try{
            await sequelize.query(
                `DELETE FROM GIO_HANG
                WHERE GIO_HANG.MaKhachHang = ${idUser} AND GIO_HANG.MaSanPham = ${idProduct}
                    AND GIO_HANG.LoaiSanPham = '${idCategory}';`
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteAllProductInCart(idUser){
        try{
            await sequelize.query(
                `DELETE FROM GIO_HANG
                WHERE GIO_HANG.MaKhachHang = ${idUser};`
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
                    `UPDATE GIO_HANG SET GIO_HANG.SoLuongMua = ${productList[i].quantityProduct}
                    WHERE GIO_HANG.MaKhachHang = ${idUser} AND GIO_HANG.MaSanPham = ${productList[i].idProduct}
                    AND GIO_HANG.LoaiSanPham = '${productList[i].idCategory}';`
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
                    `INSERT INTO DON_HANG(MaKhachHang, MaSanPham, LoaiSanPham, DonGia, SoLuongSanPham, ThoiGian,
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
                `SELECT DON_HANG.*, SAN_PHAM.TenSanPham, LOAI_SAN_PHAM.TenLoaiSanPham
                FROM DON_HANG JOIN SAN_PHAM ON DON_HANG.MaSanPham = SAN_PHAM.MaSanPham
                        JOIN LOAI_SAN_PHAM ON DON_HANG.LoaiSanPham = LOAI_SAN_PHAM.LoaiSanPham
                            AND DON_HANG.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                WHERE DON_HANG.MaKhachHang = ${idUser} ORDER BY DON_HANG.ThoiGian DESC`,
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