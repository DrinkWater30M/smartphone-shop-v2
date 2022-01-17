'use strict';
const Sequelize = require('sequelize');
const { Op } = require('sequelize/dist');
const { SELECT } = require('sequelize/dist/lib/query-types');
const { QueryTypes } = require('sequelize/dist/lib/sequelize');
const {sequelize, models} = require('../models/index');

class ProductsService{
    // getProductsList(itemsPerPage, currentPage, currentBrand, currentColor, currentRam, currentRom, currentMinPrice, currentMaxPrice, currentSort)
    // {
    //     let filterBrand = currentBrand ? {MaThuongHieu: currentBrand} : {};
    //     let fitlerTypeProducts = {};
    //     if(currentColor){ fitlerTypeProducts.MauSac = currentColor};
    //     if(currentRam){ fitlerTypeProducts.Ram = currentRam};
    //     if(currentRom){ fitlerTypeProducts.Rom = currentRom};
    //     if(currentMinPrice && currentMaxPrice){fitlerTypeProducts.DonGia = {[Op.between]: [currentMinPrice, currentMaxPrice]}};

    //     let typeSort = [
    //         [], 
    //         [['TenSanPham', 'ASC']], 
    //         [['TenSanPham', 'DESC']],
    //         [[{model: models.loai_san_pham, as: 'loai_san_phams'},'DonGia', 'DESC']],
    //     ]

    //     return models.san_pham.findAll(
    //         {
    //             include: [
    //                 {
    //                     model: models.hinh_anh_san_pham,
    //                     as: 'hinh_anh_san_phams',
    //                     attributes: ['HinhAnh']
    //                 },
    //                 {
    //                     model: models.thuong_hieu,
    //                     as: 'MaThuongHieu_thuong_hieu',
    //                     attributes:['ThuongHieu']
    //                 },
    //                 {
    //                    model: models.loai_san_pham,
    //                    as: 'loai_san_phams',
    //                    attributes: ['DonGia', 'MauSac', 'Ram', 'Rom'],  
    //                    where: fitlerTypeProducts,
    //                 }
    //             ],
                
    //             order: typeSort[currentSort],
    //             where: filterBrand,
    //             raw: true,
    //             offset: (currentPage-1)*itemsPerPage,
    //             limit: itemsPerPage,
    //         }
    //     )
    //     .then( (data) => {
    //         //Get first item of each products
    //         data = Object.values(data).filter((item,i,a)=>a.findIndex(t=>(t.MaSanPham === item.MaSanPham))===i);
    //         return data;
    //     })
    // }

    async getProductsList(itemsPerPage, currentPage, currentSearch, currentBrand, currentColor, currentRam, currentRom, currentMinPrice, currentMaxPrice, currentSort)
    {
        try{
            //Create condition filter
            let filterSearch = "";
            if(currentSearch){
                filterSearch = `AND (SAN_PHAM.TenSanPham like '%${currentSearch}%' 
                    OR LOAI_SAN_PHAM.TenLoaiSanPham like '%${currentSearch}%')`;
            }

            let filterBrand = currentBrand ? `AND THUONG_HIEU.MaThuongHieu = '${currentBrand}'` : "";
            let filterColor = currentColor ? `AND LOAI_SAN_PHAM.MauSac = '${currentColor}'` : "";
            let filterRam = currentRam ? `AND LOAI_SAN_PHAM.Ram = ${currentRam}` : "";
            let filterRom = currentRom ? `AND LOAI_SAN_PHAM.Rom = ${currentRom}` : "";
            let filterPrice = (currentMinPrice && currentMaxPrice) ? 
                `AND (LOAI_SAN_PHAM.DonGia BETWEEN ${currentMinPrice} AND ${currentMaxPrice})` : "";
            let filter = "";
            if(filterSearch || filterBrand || filterColor || filterRam ||filterRom || filterPrice){
                filter = "WHERE " + filterSearch + filterBrand + filterColor + filterRam + filterRom + filterPrice;

                //Remove string " AND" in near string "WHERE"
                filter = filter.replace("AND ", "");
            }

            //Create condition sort
            let typeSort = [
                "",
                "SAN_PHAM.TenSanPham ASC",
                "SAN_PHAM.TenSanPham DESC",
                "DonGiaNhoNhat ASC",
                "DonGiaNhoNhat DESC",
                "rand()",
                "LOAI_SAN_PHAM.Pin DESC",
                "LOAI_SAN_PHAM.Rom DESC",
            ]
            let sort = currentSort ? `ORDER BY ${typeSort[currentSort]}` : "";

            //Cal offset
            let offset = (currentPage - 1) * itemsPerPage;

            //Query
            let products = await sequelize.query(
                `SELECT SAN_PHAM.*, LOAI_SAN_PHAM.*,
                LOAI_SAN_PHAM.DonGia AS DonGiaNhoNhat, THUONG_HIEU.ThuongHieu,
                    (SELECT HINH_ANH_SAN_PHAM.HinhAnh FROM HINH_ANH_SAN_PHAM
                        WHERE HINH_ANH_SAN_PHAM.MaSanPham = SAN_PHAM.MaSanPham LIMIT 1) AS HinhAnhDaiDien
                FROM SAN_PHAM join LOAI_SAN_PHAM ON SAN_PHAM.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                JOIN THUONG_HIEU ON SAN_PHAM.MaThuongHieu = THUONG_HIEU.MaThuongHieu
                ${filter}
                ${sort}
                LIMIT ${offset}, ${itemsPerPage};`,
                {type: QueryTypes.SELECT}
            )

            return products;
        }
        catch(error){
            console.log(error);
        }
    }
    
