'use strict';
const Sequelize = require('sequelize');
const { Op } = require('sequelize/dist');
const {sequelize, models} = require('../models/index');

class ProductsService{
    getProductsList(itemsPerPage, currentPage, currentBrand, currentColor, currentRam, currentRom, currentMinPrice, currentMaxPrice, currentSort)
    {
        let filterBrand = currentBrand ? {MaThuongHieu: currentBrand} : {};
        let fitlerTypeProducts = {};
        if(currentColor){ fitlerTypeProducts.MauSac = currentColor};
        if(currentRam){ fitlerTypeProducts.Ram = currentRam};
        if(currentRom){ fitlerTypeProducts.Rom = currentRom};
        if(currentMinPrice && currentMaxPrice){fitlerTypeProducts.DonGia = {[Op.between]: [currentMinPrice, currentMaxPrice]}};

        let typeSort = [
            [], 
            [['TenSanPham', 'ASC']], 
            [['TenSanPham', 'DESC']],
            [[{model: models.loai_san_pham, as: 'loai_san_phams'},'DonGia', 'DESC']],
        ]

        return models.san_pham.findAll(
            {
                include: [
                    {
                        model: models.hinh_anh_san_pham,
                        as: 'hinh_anh_san_phams',
                        attributes: ['HinhAnh']
                    },
                    {
                        model: models.thuong_hieu,
                        as: 'MaThuongHieu_thuong_hieu',
                        attributes:['ThuongHieu']
                    },
                    {
                       model: models.loai_san_pham,
                       as: 'loai_san_phams',
                       attributes: ['DonGia', 'MauSac', 'Ram', 'Rom'],  
                       where: fitlerTypeProducts,
                    }
                ],
                
                order: typeSort[currentSort],
                where: filterBrand,
                raw: true,
                offset: (currentPage-1)*itemsPerPage,
                limit: itemsPerPage,
            }
        )
        .then( (data) => {
            //Get first item of each products
            data = Object.values(data).filter((item,i,a)=>a.findIndex(t=>(t.MaSanPham === item.MaSanPham))===i);
            return data;
        })
    }

    
    getBrandsList(){
        return models.thuong_hieu.findAll({
            raw: true
        })
    }
    
    getProductsDetail(id){
        return models.san_pham.findOne(
            {
                raw: true,
                where: {
                    MaSanPham: id
                },

                include:[
                    {
                        model: models.hinh_anh_san_pham,
                        as: 'hinh_anh_san_phams',
                    },
                    {
                        model: models.loai_san_pham,
                        as: 'loai_san_phams',
                    }
                ]
            }
        );
    }

    getImageProductsDetail(id){
        return models.san_pham.findAll(
            {
                raw: true,
                where: {
                    MaSanPham: id
                },

                include:[
                    {
                        model: models.hinh_anh_san_pham,
                        as: 'hinh_anh_san_phams',
                    },
                    {
                        model: models.loai_san_pham,
                        as: 'loai_san_phams',
                    }
            
                ]
            }
        );
    }

    getCommentProductsDetail(id){
        // return models.san_pham.findAll({
        //     raw: true,
        //     where: {MaSanPham: id},
            
        //     include: [
        //         {
        //             model: models.binh_luan,
        //             as: 'binh_luans'
        //         }
        //     ]
        // })
        // .then((data) => {
        //     data = data.filter((item) => {return item['binh_luans.MaBinhLuan'] != null});
        //     return data
        // })
    }
}

module.exports = new ProductsService;
