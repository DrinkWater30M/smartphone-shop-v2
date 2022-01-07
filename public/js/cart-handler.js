function main(){
    //Get list product in cart
    let products = document.querySelectorAll('tr[class="single-product"]');
    products.forEach(product=>{
        let removeProduct = product.querySelector('.product-remove .remove');
        let idProduct = product.querySelector('input[name="idProduct"]').value;
        let idCategory = product.querySelector('input[name="idCategory"]').value;

        //Call ajax when click remove product
        removeProduct.addEventListener('click', ()=>{
            $.ajax({
                url:'/api/cart/remove-product',
                type: 'DELETE',
                data: {idProduct, idCategory},
                success: function(res){
                    //Notification
                    alert(res.message);

                    //Remore product in client
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

    //Call ajax to remove all product in cart
    let removeAll = document.getElementById('remove-all');
    removeAll.addEventListener('click', ()=>{
        $.ajax({
            url:'/api/cart/remove-all-product',
            type: 'DELETE',
            success: function(res){
                //Notification
                alert(res.message);

                //Remore product in client
                products.forEach(product=>{product.remove()});
            },
            error:function(xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                alert(message);
            }
        })
    })

    //Call ajax to save change
    let checkOut = document.getElementById('check-out');
    checkOut.addEventListener('click', ()=>{
        //Get data
        let products = document.querySelectorAll('tr[class="single-product"]');
        let data = [];
        products.forEach(product => {
            let idProduct = product.querySelector('input[name="idProduct"]').value;
            let idCategory = product.querySelector('input[name="idCategory"]').value;
            let quantityProduct = product.querySelector('input[name="qtybutton"]').value;
    
            data.push({idProduct, idCategory, quantityProduct});
        })

        //Call ajax
        $.ajax({
            url:'/api/cart/update-quantity-products',
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(res){
                //Redirect
                location.href = res.redirectUrl;
            },
            error:function(xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                alert(message);
            }
        })
    })
}

main();