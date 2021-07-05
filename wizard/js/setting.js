var dollarRate = 0.014;
var chekCrr;
var currency;
//исправить без элемента а написать
var usd = document.querySelector('.usd')
var kg = document.querySelector('.kg')
if(localStorage.getItem('chekCrr')!==null){
	chekCrr = localStorage.getItem('chekCrr');
	if(chekCrr == 1){
		document.querySelector('.currencyBtn').classList.add('currencyBtn_active');
	}else{
		document.querySelector('.currencyBtn').classList.remove('currencyBtn_active');
	}
}

document.querySelector('.currencyBtn').addEventListener("click", function(e){
	if(e.target.classList.contains('usd')){
		chekCrr  = 1;
		document.querySelector('.currencyBtn').classList.add('currencyBtn_active');
		localStorage.setItem('chekCrr', '1')
	}else if(e.target.classList.contains('kg')){
		chekCrr = 0;
		document.querySelector('.currencyBtn').classList.remove('currencyBtn_active');
		localStorage.setItem('chekCrr', '0')
	}
	showMiniCart();
});







var cart = {};//obj where goods are stored
var lolEl = 1;


//check if there is such an object in locale storage
chekCart();
function chekCart(){
	if(localStorage.getItem('cart') != null){
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}



//show and update mini basket
showMiniCart();
function showMiniCart(e){
	var out = '';
	if (Object.keys(cart).length == 0) {
		out += '<h4>Вы еще ничего не купили</h4>'
   	 document.querySelector('.cartData').innerHTML = out;
   	 document.querySelector('.cartBlock').classList.add('cartBlock_hide');
	}else{
		document.querySelector('.cartBlock').classList.remove('cartBlock_hide');
		for(var key in cart){
				out += '<span class="miniCartData"><a href="pages/product.html" data-name="'+key+'" class="productName">'+data[key].name+'</a>';
					currency = data[key].cost;
		  				if(chekCrr == 1){
		  					currency *= dollarRate;
		  					currency = currency.toFixed(2);
		  					currency += '$'; 
		  				}else{
		  					currency+=' сом';
		  				}
		  		out +='<p><span>цена:</span> '+ currency +'</p>';
		  		out += '<p><span>количество:</span> '+cart[key]+'</p>';
		  		var totalPrice = parseFloat(currency)*cart[key];
	 				if(chekCrr == 1){
			  			totalPrice = totalPrice.toFixed(2);
			  			totalPrice += '$';
			  		}else{
			  			totalPrice+=' сом'; 
			  		}
	 			out += '<p><span>итого:</span> '+totalPrice+'</p>';
		  		out += '<img src="../'+data[key].image+'">';
				out += '<button class="delBtn" data-art="'+key+'">-</button></span>';
			}
		document.querySelector('.cartData').innerHTML = out;
		countGoods();
		countPrice();
	}
}

//read how many goods purchased
function countGoods(	) {
	var arr = [];
	var sum;
	for(var key in cart){
		arr.push(cart[key]);

		arraySum(arr);
		function  arraySum(array){
			sum = 0;
			for(var i=0; i<array.length; i++){
				sum+=array[i];
			}
		}
	}
	if(sum==undefined){
		sum =0;
		document.querySelector('.cartData').innerHTML = 'Reclame';
	}
	document.querySelector('.goodsCount').innerHTML =  sum;
	document.querySelector('.countGoods').innerHTML = '<span>Товаров:</span> ' + sum;
}

//read how much the goods cost
function countPrice() {
	var arr = [];
	var arr1 = [];
	var total = 0;
	for(var key in cart){
		arr.push(data[key].cost);
		arr1.push(cart[key]);
	}
	
	for(var i=0; i<arr.length; i++){
		total += Number(arr[i])*arr1[i];
	}
			  	if(chekCrr == 1){
			  		total *= 0.014;
			  		total = total.toFixed(2);
			  		total += '$'; 
			  	}else{
			  		total+=' сом';
			  	}
	document.querySelector('.countPrice').innerHTML = '<span>Итого:</span> ' +total;
}

//delete the goods through the mini cart
document.querySelector('.cartData').addEventListener("click", function(e){
	if(e.target.classList.contains('delBtn')){
		var ID = e.target.getAttribute('data-art');
		delete cart[ID];  
		showMiniCart();
		localStorage.setItem('cart', JSON.stringify(cart) );
	}else if(e.target.classList.contains('productName')){
		var nameID = e.target.getAttribute('data-name');
		localStorage.setItem('product', nameID);
	}
});

document.querySelector('.rightNav').addEventListener("click", function(e){
	if(e.target.classList.contains('profile')){
		document.querySelector('.singIn').classList.add('sideBar_activeBlock');
		document.querySelector('.forgotPass').classList.remove('sideBar_activeBlock');
		document.querySelector('.searchBlock').classList.remove('sideBar_activeBlock');
		document.querySelector('.cartBlock').classList.remove('sideBar_activeBlock');
		document.querySelector('.sideBar').classList.add('sideBar_active');
		document.querySelector('body').classList.add('body_scroll');
	}else if(e.target.classList.contains('searchBtn')){
		document.querySelector('.searchBlock').classList.add('sideBar_activeBlock');
		document.querySelector('.cartBlock').classList.remove('sideBar_activeBlock');
		document.querySelector('.sideBar').classList.add('sideBar_active');
		document.querySelector('body').classList.add('body_scroll');
	}
	else if(e.target.classList.contains('cartBtn')){
		document.querySelector('.cartBlock').classList.add('sideBar_activeBlock');
		document.querySelector('.sideBar').classList.add('sideBar_active');
		document.querySelector('body').classList.add('body_scroll');
	}
})

document.querySelector('.wrap').onclick = function(){
	document.querySelector('body').classList.remove('body_scroll');
	document.querySelector('.sideBar').classList.remove('sideBar_active');
	document.querySelector('.menu').classList.remove('menu_active');
	document.querySelector('.ham').classList.remove('ham_active');
}
document.querySelector('.back').onclick = hideSideBar;
document.querySelector('.closeSideBarBtn').onclick = hideSideBar;
function hideSideBar(){
	document.querySelector('body').classList.remove('body_scroll');
	document.querySelector('.sideBar').classList.remove('sideBar_active');
}

document.querySelector('.forgotPassBtn').onclick = function() {
	document.querySelector('.forgotPass').classList.add('sideBar_activeBlock');
}

document.querySelector('.ham').onclick = function() {
	this.classList.toggle('ham_active');
	document.querySelector('.menu').classList.toggle('menu_active');
	document.querySelector('body').classList.toggle('body_scroll');
}


var lastScrollTop = 0;
window.onscroll = function(e){
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if(scrolled > lastScrollTop){
		document.querySelector('nav').style.top = -70 + 'px';
	}else{
		document.querySelector('nav').style.top = 0 + 'px';
	}
	lastScrollTop = scrolled;
}