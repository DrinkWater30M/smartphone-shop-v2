function main(){
    let registerEmail = document.getElementById('register-email');
    let registerPassword = document.getElementById('register-password');
    let registerConfirmPassword = document.getElementById('register-confirm-password');

    let registerEmailEror = document.getElementById('register-email-error');
    let registerPasswordError = document.getElementById('register-password-error');
    let registerConfirmPasswordError = document.getElementById('register-confirm-password-error');

    let registerSubmit = document.getElementById('register-submit');
    let registerForm = document.getElementById('register');

    registerSubmit.addEventListener('click', () => {
        if(registerEmail.value.length == 0){
            registerEmailEror.innerText = "Email không được để trống!";

            setInterval(()=>{
                if(registerEmail.value.length == 0){
                    registerEmailEror.innerText = "Email không được để trống!";
                }
                else{
                    registerEmailEror.innerText = "";
                }
            }, 1000);

            return;
        }

        if(registerPassword.value.length < 8){
            registerPasswordError.innerText = "Mật khẩu phải đủ 8 ki tự trở lên!";

            setInterval(()=>{
                if(registerPassword.value.length < 8){
                    registerPasswordError.innerText = "Mật khẩu phải đủ 8 ki tự trở lên!";
                }
                else{
                    registerPasswordError.innerText = "";
                }
            }, 1000);

            return;
        }

        if(registerConfirmPassword.value !== registerPassword.value){
            registerConfirmPasswordError.innerText = "Mật khẩu không khớp!";

            setInterval(() => {
                if(registerConfirmPassword.value !== registerPassword.value){
                    registerConfirmPasswordError.innerText = "Mật khẩu không khớp!"
                }

                else{
                    registerConfirmPasswordError.innerText = "";
                }
            }, 1000)

            return;
        }

        registerForm.submit();
    })
}

main();