var ejs = require('ejs');
var mongo = require('./mongo');
var mongoURL = 'mongodb://34.215.109.198:27017/trial';
function cart(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('col');
         var cart_items =[ {
"item":"Noodles",
"cost" :2,
"quantity":3
},
{
"item":"Fried Rice",
"cost":3,
"quantity":1
}
{
"item":"Egg Rolls",
"cost":2,
"quantity":1
}];
var user_details = [{
  "user_id": 1,
  "cart_id": 1
}};
 var total=0;
for(var i=0;i<cart_items.length;i++){
  coll.findOne({product_name: cart_item[i].item}, function(err, user){
            if (user) {
           	//console.log("USER: "+user.name+" College:"+user.college);
            total= total+user.price;
           	res.render('payment.ejs');
            } else {
            	res.render('error.ejs');
            }
        });
    });

}

}
exports.payment=check;
