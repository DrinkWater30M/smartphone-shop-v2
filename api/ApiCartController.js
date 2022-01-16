'use strict'
const cartService = require('../services/CartService');

class ApiCartController{
    async getWishList(req, res, next){
        try{
            //Get product in wish list
            let idUser = req.user.MaKhachHang;
            let products = await cartService.getWishList(idUser);

            //Return data
            res.status(200).json(products);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async getCart(req, res, next){
        try{
            //Get product in cart
            let idUser = req.user.MaKhachHang;
            let products = await cartService.getCart(idUser);

            //Return data
            res.status(200).json(products);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async addToWishlist(req, res, next){
        try{
            //insert data
            let idUser = req.user.MaKhachHang;
            let {idProduct, idCategory} = req.body;
            await cartService.addToWishlist(idUser, idProduct, idCategory);

            //Return result to client
            res.status(200).json({message: "Thêm thành công!"});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async addToCart(req, res, next){
        try{
            //insert data
            let idUser = req.user.MaKhachHang;
            let {idProduct, idCategory, quantityProduct} = req.body;
            await cartService.addToCart(idUser, idProduct, idCategory, quantityProduct);

            //Return result to client
            res.status(200).json({message: "Thêm thành công!"});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async deleteProductInWishList(req, res, next){
        try{
            //Delete product in wishlist
            let idUser = req.user.MaKhachHang;
            let {idProduct, idCategory} = req.body;
            await cartService.deleteProductInWishList(idUser, idProduct, idCategory);

            //Return result to client
            res.status(200).json({message: "Xóa thành công!"});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async deleteProductInCart(req, res, next){
        try{
            //Delete product in wishlist
            let idUser = req.user.MaKhachHang;
            let {idProduct, idCategory} = req.body;
            if(idProduct && idCategory){
                //Delete one prodcut
                await cartService.deleteProductInCart(idUser, idProduct, idCategory);
            }
            else{
                //Delete all product
                await cartService.deleteAllProductInCart(idUser)
            }

            //Return result to client
            res.status(200).json({message: "Xóa thành công!"});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async updateCart(req, res, next){
        try{
            //Get data to update
            let idUser = req.user.MaKhachHang;
            let productList = req.body;

            //Update
            await cartService.updateCart(idUser, productList);

            //Return url to redirect to checkout
            res.status(200).json({redirectUrl: '/cart/checkout'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async addBill(req, res, next){
        try{
            //Get data to add bill
            let idUser = req.user.MaKhachHang;
            let billInfo = req.body;
            let products = await cartService.getCart(idUser);

            if(products.length == 0){
                res.status(422).json({error: "Không có sản phẩm để lên đơn!"});
                return
            }
            
            //Add bill
            await cartService.addBill(idUser, billInfo, products);

            //Delete all product in cart
            await cartService.deleteAllProductInCart(idUser);

            //Return url to redirect to thankyou: success
            res.status(200).json({redirectUrl: '/cart/thankyou'});
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }

    async getBill(req, res, next){
        try{
            //Get idUser
            let idUser = req.user.MaKhachHang;

            //Get bill
            let bills = await cartService.getBill(idUser);

            //Cal total bill, assign status bill, convert time
            bills.forEach(bill=>{
                //Cal total bill
                bill.ThanhTien = bill.DonGia * bill.SoLuongSanPham;
                
                //status bill
                bill.TrangThaiDonHang = bill.TrangThaiDonHang == 0 ? 'Chờ duyệt!' 
                    : (bill.TrangThaiDonHang == 1 ? 'Đang giao!' : 'Đã giao!');

                //date time of bill
                let dateTime = bill.ThoiGian.toLocaleString();
                let startStrRemove = dateTime.lastIndexOf(':');
                let endStrRemove = dateTime.lastIndexOf(' ') + 1;
                bill.ThoiGian = dateTime.slice(0, startStrRemove) + dateTime.slice(endStrRemove);
            })

            //Return url to redirect to thankyou: success
            res.status(200).json(bills);
        }
        catch(error){
            console.log(error);
            res.status(500).send({error: "Đã có lỗi trên server! Vui lòng thử lại!"});
        }
    }
}


module.exports = new ApiCartController;