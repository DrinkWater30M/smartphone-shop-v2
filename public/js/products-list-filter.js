function main(){
    let formTag = document.getElementById('products-filter');
    let brands = document.querySelectorAll('a.filter-brand');
    let colors = document.querySelectorAll('a.filter-color');
    let rams = document.querySelectorAll('a.filter-ram');
    let roms = document.querySelectorAll('a.filter-rom');
    let sorts = document.querySelectorAll('a.filter-sort');
    let inputBrand = document.querySelector('#products-filter input[name="brand"]');
    let inputColor = document.querySelector('#products-filter input[name="color"]');
    let inputRam = document.querySelector('#products-filter input[name="ram"]');
    let inputRom = document.querySelector('#products-filter input[name="rom"]');
    let inputPage = document.querySelector('#products-filter input[name="page"]');
    let inputMinPrice = document.querySelector('#products-filter input[name="min_price"]');
    let inputMaxPrice = document.querySelector('#products-filter input[name="max_price"]');
    let inputSort = document.querySelector('#products-filter input[name="sort"]');
    
    let btnFilterPrices = document.getElementById('filter-prices');
    let currentTypeSort = document.getElementById('current-type-sort');
    //CSS for current brand
    brands.forEach((brand) => {
        if(brand.getAttribute('value') == inputBrand.value){
            brand.classList.add('active');
        }
    })

    //Event for brand when click
    brands.forEach((brand) => {
        brand.addEventListener('click', () =>{
            inputBrand.value = brand.getAttribute('value');
            inputPage.value = 1;
            formTag.submit();
        })
    })

    //CSS for current color
    colors.forEach((color) => {
        if(color.getAttribute('value') == inputColor.value){
            color.classList.add('active');
        }
    })

    //Event for colors when click
    colors.forEach((color) => {
        color.addEventListener('click', () => {
            if(color.getAttribute('value') == inputColor.value){
                inputColor.value = "";
                inputPage.value = 1;
                formTag.submit();
            }
            else{
                inputColor.value = color.getAttribute('value');
                formTag.submit();
                inputPage.value = 1;
            }

        })
    })

    //CSS for current ram
    rams.forEach((ram) => {
            if(ram.getAttribute('value') == inputRam.value){
                ram.classList.add('active');
            }
    })

    //Event for rams when click
    rams.forEach((ram) => {
        ram.addEventListener('click', () => {
            inputRam.value = ram.getAttribute('value');
            inputPage.value = 1;
            formTag.submit();
        })
    })

    //CSS for current rom
    roms.forEach((rom) => {
        if(rom.getAttribute('value') == inputRom.value){
            rom.classList.add('active');
        }
    })

    //Event for roms when click
    roms.forEach((rom) => {
        rom.addEventListener('click', () => {
            inputRom.value = rom.getAttribute('value');
            inputPage.value = 1;
            formTag.submit();
        })
    })

    //Event fot btn "Tìm kiếm"
    btnFilterPrices.addEventListener('click', () => {
        let pricesElement = document.querySelector('.ui-slider-range.ui-corner-all.ui-widget-header');
        let minPrice =  Number.parseInt(pricesElement.style.left)*1000000;
        let maxPrice =  Number.parseInt(pricesElement.style.width)*1000000 + minPrice;

        inputMinPrice.value = minPrice;
        inputMaxPrice.value = maxPrice;
        formTag.submit();
    })

    //CSS for current type sort
    sorts.forEach((item) => {
        if(item.getAttribute('value') == inputSort.value){
            currentTypeSort.innerText = item.innerText;
        }
    })

    //Event for types sort
    sorts.forEach((item) => {
        item.addEventListener('click', () => {
            inputSort.value = item.getAttribute('value');
            formTag.submit();
        })
    })

}

main();