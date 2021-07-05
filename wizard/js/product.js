var product = {};
var cart = {};
chekCart();
function chekCart(){
	if(localStorage.getItem('cart') != null){
		cart = JSON.parse(localStorage.getItem('cart'));
	}
}

product =localStorage.getItem('product');
var chekEl;
var dollarRate;
var currency;
chekProduct();


function chekProduct(){
	for(var key in data){
		var out = '';
		var currency = data[product].cost;
		out += '<div class="productBlock"><img src="../'+data[product].image+'">';
		out += '<h2>' + data[product].producer+'</h2></div>';
		out += '<div class="productInfo"><h5>'+ data[product].name +'</h5>';
		out += '<p>'+ data[product].description +'</p>';
		chekEl = localStorage.getItem('chekEl');
		dollarRate = 0.014;
			  	if(chekEl == 1){
			  		currency *= dollarRate;
			  		currency = currency.toFixed(2);
			  		currency += '$';
			  	}else{
			  		currency+=' сом';
			  	}
		out += '<h4>'+ currency +'</h4>';
		out+='<button class="addBtn" data-art="'+key+'">Добавить в корзину</button></div>';
	}
	document.querySelector('.productBlock').innerHTML = out;
};


document.querySelector('.data').addEventListener("click", addToCart);
var statement = document.querySelector('.statement');

function addToCart(e){
	//add products to the object
	if(e.target.classList.contains('addBtn')){
		if(cart[product]!=undefined){
			cart[product]++;
		}else{
			cart[product]=1;
		}
		//add products to local storage
		localStorage.setItem('cart', JSON.stringify(cart) );
		showStatement();
	}
};

//show statement Block
function showStatement(){
	var out = '';
		out += '<div class="statementData"><h4>Товар добавлен в корзину</h4>';
		out += '<img src="../'+data[product].image+'">';
		out += '<div class="closeBtn"></div>';
		out += '<div class="delBtn" data-art="'+product+'"></div>';
		out += '<h5 class="goOn">Продолжить выбор товаров</h5>';
		out += '<a href="pages/issue.html" class="issueLink">Оформить товар</a>'
		out += '<a href="pages/product.html" class="productName" data-name="'+product+'">'+ data[product].name+'</a>';
			currency = data[product].cost;
			  	if(chekEl == 1){
			  		currency *= dollarRate;
			  		currency = currency.toFixed(2);
			  		currency += '$'; 
			  	}else{
			  		currency+=' сом';
			  	}
	 	out += '<p class="price">'+ currency +'</p>';
	 	var totalPrice = parseFloat(currency)*cart[product];
	 	if(chekEl == 1){
			  		totalPrice = totalPrice.toFixed(2);
			  		totalPrice += '$'; 
			  	}else{
			  		totalPrice+=' сом';
			  	}
	 	out += '<p class="totalPrice">Итого '+totalPrice+'</p>';
		out += '<button class="minus" data-art="'+product+'">-</button>';
		out += '<input type="text" value="'+cart[product]+'" class="number">';
		out += '<button class="plus" data-art="'+product+'">+</button>';
	statement.innerHTML = out;
	statement.classList.add('statement_show');
}


//bring the purchased goods to the sidebar
statement.addEventListener('click', function(e){
	var keyID = e.target.getAttribute('data-art');
		
	if(e.target.classList.contains('delBtn')){
		delete cart[keyID];
		statement.classList.remove('statement_show');
	}else if(e.target.classList.contains('closeBtn') || e.target.classList.contains('goOn')){
		statement.classList.remove('statement_show');
	}else if(e.target.classList.contains('plus')){
		cart[keyID]++;
		showStatement(keyID);
	}else if(e.target.classList.contains('minus')){
		if(cart[keyID] > 1){
			cart[keyID]--;
			showStatement(keyID);
		}else{
			delete cart[keyID]; 
			statement.classList.remove('statement_show');
		} 
	}else if(e.target.classList.contains('productName')){
		var nameID = e.target.getAttribute('data-name');
		localStorage.setItem('product', nameID);
	}
	localStorage.setItem('cart', JSON.stringify(cart) );
});



loadGoods();

function loadGoods() {
	var lolEl = data[product].group;
	var out='';
   for(var key in data){
   	if(data[key].group == lolEl){
   		out += '<div><img src="../'+ data[key].image+'" class="productImg">';
		  	out += '<h5>' + data[key].producer +'</h5>';
		  	out += '<a href="product.html" data-name="'+key+'" class="productName">'+ data[key].name+'</a>';
		  	currency = data[key].cost;
			  	if(chekEl == 1){
			  		currency *= dollarRate;
			  		currency = currency.toFixed(2);
			  		currency += '$';
			  	}else{
			  		currency+=' сом'; 
			  	}
		  	out += '<p>'+ currency +'</p>';
		  	out += '<button class="addBtn" data-art="'+key+'"><img src="../images/buy.png" alt="buy" /></button></div>';
   	}
   	document.querySelector('.data').innerHTML=out;
  	}
};