function main(){
    let formTag = document.getElementById('products-filter');
    let inputTagPage = document.querySelector('#products-filter input[name="page"]');
    let currentPage = Number.parseInt(inputTagPage.value);
    let paginationLeft = document.getElementById('pagination-left');
    let paginationRight = document.getElementById('pagination-right');
    let paginationItems = document.querySelectorAll('a.pagination-item');

    //Mark sequence number and CSS
    if(currentPage<=1){
        paginationItems.forEach((item, index) => {
            item.innerText = currentPage + index;
        });
        
        paginationItems[0].classList.add('active');
    }
    else{
        paginationItems.forEach((item, index) => {
            item.innerText = currentPage + index - 1;
        });
        
        paginationItems[1].classList.add('active');
    }

    //Event and direcotry for pagination
    paginationLeft.addEventListener('click', ()=>{
        if(currentPage > 1){
            inputTagPage.value = currentPage - 1;
            formTag.submit();
        }
    })

    paginationRight.addEventListener('click', ()=>{
        inputTagPage.value = currentPage + 1;
        formTag.submit();
    })

    paginationItems.forEach((item) => {
        item.addEventListener('click', () => {
            inputTagPage.value = Number.parseInt(item.innerText);
            formTag.submit();
        })
    })
}

main();