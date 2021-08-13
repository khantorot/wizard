const cart_container = document.querySelector('.cart_container');

loadCart()

function loadCart() {
    let out = '';
    let type = '';

    if (Object.keys(cart).length == 0) {
        out += '<div class="empty_data">';
        out += '<h4>Корзина пуста</h4>';
        out += '</div>';
    } else {
        for (key in cart) {
            out += '<div class="cart_item">';
            out += '<div class="cart_item_box cart_item_box_img">';
            out += '<img src="./content/images/' + data[key].images[0] + '" alt="' + data[key].name + '">';
            out += '</div>';
            out += '<div class="cart_item_box cart_item_box_title">';
            out += '<a href="./product.html" data-id="' + key + '">' + data[key].name + '</a>';

            if (data[key].group[0] == 'notebook') {
                type = 'ноутбук';
            } else if (data[key].group[0] == 'phone') {
                type = 'телефон';
            } else if (data[key].group[0] == 'headphone') {
                type = 'наушники';
            }
            out += '<p>' + type + ' <span>' + data[key].producer + '</span></p>';
            out += '</div>';
            out += '<div class="cart_item_box cart_item_box_panel">';
            out += '<div class="del_btn" data-id="' + key + '">';
            out += '<img src="./content/icons/delete.svg" alt="delete" />';
            out += '</div>';
            out += '<div class="cart_item_total_price">' + prettyfy(data[key].price * cart[key]) + ' c</div>';
            out += '<div class="panel">';
            out += '<div class="minus_btn" data-id="' + key + '"><span></span></div>';
            out += '<div class="product_count">' + cart[key] + '</div>';
            out += '<div class="plus_btn" data-id="' + key + '"><span></span></div>';
            out += '</div></div></div>';

        }
    }
    cart_container.innerHTML = out;
    document.querySelector('.total_price').innerHTML = prettyfy(countPrice()) + ' c';
}


cart_container.addEventListener("click", function (e) {
    let id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('del_btn')) {
        delete cart[id];
    } else if (e.target.classList.contains('plus_btn')) {
        cart[id]++;
    } else if (e.target.classList.contains('minus_btn')) {
        if (cart[id] > 1) {
            cart[id]--;
        } else {
            delete cart[id];
            modal_side.classList.remove('modal_side_show');
        }
    } else if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();
    loadCart();
});










