const registration_button = document.querySelector('.registration_button');
const registration_inputs = document.querySelectorAll('.registration_input');

registration_button.addEventListener('click', function (e) {
    let i = 0;
    registration_inputs.forEach(element => {
        if (element.value != '') {
            i++;
        }
    });
    if (i == registration_inputs.length) {
        e.preventDefault();
        console.log(window.location.href);
        window.location.href = 'profile.html';


        user.firstname  = registration_inputs[0].value;
        user.lastname  = registration_inputs[1].value;
        user.address  = registration_inputs[2].value;
        user.email  = registration_inputs[3].value;
        user.phone  = registration_inputs[4].value;

        localStorage.setItem('user', JSON.stringify(user));
    }
})