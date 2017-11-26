var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/project281";

var user='',cart='',type='';
function check(req,res){

}

function getUser(uid,cid,type){

}

exports.payment=check;
exports.getUser=getUser;
