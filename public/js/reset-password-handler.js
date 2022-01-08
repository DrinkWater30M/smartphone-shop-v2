function main(){
    //Call ajax when click get otp btn
    let otpBtn = document.getElementById('get-otp-btn');
    otpBtn.addEventListener('click', ()=>{
        let otpNotification = $('#otp-notification');
        //Check email
        let email = document.querySelector('#reset-password input[name="email"]');
        if(!email.value){
            otpNotification.css('color', 'red');
            otpNotification.html('Email không được để trống!');
        }
        else{
            let data = {email: email.value};
            $.ajax({
                url:'/api/user/reset-password/otp',
                type: 'POST',
                data: data,
                beforeSend: function(){
                    otpNotification.css('color','blue');
                    otpNotification.html('Đang thực hiện gửi OTP... Vui lòng chờ!');
                },
                success: function(res){
                    //Notification
                    otpNotification.css('color', 'blue');
                    otpNotification.html(res.message);
                },
                error:function(xhr, status, error){
                    console.log(error);

                    let message = "Đã có lỗi gì đó! Vui lòng thử lại!";

                    if(xhr.responseText) { message = JSON.parse(xhr.responseText).error};

                    otpNotification.css('color', 'red');
                    otpNotification.html(message);
                }
            })
        }
    })

    //Call ajax when click reset password
    let resetPasswordBtn = document.getElementById('reset-password-btn');
    resetPasswordBtn.addEventListener('click', ()=>{
        //Validate input
        let resetPasswordNotification = document.getElementById('reset-password-notification');
        let email = document.querySelector('#reset-password input[name="email"]');
        if(!email.value){
            resetPasswordNotification.innerText = 'Email không được để trống!';
            return
        }

        let otp = document.querySelector('#reset-password input[name="otp"]');
        if(!otp.value){
            resetPasswordNotification.innerText = 'OTP không được để trống!';
            return
        }

        let password = document.querySelector('#reset-password input[name="password"]');
        if(!password.value || password.value.length < 8){
            resetPasswordNotification.innerText = 'Mật khẩu phải từ 8 kí tự trở lên!';
            return
        }

        let confirmPassword = document.querySelector('#reset-password input[name="confirm-password"]');
        if(!confirmPassword.value || confirmPassword.value != password.value){
            resetPasswordNotification.innerText = 'Xác nhận mật khẩu không chính xác!';
            return
        }

        //Call ajax
        $.ajax({
            url:'/api/user/reset-password/reset',
            type: 'PATCH',
            data: {email: email.value, otp: otp.value, password: password.value},
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
}

main()