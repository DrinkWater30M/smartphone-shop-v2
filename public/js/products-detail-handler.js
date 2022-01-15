function changeInfProduct(ramCurrent, romCurrent, colorCurrent){
    let productList = document.querySelectorAll('#product-list .category');
    let product;
    for(let i=0; i<productList.length; i++){
        let ram = productList[i].querySelector('input[name="ram"]').value;
        let rom = productList[i].querySelector('input[name="rom"]').value;
        let color = productList[i].querySelector('input[name="color"]').value;

        //Get item that user choose
        if(ramCurrent == ram && romCurrent == rom && colorCurrent == color){
            product = productList[i];
        }
    }

    //Get and change value of attribute products
    let quickview = document.getElementById('quickview');
    quickview.querySelector('.new-price').innerText = product.querySelector('input[name="price"]').value + "vnđ";
    quickview.querySelector('.description-basic.ram').innerText = product.querySelector('input[name="ram"]').value;
    quickview.querySelector('.description-basic.rom').innerText = product.querySelector('input[name="rom"]').value;
    quickview.querySelector('.description-basic.screen').innerText = product.querySelector('input[name="screen"]').value;
    quickview.querySelector('.description-basic.battery').innerText = product.querySelector('input[name="battery"]').value;

    let desDetail = document.getElementById('des-details2');
    desDetail.querySelector('.description-detail.ram').innerText = product.querySelector('input[name="ram"]').value;
    desDetail.querySelector('.description-detail.rom').innerText = product.querySelector('input[name="rom"]').value;
    desDetail.querySelector('.description-detail.screen').innerText = product.querySelector('input[name="screen"]').value;
    desDetail.querySelector('.description-detail.resolution').innerText = product.querySelector('input[name="resolution"]').value;
    desDetail.querySelector('.description-detail.cpu').innerText = product.querySelector('input[name="cpu"]').value;
    desDetail.querySelector('.description-detail.battery').innerText = product.querySelector('input[name="battery"]').value;
    desDetail.querySelector('.description-detail.color').innerText = product.querySelector('input[name="color"]').value;

    //Mark product is choose
    document.getElementById('idProduct').value = product.querySelector('input[name="idProduct"]').value;
    document.getElementById('idCategory').value = product.querySelector('input[name="idCategory"]').value;
}