    async getBrandsList(){
        try{
            let brands = await sequelize.query(
                `SELECT * FROM THUONG_HIEU ORDER BY THUONG_HIEU.ThuongHieu ASC`,
                {type: QueryTypes.SELECT}
            )            
            
            return brands
        }
        catch(error){
            console.log(error);
        }
    }
    
    // async getProductDetail(id){
    //     try{
    //         //Get products
    //         let productsInf = await sequelize.query(
    //             `SELECT *
    //             FROM san_pham join loai_san_pham ON san_pham.MaSanPham = loai_san_pham.MaSanPham
    //                 JOIN thuong_hieu ON san_pham.MaThuongHieu = thuong_hieu.MaThuongHieu
    //             WHERE san_pham.MaSanPham = '${id}'`,
    //             {type: QueryTypes.SELECT}
    //         );

    //         //Get images of product
    //         let images = await sequelize.query(
    //             `SELECT hinh_anh_san_pham.HinhAnh
    //             FROM hinh_anh_san_pham
    //             WHERE hinh_anh_san_pham.MaSanPham = '${id}'`,
    //             {type: QueryTypes.SELECT}
    //         );

    //         //Get representation product
    //         let productInf = productsInf[0];

    //         //Get type product
    //         let memory = productsInf.map(productInf => 
    //             { return {Ram: productInf.Ram, Rom: productInf.Rom}});

    //         memory = memory.filter((value, index, self) =>
    //             index === self.findIndex((t) => (
    //               t.Ram === value.Ram && t.Rom === value.Rom
    //             ))
    //         )

    //         let color = productsInf.map(productInf => 
    //             {return {MauSac: productInf.MauSac}});
    //         color = [...new Set(color)];

    //         return {productInf, images, memory, color}
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
        
    // }

    async getProductDetail(idProduct, idCategory){
        try{
            //Get products
            let productList = await sequelize.query(
                `SELECT *
                FROM SAN_PHAM join LOAI_SAN_PHAM ON SAN_PHAM.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                    JOIN THUONG_HIEU ON SAN_PHAM.MaThuongHieu = THUONG_HIEU.MaThuongHieu
                WHERE SAN_PHAM.MaSanPham = ${idProduct}`,
                {type: QueryTypes.SELECT}
            );

            //Get images of product
            let images = await sequelize.query(
                `SELECT HINH_ANH_SAN_PHAM.HinhAnh
                FROM HINH_ANH_SAN_PHAM
                WHERE HINH_ANH_SAN_PHAM.MaSanPham = '${idProduct}'`,
                {type: QueryTypes.SELECT}
            );

            //Get type product
            let memory = productList.map(productInf => 
                { return {Ram: productInf.Ram, Rom: productInf.Rom}});

            memory = memory.filter((value, index, self) =>
                index === self.findIndex((t) => (
                  t.Ram === value.Ram && t.Rom === value.Rom
                ))
            )

            let color = productList.map(productInf => 
                {return {MauSac: productInf.MauSac}});
            color = [...new Set(color)];

            //Get representation product
            let productInf;
            if(idCategory){
                productInf = productList.filter(product => {
                    return product.LoaiSanPham == idCategory;
                });
            }
            else{
                productInf = productList.reduce(function(prev, curr) {
                    return prev.DonGia < curr.DonGia ? prev : curr;
                });
            }

            return {productInf, images, memory, color, productList}
        }
        catch(error){
            console.log(error);
        }
    }

