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
                filterSearch = `AND (san_pham.TenSanPham like '%${currentSearch}%' 
                    OR loai_san_pham.TenLoaiSanPham like '%${currentSearch}%')`;
            }

            let filterBrand = currentBrand ? `AND thuong_hieu.MaThuongHieu = '${currentBrand}'` : "";
            let filterColor = currentColor ? `AND loai_san_pham.MauSac = '${currentColor}'` : "";
            let filterRam = currentRam ? `AND loai_san_pham.Ram = ${currentRam}` : "";
            let filterRom = currentRom ? `AND loai_san_pham.Rom = ${currentRom}` : "";
            let filterPrice = (currentMinPrice && currentMaxPrice) ? 
                `AND (loai_san_pham.DonGia BETWEEN ${currentMinPrice} AND ${currentMaxPrice})` : "";
            let filter = "";
            if(filterSearch || filterBrand || filterColor || filterRam ||filterRom || filterPrice){
                filter = "WHERE " + filterSearch + filterBrand + filterColor + filterRam + filterRom + filterPrice;

                //Remove string " AND" in near string "WHERE"
                filter = filter.replace("AND ", "");
            }

            //Create condition sort
            let typeSort = [
                "",
                "san_pham.TenSanPham ASC",
                "san_pham.TenSanPham DESC",
                "DonGiaNhoNhat ASC",
                "DonGiaNhoNhat DESC",
                "rand()",
                "loai_san_pham.Pin DESC",
                "loai_san_pham.Rom DESC",
            ]
            let sort = currentSort ? `ORDER BY ${typeSort[currentSort]}` : "";

            //Cal offset
            let offset = (currentPage - 1) * itemsPerPage;

            //Query
            let products = await sequelize.query(
                `SELECT san_pham.MaSanPham, san_pham.TenSanPham, san_pham.MoTa,
                MIN(loai_san_pham.DonGia) AS DonGiaNhoNhat, thuong_hieu.ThuongHieu, loai_san_pham.*,
                    (SELECT hinh_anh_san_pham.HinhAnh FROM hinh_anh_san_pham
                        WHERE hinh_anh_san_pham.MaSanPham = san_pham.MaSanPham LIMIT 1) AS HinhAnhDaiDien
                FROM san_pham join loai_san_pham ON san_pham.MaSanPham = loai_san_pham.MaSanPham
                JOIN thuong_hieu ON san_pham.MaThuongHieu = thuong_hieu.MaThuongHieu
                ${filter}
                GROUP BY san_pham.MaSanPham
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
    
    getBrandsList(){
        return models.thuong_hieu.findAll({
            raw: true
        })
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
                FROM san_pham join loai_san_pham ON san_pham.MaSanPham = loai_san_pham.MaSanPham
                    JOIN thuong_hieu ON san_pham.MaThuongHieu = thuong_hieu.MaThuongHieu
                WHERE san_pham.MaSanPham = ${idProduct}`,
                {type: QueryTypes.SELECT}
            );

            //Get images of product
            let images = await sequelize.query(
                `SELECT hinh_anh_san_pham.HinhAnh
                FROM hinh_anh_san_pham
                WHERE hinh_anh_san_pham.MaSanPham = '${idProduct}'`,
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
                `SELECT san_pham.MaSanPham, san_pham.TenSanPham, thuong_hieu.ThuongHieu,
                    MIN(loai_san_pham.DonGia) AS DonGiaThapNhat,  MAX(loai_san_pham.DonGia) AS DonGiaCaoNhat,
                    (SELECT hinh_anh_san_pham.HinhAnh 
                    FROM hinh_anh_san_pham 
                    WHERE hinh_anh_san_pham.MaSanPham = san_pham.MaSanPham
                    LIMIT 0, 1) AS HinhAnh
                FROM san_pham JOIN loai_san_pham ON san_pham.MaSanPham = loai_san_pham.MaSanPham
                    JOIN thuong_hieu ON san_pham.MaThuongHieu = thuong_hieu.MaThuongHieu
                WHERE san_pham.MaThuongHIeu = (SELECT san_pham.MaThuongHieu FROM san_pham WHERE san_pham.MaSanPham = '${id}')
                GROUP BY san_pham.MaSanPham`,
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
                `SELECT khach_hang.MaKhachHang, khach_hang.HoTen, khach_hang.Email,
                binh_luan.DanhGia, binh_luan.NoiDung, binh_luan.ThoiGian
                FROM binh_luan JOIN san_pham ON binh_luan.MaSanPham = san_pham.MaSanPham
                JOIN khach_hang ON binh_luan.MaKhachHang = khach_hang.MaKhachHang
                WHERE san_pham.MaSanPham = '${idProduct}'
                ORDER BY binh_luan.ThoiGian DESC
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
                `SELECT COUNT(binh_luan.MaBinhLuan) as TongDanhGia, AVG(binh_luan.DanhGia) as SaoTrungBinh
                FROM binh_luan JOIN san_pham ON binh_luan.MaSanPham = san_pham.MaSanPham 
                WHERE san_pham.MaSanPham = '${id}'`,
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
                `INSERT INTO binh_luan(MaSanPham, MaKhachHang, DanhGia, NoiDung, ThoiGian)
                VALUE('${idProduct}', ${idUser}, ${rating}, '${content}', '${dateTime}')`
            );

            let user = await sequelize.query(
                `SELECT khach_hang.MaKhachHang, khach_hang.HoTen, khach_hang.Email
                FROM khach_hang WHERE khach_hang.MaKhachHang = ${idUser}`,
                {type: QueryTypes.SELECT});
            
            return {user: user[0], rating, content, dateTime: new Date(dateTime.replace(" ", "T") + "Z").toString()};
        }
        catch(error){
            console.log(error);
        }
    }

}

module.exports = new ProductsService;
