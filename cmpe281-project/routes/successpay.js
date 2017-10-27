var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

function updatestatus(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('cart_details');
        
        col1.findOne({user_id: 1}, function(err, cart){
            if (cart) {
           	console.log("USER: "+cart.total);
           	res.render('successpay.ejs',{ total: cart.total });
            } else {
            	res.render('error.ejs');
            }
        });

    });  
}


exports.success=updatestatus;