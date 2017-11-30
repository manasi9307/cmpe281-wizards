var ejs = require('ejs');
var mongo = require('./mongo');
var ObjectId = require('mongodb').ObjectID;
//var mongoProduct = 'mongodb://34.215.109.198:27017/trial';
var mongoProduct = 'mongodb://13.57.119.118:27017,52.52.150.229:27017,52.8.128.10:27017/project281?replicaSet=rs0';
var mongoCart='mongodb://34.215.212.195:27017/project281';
var mongoOrder = 'mongodb://34.215.212.195:27017/project281';

function cart(cart_details,uid,cartid) {
  var cid=Number(cartid);
  console.log('cart entered');
  var product_col;
  var prod=[], userType='';
  var cart_col;
  var userDetails_col;
  console.log("CHECK QUANTITY: "+cart_details[0].quantity);
  mongo.connect(mongoProduct, function() {
    console.log('Connected to mongo at: ' + mongoProduct);
    // to access cart_details collection
    cart_col = mongo.collection('cart_details');

    // to access product_catalog collection
    product_col = mongo.collection('product_catalog');
    // to access user_order collection
    userOrder_col = mongo.collection('user_order');
    // to access user collection



    var total = 0; // total to find the total cost of all the items in the cart
    var product;
    // calculate total cost for the cart_items list
    // for loop to iterate through each item ordered in cart_details json

    for(i=0;i<cart_details.length;i++){
      total+= cart_details[i].price * cart_details[i].quantity;
    }

    // insert the details into the cart_details collection
    cart_col.findOne({cart_id:cid},function(er,t){
      var temp=Number(t.total);
      temp+=total
      console.log("CHECK TOTAL: "+temp);
      cart_col.update(
        {cart_id:cid},{$set:{total:temp}},
        function(err, user) {
          if (user) {
            console.log('successful insertion');
          } else {
            console.log('ERROR');
          }
        });

    });



    //insert the details into user_order collection

    for(var i=0;i<cart_details.length;i++)
    {
      prod.push(cart_details[i].product_id);
    }
    console.log("************************************CHECK PROD: "+prod);
    userOrder_col.insert(
      {
        multiuser_id: uid,
        cart_id: cid,
        product_id: prod,
        total:total
      },
      function(err, results) {
        if (results) {
          console.log('successful insertion');
        } else {
          console.log('Failed insertion');
        }
      }
    );

    //check if the user is prime user and then redirect him to payment page or just display the contents of the particular user

  });
/*  console.log("FLAG:----- "+userType);
  if(userType==0 || userType==1)
  return userType;*/
}
exports.cart = cart;
