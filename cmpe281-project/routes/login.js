var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://52.8.19.39:27017,13.56.167.225:27017,13.56.67.12:27017/project281?replicaSet=rs0";
function check(req,res){
  var username,password;
username=req.param("username");
password=req.param("password");
console.log("USERNAME: "+username);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var col1 = mongo.collection('user_details');

        col1.findOne({email: username,password:password}, function(err, user){
          console.log("USER:  "+user._id);
            if (user) {

              var col2 = mongo.collection('cart_details');
              var x=(user._id).toString();
              col2.find({user_id: x}).toArray(function(err,cart){
           	res.render('home.ejs',{ uid: user._id,carts:cart});
          })
        }
           else {
            	res.render('error.ejs');
            }
        });//query


  });//mongo

}//function

function logout(req,res){
  console.log('Session Destroyed');
  res.render('index.ejs');
}//function


exports.login=check;
exports.logout=logout;
