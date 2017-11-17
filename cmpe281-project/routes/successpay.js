var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

function updatestatus(req,res){
	var mode=req.param("mode");
	var cnumber=req.param("cardno");
	var cid=req.param("cartid");
	var uid=req.param("uid");
	var newbill={user_id: uid,mode:mode,card_num:cnumber};
console.log(mode+cnumber);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('payment');
        col1.insertOne(newbill, function(err, rest) {
            if (err) throw err;
            else{
            	
                var col2 = mongo.collection('cart_details');
                var myquery = { cart_id: cid };
                var newvalues = {$set: {status: "Closed"} };
                
                col1.updateOne(myquery, newvalues, function(err, res){
                    if (res) {
                        console.log("1 document inserted");
                        res.render('successpay.ejs');
                    } else {
                    	res.render('error.ejs');
                    }
                });
            	
            	

            }
            });

    });  
}


exports.success=updatestatus;