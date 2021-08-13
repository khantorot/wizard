const products = document.querySelector('.products');

let product_group;
let product_producer;

const filter = document.querySelector('.filter');
const filter_items = document.querySelectorAll('.filter_item');

filter.addEventListener('click', function (e) {
    if (e.target.classList.contains('filter_item')) {
        let group = e.target.getAttribute('data-group');
        localStorage.setItem('product_group', group);
        filter_items.forEach(element => {
            element.classList.remove('filter_item_active')
        });
        e.target.classList.add('filter_item_active');
        loadProducts();
    }
});

loadProducts();
function loadProducts() {
    let out = '';


    if (localStorage.getItem('product_group') != null) {
        product_group = localStorage.getItem('product_group');
    } else {
        product_group = 'all';
    }

    if (localStorage.getItem('product_producer') != null) {
        product_producer = localStorage.getItem('product_producer');
    } else {
        product_producer = 'all';
    }


    filter_items.forEach(element => {
        if (element.getAttribute('data-group') == product_group) {
            element.classList.add('filter_item_active');
        } else {
            element.classList.remove('filter_item_active');
        }
    });
    

    for (let key in data) {
        if ((data[key].group.indexOf(product_group) != -1 || product_group == 'all') && (data[key].group.indexOf(product_producer) != -1 || product_producer == 'all')) {
            out += '<div class="product">';
            out += '<div class="img_box">';
            out += '<img src="./content/images/' + data[key].images[0] + '" alt="product">';
            out += '<img src="./content/images/' + data[key].images[1] + '" alt="product">';
            out += '</div>';
            out += '<div class="text_box">';
            out += '<h5>' + data[key].producer + '</h5>';
            out += '<a href="./product.html" data-id="' + key + '" class="product_name">' + data[key].name + '</a>'
            out += '<span class="price">' + prettyfy(data[key].price) + ' с</span>';
            out += '<div class="add_btn" data-id="' + key + '"><span></span></div>';
            out += '</div>';
            out += '</div>';
        }
    }
    products.innerHTML = out;
};






products.addEventListener('click', function (e) {
    if (e.target.classList.contains('add_btn')) {
        let id = e.target.getAttribute('data-id');
        if (cart[id] != undefined) {
            cart[id]++;
        } else {
            cart[id] = 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showMiniCart();
        showModalBar(id);
    } else if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
});




const filter_select = document.querySelector('.filter_select');
filter_select.value = localStorage.getItem('product_producer');

filter_select.addEventListener('change', function (e) {
    localStorage.setItem('product_producer', e.target.value);
    loadProducts();
})









let product_list;
let search = document.querySelector('.search')



search.addEventListener('focus', function () {
    product_group = localStorage.setItem('product_group', 'all');
    product_producer = localStorage.setItem('product_producer', 'all');
    filter_select.value = localStorage.getItem('product_producer');
    loadProducts();

    let product_list = document.querySelectorAll('.product');

    product_list.forEach(element => {
        element.classList.add('hide_product')
    });




    this.addEventListener('keyup', function () {
        let filter = this.value.toLowerCase();
        let i = 0;


        for (key in data) {
            let string = data[key].name.toLowerCase();
            if (string.includes(filter) || filter == '') {
                product_list[i].classList.remove('hide_product');
            } else {
                product_list[i].classList.add('hide_product');
            }
            i++;
        }
    });
});

search.addEventListener('focusout', function () {
    let product_list = document.querySelectorAll('.product');

    product_list.forEach(element => {
        element.classList.remove('hide_product')
    });
})