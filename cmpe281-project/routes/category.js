var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/cmpe281";

function check(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('category');
        var order_item_id = 1;

        // Keeping a check to prevent the same item from getting recommended
        coll.findOne({category_id : 1}, function(err, cat){
            if (cat && coll.order_item_id != 1) {
           	   console.log("You may like: " + cat.category_name);
           	   res.render('category.ejs');
            } else {
            	res.render('error.ejs');
            }
        });
    });  
}
