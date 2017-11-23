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
	var col1= mongo.collection('user_order');
		var x=Number(cid);
var final_list=[];
		col1.find({cart_id: 2003}).toArray(function(err,items){
			console.log("ITEM CHECK--------------"+items);
			var l1=(items.length);
			console.log("ITEMS LENGTH: "+l1);
			for(var i=0;i<l1;i++){
				var l=(items[i].product_id).length;
				console.log("CHECK THIS####### : "+l);
				for(var j=0;j<l;j++){
				console.log("ALL IDS CHECK************************ "+items[i].product_id[j]);
				var coll2=mongo.collection('product_catalog');
				col1.find({cart_id: items[i].product_id[j]},function(err,item){
					final_list.push(item.product_name);
				});

			}
			}

	})
}

exports.payment=check;
exports.getUser=getUser;
