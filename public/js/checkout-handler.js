function main(){
    //Calculator total bill
    let priceEachProduct = document.querySelectorAll('.your-order-area .order-price');
    let totalOrder = 0;
    for(let i = 0; i < priceEachProduct.length; i++){
        totalOrder += Number.parseInt(priceEachProduct[i].textContent);
    }

    document.getElementById('total-bill').innerText = totalOrder + 'vnđ';

    let orderBtn = document.getElementById('order');
    orderBtn.addEventListener('click', ()=>{
        let errorTag = document.getElementById('order-error');

        //Validate input
        if(priceEachProduct.length == 0){
            errorTag.innerText = "Không có sản phẩm nào để thanh toán!";
            return;
        }

        let inputTags = document.querySelectorAll('input[class="info"]');
        let bonusInput = document.querySelector('textarea[name="message"]');
        let emptyData = false;
        for(let i = 0; i < inputTags.length; i++){
            if(!inputTags[i].value){
                emptyData = true;
                break;
            }
        }

        if(emptyData){
            //Notification
            errorTag.innerText = "Hãy điền đầy đủ thông tin cần thiết!";
        }
        else{
            //Get data
            let data = {};
            for(let i = 0; i < inputTags.length; i++){
                data[inputTags[i].name] = inputTags[i].value;
            }
            data[bonusInput.name] = bonusInput.value;

            //Call ajax to add bill
            $.ajax({
                url:'/api/checkout/add-bill',
                type: 'POST',
                data: data,
                success: function(res){
                    //Redirect
                    location.href = res.redirectUrl;
                },
                error:function(xhr, status, error){
                    console.log(error);
    
                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";
    
                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};
    
                    console.log(message);
                }
            })
        }
    })
}

main();