var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://52.8.19.39:27017,13.56.167.225:27017,13.56.67.12:27017/project281?replicaSet=rs0";

function generate(req,res){
var temp=Math.random();
var num=temp*10000;
num=Math.ceil(num);
console.log("UID IN JS: "+req.param("uid"));
var uid=req.param("uid");
mongo.connect(mongoURL, function(){
         console.log('Connected to mongo at: ' + mongoURL);
         var newfolder={cart_id:num,user_id:uid,status:"open",total:0};
         var coll = mongo.collection('cart_details');
         coll.insertOne(newfolder, function(err, restl) {
         if (err){
res.render('error.ejs');
                 console.log("Failed signup---");
 res.render('error.ejs');
           //throw err;
         }//if
         else{
        var x=(uid).toString();
           coll.find({user_id: x}).toArray(function(err,doc){
             console.log("UID"+ uid);
             console.log("cart"+doc[0]._id)
             res.render("home.ejs",{uid:uid ,carts:doc});
           });//each


         }//else

       console.log("HELLO");
  });//query


     });//mongo

}





exports.createcartid=generate;
