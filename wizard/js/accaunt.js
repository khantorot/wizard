document.querySelector('#forgotP').onclick = function() {
	document.querySelector('.forgotPForm').classList.add('forgotPForm_active');
}

document.querySelector('.closeForm').onclick = function() {
	document.querySelector('.forgotPForm').classList.remove('forgotPForm_active');
}