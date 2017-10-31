var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

function menus(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('product_catalog');

        coll.find().toArray(function(err, menu){
            if (menu) {
           	//console.log("USER: "+user.name+" College:"+user.college);
           	res.render('menu.ejs', {menu:menu});
            } else {
            	res.render('error.ejs');
            }
        });
    });  
}


exports.menus=menus;