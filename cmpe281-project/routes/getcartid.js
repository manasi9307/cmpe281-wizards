var mongo = require("./mongo");
var ejs = require("ejs");
var mongoCartDetails = "mongodb://52.8.19.39:27017,13.56.167.225:27017,13.56.67.12:27017/project281?replicaSet=rs0";
function usecart(req,res){
var cid=req.param("cartid");
mongo.connect(mongoCartDetails, function(){
           console.log('Connected to mongo at: '+ mongoCartDetails);
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
