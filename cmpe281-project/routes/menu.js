var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";
var cartItems=[];
var menu1=[], menu2=[], menu3=[], menu4=[], menuFinal=[], total=0.00,cid=0;


function menus(req,res){
	cid=req.param("cartid");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('product_catalog');
		menu1=[], menu2=[], menu3=[], menu4=[], menuFinal=[], cartItems=[], total=0.00
		coll.find().toArray(function(err, menu){
			if (menu) {
				//console.log("USER: "+user.name+" College:"+user.college);

				menuFinal=menu;

				menu.forEach(function(item) {
					if(item.category_id==1){
						menu1.push(item);
					}
					if(item.category_id==2){
						menu2.push(item);
					}
					if(item.category_id==3){
						menu3.push(item);
					}
					if(item.category_id==4){
						menu4.push(item);
					}

				});
				console.log("CID: "+cid);
				res.render('menu.ejs', {menu1:menu1,menu2:menu2,menu3:menu3,menu4:menu4, cartItems:cartItems,total:total });
			} else {
				res.render('error.ejs');
			}
		});
	});  
}

function addToCart(req,res){

	var product_id = req.query.product_id;
	
	menuFinal.forEach(function(item) {
		if(item.product_id==product_id){	
			console.log(item.product_id+"item.product_id");
			if(item.quantity===undefined||item.quantity==0){				
				item.quantity=1;
				cartItems.push(item);
			}else{
				item.quantity=item.quantity+1;
			}
			
			total=total+item.price;
		}

	});
	console.log("CID: "+cid);
	res.render('menu.ejs', {menu1:menu1,menu2:menu2,menu3:menu3,menu4:menu4, cartItems:cartItems, total:total });

}

function deleteFromCart(req,res){

	var product_id = req.query.product_id;
	
	for(var i=0;i<cartItems.length;i++){
		 if (cartItems[i].product_id == product_id) {
			 total=total-cartItems[i].price*cartItems[i].quantity;
			 cartItems[i].quantity=0;
	          cartItems.splice(i, 1);
	            
	        }
	}
	console.log("CID: "+cid);
	res.render('menu.ejs', {menu1:menu1,menu2:menu2,menu3:menu3,menu4:menu4, cartItems:cartItems, total:total });

}


function confirmOrder(req,res){

	//render Pooja's Page
	//res.render('menu.ejs', {menu1:menu1,menu2:menu2,menu3:menu3,menu4:menu4, cartItems:cartItems, total:total });

}

exports.menus=menus;
exports.addToCart=addToCart;
exports.deleteFromCart=deleteFromCart;
exports.confirmOrder=confirmOrder;