    async getRelatedProducts(id){
        try{
            let relatedProducts = await sequelize.query(
                `SELECT SAN_PHAM.MaSanPham, SAN_PHAM.TenSanPham, THUONG_HIEU.ThuongHieu,
                    MIN(LOAI_SAN_PHAM.DonGia) AS DonGiaThapNhat,  MAX(LOAI_SAN_PHAM.DonGia) AS DonGiaCaoNhat,
                    (SELECT HINH_ANH_SAN_PHAM.HinhAnh 
                    FROM HINH_ANH_SAN_PHAM 
                    WHERE HINH_ANH_SAN_PHAM.MaSanPham = SAN_PHAM.MaSanPham
                    LIMIT 0, 1) AS HinhAnh
                FROM SAN_PHAM JOIN LOAI_SAN_PHAM ON SAN_PHAM.MaSanPham = LOAI_SAN_PHAM.MaSanPham
                    JOIN THUONG_HIEU ON SAN_PHAM.MaThuongHieu = THUONG_HIEU.MaThuongHieu
                WHERE SAN_PHAM.MaThuongHIeu = (SELECT SAN_PHAM.MaThuongHieu FROM SAN_PHAM WHERE SAN_PHAM.MaSanPham = '${id}')
                GROUP BY SAN_PHAM.MaSanPham`,
                {type: QueryTypes.SELECT}
            );

            return relatedProducts;
        }
        catch(error){
            console.log(error);
        }
    }

    async getSomeRating(idProduct, offset, count){
        try{
            let someRating = await sequelize.query(
                `SELECT KHACH_HANG.MaKhachHang, KHACH_HANG.HoTen, KHACH_HANG.Email,
                BINH_LUAN.DanhGia, BINH_LUAN.NoiDung, BINH_LUAN.ThoiGian
                FROM BINH_LUAN JOIN SAN_PHAM ON BINH_LUAN.MaSanPham = SAN_PHAM.MaSanPham
                JOIN KHACH_HANG ON BINH_LUAN.MaKhachHang = KHACH_HANG.MaKhachHang
                WHERE SAN_PHAM.MaSanPham = '${idProduct}'
                ORDER BY BINH_LUAN.ThoiGian DESC
                LIMIT ${offset}, ${count}`,
                {type: QueryTypes.SELECT}
            );
            
            //Create color of star from DanhGia to rander with handlebars
            someRating.forEach((rating) => {
                let stars = rating.DanhGia;
                rating.DanhGia = [];
                for(let i = 0; i < 5; i++){
                    if(i < stars){
                        rating.DanhGia.push('#ffde00');
                    }
                    else{
                        rating.DanhGia.push('silver');
                    }
                }
            }
            )

            return someRating;
        }
        catch(error){
            console.log(error);
        }
    }

    async totalRating(id){
        try{
            let totalRating = await sequelize.query(
                `SELECT COUNT(BINH_LUAN.MaBinhLuan) as TongDanhGia, AVG(BINH_LUAN.DanhGia) as SaoTrungBinh
                FROM BINH_LUAN JOIN SAN_PHAM ON BINH_LUAN.MaSanPham = SAN_PHAM.MaSanPham 
                WHERE SAN_PHAM.MaSanPham = '${id}'`,
                {type: QueryTypes.SELECT}
            )

            if(totalRating[0].TongDanhGia == null){totalRating[0].TongDanhGia = 0};
            if(totalRating[0].SaoTrungBinh == null){totalRating[0].SaoTrungBinh = 0};

            totalRating[0].SaoTrungBinh = Number.parseFloat(totalRating[0].SaoTrungBinh).toFixed(1);

            return totalRating[0];
        }
        catch(error){
            console.log(error);
        }
    }

    async addRating(idUser, idProduct, rating, content){
        //Get datetime of rating
        let dateTime = new Date().toJSON().slice(0, 19).replace('T', ' ');

        //Write data to DB
        try{
            await sequelize.query(
                `INSERT INTO BINH_LUAN(MaSanPham, MaKhachHang, DanhGia, NoiDung, ThoiGian)
                VALUE('${idProduct}', ${idUser}, ${rating}, '${content}', '${dateTime}')`
            );

            let user = await sequelize.query(
                `SELECT KHACH_HANG.MaKhachHang, KHACH_HANG.HoTen, KHACH_HANG.Email
                FROM KHACH_HANG WHERE KHACH_HANG.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT});
            
            return {user: user[0], rating, content, dateTime: new Date(dateTime.replace(" ", "T") + "Z").toString()};
        }
        catch(error){
            console.log(error);
        }
    }

}

module.exports = new ProductsService;
