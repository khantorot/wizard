const products = document.querySelector('.products');
loadGoods()

function loadGoods() {
    let out = '';

    for (let key in data) {
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
        modalBar(id);
    } else if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
});
