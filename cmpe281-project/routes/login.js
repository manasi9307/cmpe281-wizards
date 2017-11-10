var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

function check(req,res){
  var username,password;
username=req.param("username");
password=req.param("password");
console.log("USERNAME: "+username);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('user_details');

        col1.findOne({email: username,password:password}, function(err, user){
          console.log("USER:  "+user);
            if (user) {
           	console.log("USER: "+user._id);
           	res.render('home.ejs',{ uid: user._id });
            } else {
            	res.render('error.ejs');
            }
        });
    });
}


exports.login=check;
