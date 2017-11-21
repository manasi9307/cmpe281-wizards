var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";
var ObjectId = require('mongodb').ObjectID;
function updatestatus(req,res){
	var mode=req.param("mode");
	var cnumber=req.param("cardno");
	var uid=req.param("uid");
	var cid=Number(req.param("cid"));
	var newbill={user_id: uid,mode:mode,card_num:cnumber,cart_id:cid};
console.log(mode+cnumber);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('payment');
        col1.insertOne(newbill, function(err, rest) {
            if (err) throw err;
            else{
                var col2 = mongo.collection('cart_details');
                //var myquery = {"cart_id": cid };
                //var newvalues = {"status": "closed"};
               console.log("QUERY CHECK: "+cid);
                col2.updateOne({"cart_id":cid}, {"$set":{"status": "closed"}}, function(err, results){
									console.log("CHECK UPDATE:---> "+results);
                    if (results) {
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
