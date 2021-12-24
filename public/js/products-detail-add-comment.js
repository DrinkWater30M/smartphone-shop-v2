function main(){
    //Handler for rating and conttent
    let ratingInput = document.querySelector('input[name="rating"]');
    let errorContent = document.getElementById('error-add-comment');

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

    //Call ajax
    $("#add-comment-btn").on('click', () => {
        let contentInput = document.querySelector('textarea[name="content"]');
        if(contentInput.value == ""){
            errorContent.innerText = "Nội dung không được để trống!";
        }
        else{
            commentForm = $("#comment-form");
            $.ajax({
                url: "/api/products/detail/add-comment",
                type: "POST",
                data: commentForm.serialize(),
                success: function(res){
                    //Generate data
                    let commentInf = {
                        HoTen: res.user.HoTen,
                        DanhGia: res.rating,
                        NoiDung: res.content,
                        ThoiGian: res.dateTime
                    }

                    //Render data to client side
                    $("#new-comment").html(
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
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
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

                    $("#new-comment").html(`
                        <span style="color: red;">Đã có lỗi xảy ra, vui lòng thử lại!</span>
                    `)
                }
            })
        }
    })
}

main();