function main(){
    //Handle when choice ram, rom, color
    let productList = document.querySelectorAll('#product-list .category');
    
    //
    let memoryOption = document.getElementById('choice-memory');
    let colorOptionOrigin = document.getElementById('choice-color').outerHTML;
    memoryOption.addEventListener('change', ()=>{
        let colorOptionCurrent = document.getElementById('choice-color');
        let colorCurrent = colorOptionCurrent.value;
        if(memoryOption.value != ""){
            //Find color of product have memery as value of option
            let colorList = [];
            let memory = memoryOption.value.split('/');
            for(let i=0; i < productList.length; i++){
                let ram = productList[i].querySelector('input[name="ram"]').value;
                let rom = productList[i].querySelector('input[name="rom"]').value;
                let color = productList[i].querySelector('input[name="color"]').value;
                if(ram == memory[0] && rom == memory[1]){
                    colorList.push(color);
                }
            }

            //Change color option in client
            let option = `<option value="">Màu Sắc</option>`;
            for(let color of colorList){
                option += `<option style="text-transform: capitalize;" value="${color}">${color}</option>`;
            }
            colorOptionCurrent.innerHTML = option;
            colorOptionCurrent.value = colorCurrent;

            //
            if(colorOptionCurrent.value != ""){
                changeInfProduct(memory[0], memory[1], colorCurrent);
            }
        }
        else{
            colorOptionCurrent.innerHTML = colorOptionOrigin;
            colorOptionCurrent = colorCurrent;
        }
    })

    //
    let colorOption = document.getElementById('choice-color');
    let memoryOptionOrigin = document.getElementById('choice-memory').outerHTML;
    colorOption.addEventListener('change', ()=>{
        let memoryOptionCurrent = document.getElementById('choice-memory');
        let memoryCurrent = memoryOptionCurrent.value;
        if(colorOption.value != ""){
            //Find memory of product have memery as value of option
            let memoryList = [];
            for(let i=0; i < productList.length; i++){
                let ram = productList[i].querySelector('input[name="ram"]').value;
                let rom = productList[i].querySelector('input[name="rom"]').value;
                let color = productList[i].querySelector('input[name="color"]').value;
                if(color == colorOption.value){
                    memoryList.push({ram, rom});
                }
            }

            //Change memory option in client
            let option = `<option value="">Ram/Rom</option>`;
            for(let memory of memoryList){
                option += `<option value="${memory.ram}/${memory.rom}">${memory.ram}GB/${memory.rom}GB</option>`;
            }
            memoryOptionCurrent.innerHTML = option;
            memoryOptionCurrent.value = memoryCurrent;

            //
            if(memoryOptionCurrent.value != ""){
                let [ram, rom] = memoryCurrent.split("/");
                changeInfProduct(ram, rom, colorOption.value);
            }
        }
        else{
            memoryOptionCurrent.innerHTML = memoryOptionOrigin;
            memoryOptionCurrent.value = memoryCurrent;
        }
    })

    //Handler for comment: stars and comment content
    let ratingInput = document.querySelector('input[name="rating"]');
    let errorContent = document.getElementById('error-add-rating');

    let rating = document.querySelectorAll('.star-box .fa-star');

    rating.forEach((amountStar) => {
        amountStar.addEventListener('click', () => {
            //CSS for stars
            for(star of rating){
                if(star.getAttribute("value") <= amountStar.getAttribute("value")){
                    star.style.color="#ffde00";
                }
                else{
                    star.style.color="silver";
                }
            }
            
            //Set value for input
            ratingInput.value = amountStar.getAttribute("value");
        })
    })

    //Call ajax when user add to cart
    let addCartBtn = document.getElementById('add-cart-btn');
    addCartBtn.addEventListener('click', ()=>{
        //Check input data
        let memory = document.getElementById('choice-memory').value;
        let color = document.getElementById('choice-color').value;

        if(memory == "" || color == ""){
            document.getElementById('add-product-error').innerText = "Chưa chọn loại sản phẩm!";
            return
        }
        document.getElementById('add-product-error').innerText = "";

        //Call ajax to add
        let idProduct = document.getElementById('idProduct').value;
        let idCategory = document.getElementById('idCategory').value;
        let quantityProduct = document.getElementById('quantity-add-product').value;

        $.ajax({
            url: "/api/wishlist/add-to-cart",
            type: "POST",
            data: {idProduct, idCategory, quantityProduct},
            success: function(res){
                alert(res.message);
            },
            error: function (xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                document.getElementById('add-product-error').innerText = message;
            }
        })
    })

    //Call ajax when user add to wishlist
    let addWishListBtn = document.getElementById('add-wishlist-btn');
    addWishListBtn.addEventListener('click', ()=>{
        //Check input data
        let memory = document.getElementById('choice-memory').value;
        let color = document.getElementById('choice-color').value;

        if(memory == "" || color == ""){
            document.getElementById('add-product-error').innerText = "Chưa chọn loại sản phẩm!";
            return
        }
        document.getElementById('add-product-error').innerText = "";

        //Call ajax to add
        let idProduct = document.getElementById('idProduct').value;
        let idCategory = document.getElementById('idCategory').value;

        $.ajax({
            url: "/api/wishlist/add-to-wishlist",
            type: "POST",
            data: {idProduct, idCategory},
            success: function(res){
                alert(res.message);
            },
            error: function (xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                document.getElementById('add-product-error').innerText = message;
            }
        })
    })

    //Call ajax for add comment
    $("#add-rating-btn").on('click', () => {
        let contentInput = document.querySelector('textarea[name="content"]');
        if(contentInput.value == ""){
            errorContent.innerText = "Nội dung không được để trống!";
        }
        else{
            commentForm = $("#comment-form");
            $.ajax({
                url: "/api/products/detail/add-rating",
                type: "POST",
                data: commentForm.serialize(),
                success: function(res){
                    //Create stars for rating
                    let DanhGia = '';
                    for(let i = 0; i < 5; i++){
                        if(i < res.rating){
                            DanhGia += '<i class="fa fa-star"></i>' + '\n';
                        }
                        else{
                            DanhGia += '<i class="fa fa-star" style="color:silver;"></i>' + '\n';
                        }
                    }

                    //Generate data
                    let commentInf = {
                        HoTen: res.user.HoTen,
                        DanhGia: DanhGia,
                        NoiDung: res.content,
                        ThoiGian: res.dateTime
                    }

                    //Render data to client side
                    $("#new-rating").html(
                        `<div class="review-wrapper">
                            <div class="single-review">
                                <div class="review-img">
                                    <img src="/images/review-image/1.png" alt="" />
                                </div>
                                <div class="review-content">
                                    <div class="review-top-wrap">
                                        <div class="review-left">
                                            <div class="review-name">
                                                <h4>${commentInf.HoTen}</h4>
                                            </div>
                                        </div>
                                        <div class="review-left">
                                            <div class="rating-product">
                                                ${commentInf.DanhGia}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review-bottom">
                                        <p>
                                            ${commentInf.NoiDung}
                                        </p>
                                        <span style="font-size: 0.8em; opacity: 0.8">${commentInf.ThoiGian}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    );

                    //Remove rating feature
                    let form = document.getElementById('comment-form');
                    form.parentNode.removeChild(form);
                },
                error: function (xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    $("#new-rating").html(`
                        <span style="color: red;">${message}</span>
                    `)
                }
            })
        }
    })

    //Call ajax for "Xem thêm"
    $('#more-rating-btn').on('click', ()=>{
        let idProduct = $('input[name="idProduct"').val();
        let ratingPage = Number.parseInt($('input[name="rating-page"]').val());

        $.ajax({
            url: '/api/products/detail/more-rating',
            type: 'GET',
            data: {idProduct, ratingPage},

            success: function(res){
                //Set page current
                $('input[name="rating-page"]').val(ratingPage + 1);

                //Create stars for rating
                res.forEach((rating) => {
                    //Rating
                    let DanhGia = '';
                    for(let i = 0; i < 5; i++){
                        DanhGia += `<i class="fa fa-star" style="color:${rating.DanhGia[i]};"></i>` + '\n';
                    }

                    rating.DanhGia = DanhGia;

                    //DateTime
                    rating.ThoiGian = new Date(rating.ThoiGian).toString();
                })

                //Render date to client side
                let html = '';
                for (let i = 0; i < res.length; i++){
                    html += 
                            `<div class="review-wrapper">
                                <div class="single-review">
                                    <div class="review-img">
                                        <img src="/images/review-image/1.png" alt="" />
                                    </div>
                                    <div class="review-content">
                                        <div class="review-top-wrap">
                                            <div class="review-left">
                                                <div class="review-name">
                                                    <h4>${res[i].HoTen}</h4>
                                                </div>
                                            </div>
                                            <div class="review-left">
                                                <div class="rating-product">
                                                    ${res[i].DanhGia}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="review-bottom">
                                            <p>
                                                ${res[i].NoiDung}
                                            </p>
                                            <span style="font-size: 0.8em; opacity: 0.8">${res[i].ThoiGian}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            + '\n';
                }

                $('#more-rating').append(html);
            },

            error: function(xhr, status, error){
                console.log(error);
                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                $("#more-rating").append(`
                    <span style="color: red;">${message}</span>`)
            }
        })
    })
}

main();