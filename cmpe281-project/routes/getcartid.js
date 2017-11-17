var ejs = require("ejs");

function usecart(req,res){
	var cid=req.param("cartid");
	           	res.render('menu.ejs',{cid:cid });

	}

exports.usecart=usecart;
