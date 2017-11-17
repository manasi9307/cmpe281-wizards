var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";


function check(req,res,int id){
console.log(id);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('product_catalogue');
        var order_item_id = 1;
        var categ_id = 1;

        // Keeping a check to prevent the same item from getting recommended
        coll.find({category_id : categ_id}, function(err, cat){
            if (cat) {
                for (item in cat) {
                    if (item.product_id != order_item_id) {
                        console.log("You may like: " + item.product_name);
           	            res.render("category", {item: JSON.stringify(item.product_name)});
                        break;
                     }
                }
            }
            else {
            	res.render('error.ejs');
            }
        });
    });  
}

