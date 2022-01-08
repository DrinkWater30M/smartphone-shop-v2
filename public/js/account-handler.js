function htmlBills(bills){
    let html = '';
    for(let i = 0; i < bills.length; i++){
        html += 
            `<tr>
                <td style="width: 5%;">${i + 1}</td>
                <td style="width: 40%;"><span class="success">
                    ${bills[i].TenSanPham}/${bills[i].TenLoaiSanPham}<br>${bills[i].SoLuongSanPham}(cái)
                </span></td>
                <td style="width: 20%;">${bills[i].ThanhTien} </td>
                <td style="width: 15%;">${bills[i].ThoiGian}</td>
                <td style="width: 15%;">${bills[i].TrangThaiDonHang}</a></td>
            </tr>`;
    }

    if(html == ''){html = `<tr><td colspan="5">Chưa có đơn hàng nào! Hãy mua sắm!</td></tr>`};

    return html;
}

function main(){
    //Call ajax when click information bill
    let orderDetail = document.querySelector('a[href="#orders"]');
    orderDetail.addEventListener('click', ()=>{
        $.ajax({
            url:'/api/checkout/get-bill',
            type: 'GET',
            success: function(res){
                //Create html
                let html = htmlBills(res);

                //Append html to client
                $('#bills').find('tbody').html(html);
            },
            error:function(xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                alert(message);
            }
        })
    })

    //Call ajax when click information account
    let accoutDetail = document.querySelector('a[href="#account-details"]');
    accoutDetail.addEventListener('click', ()=>{
        $.ajax({
            url:'/api/user/account',
            type: 'GET',
            success: function(res){
                //Add data to client
                if(res.HoTen)$('#account-details').find('input[name="name"]').val(res.HoTen);
                if(res.Email)$('#account-details').find('input[name="email"]').val(res.Email);
                if(res.SoDienThoai)$('#account-details').find('input[name="phone"]').val(res.SoDienThoai);
                if(res.DiaChiGiaoHang)$('#account-details').find('input[name="address"]').val(res.DiaChiGiaoHang);
            },
            error:function(xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                alert(message);
            }
        })
    })

    //Call ajax when click save button information account
    let saveAccountDetailsBtn = document.getElementById('save-account-details-btn');
    saveAccountDetailsBtn.addEventListener('click', ()=>{
        //Get date from client
        let inputAccountTags = document.querySelectorAll('#account-details input');
        let data = {};
        inputAccountTags.forEach(input=>{
            data[input.name] = input.value;
        })
        console.log(data);

        $.ajax({
            url:'/api/user/account-save',
            type: 'POST',
            data: data,
            success: function(res){
                //Notification
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

    //Call ajax when click reset password
    let resetPasswordBtn = document.getElementById('reset-password-btn');
    resetPasswordBtn.addEventListener('click', ()=>{
        //Validate input
        let resetPasswordNotification = document.getElementById('reset-password-notification');
        let oldPassword = document.querySelector('#reset-password input[name="old-password"]');
        if(!oldPassword.value){
            resetPasswordNotification.innerText = 'Mật khẩu cũ không được để trống!';
            return
        }

        let newPassword = document.querySelector('#reset-password input[name="new-password"]');
        if(!newPassword.value || newPassword.value.length < 8){
            resetPasswordNotification.innerText = 'Mật khẩu mới phải từ 8 kí tự trở lên!';
            return
        }

        let confirmPassword = document.querySelector('#reset-password input[name="confirm-password"]');
        if(!confirmPassword.value || confirmPassword.value != newPassword.value){
            resetPasswordNotification.innerText = 'Xác nhận mật khẩu không chính xác!';
            return
        }

        //Call ajax
        $.ajax({
            url:'/api/user/reset-password/update',
            type: 'PATCH',
            data: {oldPassword: oldPassword.value, newPassword: newPassword.value},
            beforeSend: function(){
                resetPasswordNotification.style.color = 'blue';
                resetPasswordNotification.innerText = 'Đang xử lí!...';
            },
            success: function(res){
                //Notification
                resetPasswordNotification.innerText = '';
                alert(res.message);
                location.href = res.redirectUrl;
            },
            error:function(xhr, status, error){
                console.log(error);

                let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                resetPasswordNotification.style.color = 'red';
                resetPasswordNotification.innerText = message;
            }
        })
    })

    //Set tab defaut
    orderDetail.click();
}

main();