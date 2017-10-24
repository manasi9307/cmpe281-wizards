var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://34.215.109.198:27017/trial";

function check(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('col');

        coll.findOne({name: "Anjana"}, function(err, user){
            if (user) {
           	console.log("USER: "+user.name+" College:"+user.college);
           	res.render('payment.ejs');
            } else {
            	res.render('error.ejs');
            }
        });
    });  
}


exports.payment=check;