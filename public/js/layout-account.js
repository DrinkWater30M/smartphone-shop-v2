function main(){
    let formAccount = document.getElementById('account-information');
    let account = document.querySelector('a.account');

    if(account){
        account.addEventListener('click', () => {
            formAccount.submit();
        })
    }
}

main();