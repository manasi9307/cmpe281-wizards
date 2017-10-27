var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/cmpe281";

function check(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('category');

        coll.findOne({category_id : 1}, function(err, cat){
            if (cat) {
           	console.log("Category: "+cat.category_name);
           	res.render('category.ejs');
            } else {
            	res.render('error.ejs');
            }
        });
    });  
}