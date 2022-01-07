function main(){
    //Get list product in wishlist
    let products = document.querySelectorAll('tr[class="single-product"]');

    products.forEach(product=>{
        let addToCartBtn = product.querySelector('.add-to-cart');
        let removeProduct = product.querySelector('.product-remove .remove');
        let idProduct = product.querySelector('input[name="idProduct"]').value;
        let idCategory = product.querySelector('input[name="idCategory"]').value;
        let quantityProduct = 1;

        addToCartBtn.addEventListener('click', ()=>{
            //Call ajax to add product to cart
            $.ajax({
                url:'/api/wishlist/add-to-cart',
                type: 'POST',
                data: {idProduct, idCategory, quantityProduct},
                success: function(res){
                    alert(res.message);
                },
                error:function(xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    alert(message);
                }
            })
        })
        
        //Call ajax to remove product
        removeProduct.addEventListener('click', ()=>{
            $.ajax({
                url:'/api/wishlist/remove-product',
                type: 'DELETE',
                data: {idProduct, idCategory},
                success: function(res){
                    //Notification
                    alert(res.message);

                    //Delete product in client
                    product.remove();
                },
                error:function(xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    alert(message);
                }
            })
        })
    })

}

main();