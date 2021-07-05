loadGoods()
function loadGoods() {
	var out='';
   for(var key in data){
   		out+='<div><img src="../'+ data[key].image+'" class="productImg">';
		  	out+='<h5>' + data[key].producer+'</h5>';
		  	out+='<a href="pages/product.html" data-name="'+key+'" class="productName">'+ data[key].name+'</a>';
		  	currency = data[key].cost;
			  	if(chekCrr == 1){
			  		currency *= dollarRate;
			  		currency = currency.toFixed(2);
			  		currency += '$';
			  	}else{
			  		currency+=' сом'; 
			  	}
		  	out+='<p>'+ currency +'</p>';
		  	out+='<button class="addBtn" data-art="'+key+'"><img src="../images/buy.png" alt="buy" /></button></div>';
   	document.querySelector('.data').innerHTML=out;
  	}
};
