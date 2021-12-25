function main(){
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