
const profile = document.querySelector('.profile');
const history = document.querySelector('.history');

loadProfile()

function loadProfile() {
    let out_history = '';
    let out_profile = '';


    out_profile += '<img src="./content/icons/profile.svg" alt="profile">';
    out_profile += '<p>' + user.firstname + ' ' + user.lastname + '</p>';
    out_profile += '<p>' + user.address + '</p>';
    out_profile += '<p>' + user.email + '</p>';
    out_profile += '<p>' + user.phone + '</p>';

    if (Object.keys(cart).length == 0) {
        out_history += '<div class="empty_data">';
        out_history += '<h4>Вы ничего не купили</h4>';
        out_history += '</div>';
    } else {
        for (key in cart) {
            out_history += '<div class="history_item">';
            out_history += '<img src="./content/images/'+ data[key].images[0] +'">'
            out_history += '<a href="./product.html" class="product_name" data-id="' + key + '">' + data[key].name + '</a>';
            out_history += '</div>';
        }
    }

    profile.innerHTML = out_profile;
    history.innerHTML = out_history;
}


history.addEventListener('click', function (e) {
    if (e.target.classList.contains('product_name')) {
        let id = e.target.getAttribute('data-id');
        localStorage.setItem('product', id);
    }
})
