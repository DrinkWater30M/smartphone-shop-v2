function createWishList(data){
    let result = '';
    if(data.length==0){
        result = `<li>Chưa có sản phẩm nào!</li>`;
    }
    else{
        for(let i = 0; i < data.length; i++){
            result += 
                `<li>
                    <a href="/products/detail?id=${data[i].MaSanPham}" class="image"><img src=${data[i].HinhAnh} alt="Cart product Image"></a>
                    <div class="content">
                        <a href="/products/detail?id=${data[i].MaSanPham}" class="title">
                            ${data[i].TenSanPham}<br>${data[i].TenLoaiSanPham}<br>${data[i].MauSac}</a>
                        <span class="quantity-price">1 x <span class="amount">${data[i].DonGia}vnđ</span></span>
                        <a href="javascript:{}" class="remove">×</a>
                    </div>
                </li>`;
        }
    }

    return result;
}

function createCart(data){
    let result = '';
    if(data.length==0){
        result = `<li>Chưa có sản phẩm nào!</li>`;
    }
    else{
        for(let i = 0; i < data.length; i++){
            result += 
                `<li>
                    <a href="/products/detail?id=${data[i].MaSanPham}" class="image"><img src=${data[i].HinhAnh} alt="Cart product Image"></a>
                    <div class="content">
                        <a href="/products/detail?id=${data[i].MaSanPham}" class="title">
                            ${data[i].TenSanPham}<br>${data[i].TenLoaiSanPham}<br>${data[i].MauSac}
                        </a>
                        <span class="quantity-price">${data[i].SoLuongMua} x <span class="amount">${data[i].DonGia}vnđ</span></span>
                        <a href="javascript:{}" class="remove">×</a>
                    </div>
                </li>`;
        }
    }

    return result;
}

function main(){
    //Call ajax when click wishlist
    let wishListTag = document.querySelector('a[href="#offcanvas-wishlist"]');
    if(wishListTag){
        wishListTag.addEventListener('click', ()=>{
            $.ajax({
                url: '/api/wishlist/products',
                type: 'GET',
                success: function(res){
                    //Create html
                    let data = res;
                    let html = createWishList(data);
                    
                    //Append html
                    $('#offcanvas-wishlist ul[class="minicart-product-list"]').html(html);
                },
                error: function (xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    let html = `<li style="color: red;">${message}</li>`
                    $('#offcanvas-wishlist ul[class="minicart-product-list"]').html(html);
                }
            })
        })
    }

    //Call ajax when click cart
    let cartTag = document.querySelector('a[href="#offcanvas-cart"]');
    if(cartTag){
        cartTag.addEventListener('click', ()=>{
            $.ajax({
                url: '/api/cart/products',
                type: 'GET',
                success: function(res){
                    //Create html
                    let data = res;
                    let html = createCart(data);
                    
                    //Append html
                    $('#offcanvas-cart ul[class="minicart-product-list"]').html(html);
                },
                error: function (xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    let html = `<li style="color: red;">${message}</li>`
                    $('#offcanvas-cart ul[class="minicart-product-list"]').html(html);
                }
            })
        })
    }
}

main();