var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

function updatestatus(req,res){
	var mode=req.param("mode");
	var cnumber=req.param("cardno");
	var newbill={user_id: 1,mode:mode,card_num:cnumber};
console.log(mode+cnumber);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('payment');
        col1.insertOne(newbill, function(err, rest) {
            if (err) throw err;
            console.log("1 document inserted");
            res.render('successpay.ejs');
            });

    });  
}


exports.success=updatestatus;