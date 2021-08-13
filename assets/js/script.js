const body = document.querySelector('body');
const container = document.querySelector('.container');
const menu_btn = document.querySelector('.menu_btn');
const cart_btn = document.querySelector('.cart_btn');
const profile_btn = document.querySelector('.profile_btn');
const close_side_btn = document.querySelector('.side_bar .close_btn');
const forgot_pass_btn = document.querySelector('.forgot_pass_btn');
const forgot_pass_back_btn = document.querySelector('.forgot_pass_back_btn');
const side_bar = document.querySelector('.side_bar');
const side_bars = document.querySelectorAll('.side_bar .bar');
const modal_side = document.querySelector('.modal_side');
const menu = document.querySelector('.menu');


container.addEventListener('click', hideSideBar);
close_side_btn.addEventListener('click', hideSideBar);
menu.addEventListener('click', menuActive);


menu_btn.addEventListener('click', function () {
    showSideBar('menu_bar');
});

cart_btn.addEventListener('click', function () {
    showSideBar('cart_bar');
});
profile_btn.addEventListener('click', function () {
    showSideBar('login_bar');
});
forgot_pass_btn.addEventListener('click', function () {
    showSideBar('forgot_pass_bar');
});
forgot_pass_back_btn.addEventListener('click', function () {
    showSideBar('login_bar');
});



function hideSideBar(e) {
    if (!e.target.classList.contains('add_btn')) {
        side_bar.classList.remove('side_bar_show');
        body.classList.remove('body_overflow');
        container.classList.remove('container_hide');
        modal_side.classList.remove('modal_side_show');
    }
}





function showSideBar(data) {
    side_bars.forEach(element => {
        if (element.classList.contains(data)) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
    side_bar.classList.add('side_bar_show');
    body.classList.add('body_overflow');
    container.classList.add('container_hide');
}



function menuActive(e) {
    if (e.target.classList.contains('menu_item')) {
        let group = e.target.getAttribute('data-group');
        let producer = e.target.getAttribute('data-producer');

        if (group != null && producer != null) {
            localStorage.setItem('product_group', group);
            localStorage.setItem('product_producer', producer);
        }
    }
}





const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', function (e) {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > 0) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
    lastScrollTop = scrolled;
})





let cart = {};

chekCart();
function chekCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}


function showModalBar(id) {
    let out = '';
    const cart_modal = document.querySelector('.cart_modal');

    if (id == undefined) {
        out += '<div class="empty_data">';
        out += '<h4>Вы удалили товар(</h4>';
        out += '</div>';
    } else {
        for (key in data) {
            if (key == id) {
                out += '<img src="./content/images/' + data[key].images[0] + '" alt="' + data[key].name + '">';
                out += '<a href="./product.html" data-id="' + key + '">' + data[key].name + '</a>';
                out += '<div class="title"><p>' + data[key].title + '</p></div>';
                out += '<div class="panel">';
                out += '<div class="del_btn" data-id="' + key + '"><span></span></div>';
                out += '<div class="minus_btn" data-id="' + key + '"><span></span></div>';
                out += '<div class="product_count">' + cart[key] + '</div>';
                out += '<div class="plus_btn" data-id="' + key + '"><span></span></div>';
                out += '</div>';
                out += '<div class="cart_modal_price">';
                out += '<div>цена: <span>' + prettyfy(data[key].price) + ' с</span></div>';
                out += '<div>итого: <span>' + prettyfy(+data[key].price * cart[key]) + ' с</span></div>';
                out += '</div>';
                break;
            }
        }
    }
    cart_modal.innerHTML = out;
    modal_side.classList.add('modal_side_show');
}


modal_side.addEventListener('click', function (e) {
    let id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('del_btn')) {
        delete cart[id];
        modal_side.classList.remove('modal_side_show');
        showModalBar();
    } else if (e.target.classList.contains('close_btn')) {
        modal_side.classList.remove('modal_side_show');
    } else if (e.target.classList.contains('plus_btn')) {
        cart[id]++;
        showModalBar(id);
    } else if (e.target.classList.contains('minus_btn')) {
        if (cart[id] > 1) {
            cart[id]--;
            showModalBar(id);
        } else {
            delete cart[id];
            modal_side.classList.remove('modal_side_show');
            showModalBar();
        }
    } else if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();
});












const cart_data = document.querySelector('.cart_data');
showMiniCart();
function showMiniCart() {
    let out = '';
    if (Object.keys(cart).length == 0) {
        out += '<div class="empty_data">';
        out += '<h4>Вы еще ничего не купили(</h4>';
        out += '</div>';
    } else {
        for (let key in cart) {
            out += '<div class="cart_data_item">';
            out += '<div class="cart_data_item_info">';
            out += '<p>цена: <span>' + prettyfy(data[key].price) + ' с</span></p>';
            out += '<p>количество: <span>' + cart[key] + '</span></p>';
            out += '<p>итого: <span>' + prettyfy(+data[key].price * cart[key]) + ' с</span></p>';
            out += '</div>';
            out += '<div class="panel">';
            out += '<div class="minus_btn" data-id="' + key + '"><span></span></div>';
            out += '<div class="plus_btn" data-id="' + key + '"><span></span></div>';
            out += '<div class="del_btn" data-id="' + key + '"><span></span></div>';
            out += '</div>';
            out += '<img src="./content/images/' + data[key].images[0] + '" alt="' + data[key].name + '">';
            out += '<a href="./product.html" data-id="' + key + '">' + data[key].name + '</a>';
            out += '</div>';
        }
    }
    document.querySelector('.cart_btn_count').innerHTML = countGoods();
    document.querySelector('.cart_count').innerHTML = 'Товаров : <span>' + countGoods() + '</span>';
    document.querySelector('.cart_price').innerHTML = 'Итого : <span>' + prettyfy(countPrice()) + ' c</span>';
    cart_data.innerHTML = out;
}



cart_data.addEventListener("click", function (e) {
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
});





function countGoods() {
    var arr = [];
    var sum;
    for (var key in cart) {
        arr.push(cart[key]);

        arraySum(arr);
        function arraySum(array) {
            sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
        }
    }
    if (sum == undefined) {
        sum = 0;
    }
    return sum;
}



function countPrice() {
    let arr = [];
    let arr1 = [];
    let total = 0;
    for (let key in cart) {
        arr.push(+data[key].price);
        arr1.push(cart[key]);
    }

    for (var i = 0; i < arr.length; i++) {
        total += Number(arr[i]) * arr1[i];
    }
    return total
}

function prettyfy(num) {
    let n = num.toString();
    let seperator = ' ';
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + seperator);
}






let user = {};

chekUser();
function chekUser() {
    if (localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
    }
}




