const checkout_data = document.querySelector('.checkout_data');

loadCheckout()

function loadCheckout() {
    let out = '';

    if (Object.keys(cart).length == 0) {
        out += '<div class="empty_data">';
        out += '<h4>Вы ничего не купили</h4>';
        out += '</div>';
    } else {
        for (key in cart) {
           out += '<div class="checkout_data_item">';
           out += '<a href="./product.html" class="product_name" data-id="' + key + '">'+  data[key].name +'</a>';
           out += '<span>x' + cart[key] + '</span>';
           out += '<p>' + prettyfy(data[key].price * cart[key]) + '</p>';
           out += '</div>';
        }
        out += '<div class="checkout_data_total_price"><span>Итого:</span><p>'+ prettyfy(countPrice()) + ' c' +'</p></div>';
    }
    checkout_data.innerHTML = out;
}


checkout_data.addEventListener('click', function(e){
    if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
})