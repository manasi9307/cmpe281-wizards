var ejs = require('ejs');
var mongo = require('./mongo');
//var mongoURL = 'mongodb://34.215.109.198:27017/trial';
var mongoURL = 'mongodb://localhost:27017/project281';
function cart(cart_details,uid,cid) {
  console.log('cart entered');
  var product_col;
  var cart_col;
  var userOrder_col;
  var userDetails_col;
  console.log("CHECK: "+uid);
  mongo.connect(mongoURL, function() {
    console.log('Connected to mongo at: ' + mongoURL);
    // to access cart_details collection

    cart_col = mongo.collection('cart_details');

    // to access product_catalog collection
    product_col = mongo.collection('product_catalog');
    // to access user_order collection
    userOrder_col = mongo.collection('user_oder');
    // to access user collection
    userDetails_col = mongo.collection('user_details');

 

    var total = 0; // total to find the total cost of all the items in the cart
    var product;
    // calculate total cost for the cart_items list
    // for loop to iterate through each item ordered in cart_details json
    
    
   /* for (i = 0; i < cart_details.length; i++) {
      // query database for the cart_item
      product_col.find({ product_name: cart_details[i].product_name }, function(
        err,
        products
      ) {
        //products holds the details of the item ordered
        if (products) {
          product = products.product_id;

          console.log('successful querying of product');
          //calculate the cost using price fetched from the query and find the total cost using quantity and cost
          total = cart_details[i].quantity * products.price;
        } else {
          //console the error
          console.log('failed operation');
        }
      });
    }*/
    
    for(i=0;i<cart_details.length;i++){
      total= cart_details[i].price * cart_details[i].quantity;
    }

    // insert the details into the cart_details collection
    cart_col.insert(
      {
        cart_id: cid,
        user_id: uid,
        status: "open",
        total: total
      },
      function(err, user) {
        if (user) {
          console.log('successful insertion');
        } else {
          console.log('ERROR');
        }
      }
    );

    //insert the details into user_order collection
    userOrder_col.insert(
      {
        multiuser_id: uid,
        cart_id: cid,
        product_id: cart_details.product_id
      },
      function(err, results) {
        if (result) {
          console.log('successful insertion');
        } else {
          console.log('Failed insertion');
        }
      }
    );

    //check if the user is prime user and then redirect him to payment page or just display the contents of the particular user
    userDetails_col.findOne({ user_id: uid }, function(
      err,
      user
    ) {
      if (user) {
        if (user.flag == 0) {
          res.render('cart.ejs', { cart_details: cart_details });
        } else {
          res.render('payment.ejs', { total: total });
        }
      }
    });
  });
}
exports.cart = cart;
