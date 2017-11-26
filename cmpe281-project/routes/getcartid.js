/*var ejs = require("ejs");
function usecart(req,res){
	var cid=req.param("cartid");
	           	res.render('menu.ejs',{cid:cid });

	}

exports.usecart=usecart;
*/
var mongo = require("./mongo");
var ejs = require("ejs");
var mongoURL = "mongodb://35.166.169.211:27017/project281";
function usecart(req,res){
var cid=req.param("cartid");
mongo.connect(mongoURL, function(){
           console.log('Connected to mongo at: '+ mongoURL);
           var coll = mongo.collection('cart_details');
           coll.find({cart_id:cid,status:'open'}, function(err,cart){
                      if(cart){
                                 console.log(cart.cart_id)
                                 res.render('menu.ejs',{cid:cid });
                      }else {
												//'menu.ejs',{cid:cid }("Cart does not exists");
                                 res.render('error.ejs');
                      }
           });//mongo
});//function
}



exports.usecart=usecart;
