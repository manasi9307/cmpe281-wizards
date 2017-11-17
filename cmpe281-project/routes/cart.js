var ejs = require('ejs');
var mongo = require('./mongo');
var mongoURL = 'mongodb://34.215.109.198:27017/trial';
function cart(req,res){
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        // to access cart_details collection
        var cart_col = mongo.collection('cart_details');
        
        // to access product_catalog collection
        var product_col = mongo.collection('product_catalog');
        // to access user_order collection
        var userOrder_col = mongo.collection('user_oder');});
        //cart_details json with user_id,cart_id and the items list sent 
         var cart_details =[
             "user_id":1,
             "cart_id":1,
       items:[      {
"name":"Noodles",
"cost" :2,
"quantity":3
},
{
"name":"Fried Rice",
"cost":3,
"quantity":1
}
{
"name":"Egg Rolls",
"cost":2,
"quantity":1
}];
             
                    
 var total=0; // total to find the total cost of all the items in the cart
 var product;             
 // calculate total cost for the cart_items list
 // for loop to iterate through each item ordered in cart_details json                   
                    for(i=0;i < cart_details.items.length; i++){
                    // query database for the cart_item
                    product_col.find({product_name:cart_details.items[i].name},function(err,products)
                    {
                    //products holds the details of the item ordered
                      if(products)
                    {
                        product=products.product_id;
                      
                      console.log("successful querying of product");
                      //calculate the cost using price fetched from the query and find the total cost using quantity and cost
                      total = cart_details.items[i].quantity * products.price ;
                    }else
                      //console the error
                    {
                        console.log("failed operation");
                    }
                    });
                    }
// insert the details into the cart_details collection
  cart_col.insert({cart_id: cart_details.cart_id, user_id: cart_details.user_id,status : cart_details.status,total:total}, function(err, user){
         
        if (user) {
          
          console.log("successful insertion");
          
        } else {
          console.log('ERROR');
          
        }
      
    });

//insert the details into user_order collection
        userOrder.insert({multiuser_id:cart_details.user_id,cart_id:cart_details.cart_id,product_id:product},function(err,results){
            if(result){
                console.log("successful insertion");
            }else{
                console.log("Failed insertion");
            }
        }
                         );


//check if the user is prime user and then redirect him to payment page or just display the contents of the particular user
                    coll.findOne({user_details.user_id},function(err, user){
                    if(user){
                    if(user.flag==0){
                        
                        res.render("cart.ejs",{cart_details:cart_details});
  } else{
  res.render("payment.ejs",{total:total});
  }}});
  }
                            


exports.cart=cart;
