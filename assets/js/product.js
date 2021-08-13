let product_id;

checkProduct()
function checkProduct() {
    if (localStorage.getItem('product') != null) {
        product_id = localStorage.getItem('product');
    } else {
        product_id = '1-1';
    }
}


const product_data = document.querySelector('.product_data');

showProduct();

function showProduct() {
    let out = '';

    out += '<div class="product_gallery">';

    data[product_id].images.forEach((element, index) => {
        out += '<div data-id="' + index + '" class="gallery_item"><img src="./content/images/' + element + '"></div>'
    });

    out += '</div>';
    out += '<h5 class="product_title">' + data[product_id].producer + '</h5>';
    out += '<div class="product_img">';
    out += '<img src="./content/images/' + data[product_id].images[0] + '">';
    out += '</div>';
    out += '<div class="product_info">';
    out += '<div class="product_info_bar">';
    out += '<h4 class="bar_title">' + data[product_id].name + '</h4>';
    out += '<div class="product_info_container">';
    out += '<ul>';
    out += '<li><p>' + data[product_id].title + '</p></li>';
    out += '<li><p>производитель : <span>' + data[product_id].producer + '</span></p></li>';
    out += '<li><p>цена : <span>' + prettyfy(+data[product_id].price) + ' c</span></p></li>';

    data[product_id].description.forEach(element => {
        out += '<li>' + element + '</li>';
    });

    out += '</ul>';
    out += '</div>';
    out += '<div class="bar_links">';
    out += '<div class="product_add_btn" data-id="' + product_id + '">Добавить в корзину</div>';
    out += '</div></div></div>';
    out += '<div class="product_panel">';
    out += '<h2>' + data[product_id].name + '</h2>';
    out += '<div class="panel">';
    out += '<div class="minus_btn" data-id="' + product_id + '"><span></span></div>';
    if (cart[product_id] == undefined || cart[product_id] == null) { cart[product_id] = 0 };
    out += '<div class="product_count">' + cart[product_id] + '</div>';
    out += '<div class="plus_btn" data-id="' + product_id + '"><span></span></div>';
    out += '</div>';
    out += '<div class="product_price">';
    out += '<div>цена: <span>' + prettyfy(+data[product_id].price) + ' с</span></div>';
    if (cart[product_id] != 0) {
        out += '<div>итого: <span>' + prettyfy(+data[product_id].price * cart[product_id]) + ' с</span></div>';
    }
    out += '</div></div>';

    product_data.innerHTML = out;
}


const gallery = document.querySelector('.product_gallery');
const product_image = document.querySelector('.product_img');

gallery.addEventListener('click', function (e) {
    if (e.target.classList.contains('gallery_item')) {
        let id = e.target.getAttribute('data-id');
        product_image.innerHTML = '<div data-id="' + id + '" class="gallery_item"><img src="./content/images/' + data[product_id].images[id] + '"></div>'
    }
});




product_data.addEventListener('click', function (e) {

    if (e.target.classList.contains('plus_btn') || e.target.classList.contains('product_add_btn') || e.target.classList.contains('minus_btn')) {
        if (e.target.classList.contains('plus_btn') || e.target.classList.contains('product_add_btn')){
            cart[product_id]++;
        } else if (e.target.classList.contains('minus_btn')) {
            if (cart[product_id] > 1) {
                cart[product_id]--;
            } else {
                delete cart[product_id];
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showMiniCart();
        refreshProductShow();
    }
});





showTegs()


function showTegs() {
    let out = '';
    let inner = '';

    out += '<h4>Похожие товары :</h4>';

    data[product_id].group.forEach(element => {
        if (element == 'popular') {
            inner = 'популярное';
        } else if (element == 'new') {
            inner = 'новинки';
        } else if (element == 'discount') {
            inner = 'акции';
        } else if (element == 'notebook') {
            inner = 'ноутбуки';
        } else if (element == 'phone') {
            inner = 'телефоны';
        } else if (element == 'headphone') {
            inner = 'наушники';
        } else {
            inner = element;
        }
        out += '<span class="teg" data-id="' + element + '">' + inner + '</span>';
    });
    document.querySelector('.tegs').innerHTML = out;
}


const teg_item = document.querySelectorAll('.teg');

document.querySelector('.tegs').addEventListener('click', function (e) {
    if (e.target.classList.contains('teg')) {
        let id = e.target.getAttribute('data-id');
        teg_item.forEach(element => {
            if (element.getAttribute('data-id') == id) {
                element.classList.add('teg_active');
            } else {
                element.classList.remove('teg_active');
            }
        });
        loadGoods(id);
    }
})








const products = document.querySelector('.products');

loadGoods(data[product_id].group[0]);

function loadGoods(group) {
    let out = '';

    for (let key in data) {
        if (data[key].group.indexOf(group) != -1) {
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
}



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


cart_data.addEventListener('click', refreshProductShow);
modal_side.addEventListener('click', refreshProductShow);
products.addEventListener('click', refreshProductShow);



function refreshProductShow() {
    if (cart[product_id] == undefined || cart[product_id] == null) { cart[product_id] = 0 };
    document.querySelector('.product_panel .product_count').innerHTML = cart[product_id];
    document.querySelector('.product_panel .product_price').innerHTML = '<div>цена: <span>' + prettyfy(+data[product_id].price) + ' с</span></div>';
    if (cart[product_id] != 0) {
        document.querySelector('.product_panel .product_price').innerHTML += '<div>итого: <span>' + prettyfy(+data[product_id].price * cart[product_id]) + ' с</span></div>';
    }
}