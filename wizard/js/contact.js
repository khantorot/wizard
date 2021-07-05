document.querySelector('.mainContent').addEventListener('click', function(e) {
	if(e.target.classList.contains('callBtn')){
		document.querySelector('.forms').classList.add('form_active');
	}
	if(e.target.classList.contains('messBtn')){
		document.querySelector('.forms').classList.add('form1_active');
	}
})

var closeForm = document.querySelectorAll('.closeForm');
for(var i=0; i<closeForm.length; i++){
	closeForm[i].onclick = function() {
		document.querySelector('.forms').classList.remove('form_active');
		document.querySelector('.forms').classList.remove('form1_active');
	}
}
