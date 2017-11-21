var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

var user='',cart='',type='';
function check(req,res){
	//var uid=req.param("uid");
	/*mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var col1 = mongo.collection('cart_details');

		col1.findOne({user_id: uid,cart_id:1}, function(err, cart){
			if (cart) {
				console.log("USER: "+cart.total);
				res.render('payment.ejs',{ total: cart.total });
			} else {
				res.render('error.ejs');
			}
		});
	});*/
	res.render('payment.ejs',{ total: 500,uid:uid});
}


function getUser(uid,cid,type){
user=uid;
cart=cid;
type=type;
check();
}

exports.payment=check;
exports.getUser=getUser;
