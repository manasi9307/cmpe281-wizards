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
            	var menu1=[], menu2=[], menu3=[], menu4=[];
            	menu.forEach(function(item) {
            		if(item.category_id==1){
            		   menu1.push(item);
            	}
            		if(item.category_id==2){
             		   menu2.push(item);
             	}
            		if(item.category_id==3){
             		   menu3.push(item);
             	}
            		if(item.category_id==4){
             		   menu4.push(item);
             	}
            		});
           	res.render('menu.ejs', {menu1:menu1,menu2:menu2,menu3:menu3,menu4:menu4, menu:menu });
            } else {
            	res.render('error.ejs');
            }
        });
    });  
}


exports.menus=menus;