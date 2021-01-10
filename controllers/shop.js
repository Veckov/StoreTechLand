const CassandraDB = require('../model/database');
const Product = require('../model/product');

const cassandra = new CassandraDB();
const Products = new Product();

cassandra.connection("Shop Controller");

// cassandra.client()

// exports.getIndex = (req,res,next) =>{ 
//        var prods = Products.fetchAll(req,res,next)
//         console.log("PRODS: " + prods);
//        // prrr = prods;
//        // console.log("TEST PRRR: "+ prrr);
//             if(!prods){
//                 res.status(404).send("<h1>ERROR</h1>");
//             }
//             else{  
//                 // prod =  result.rows;
//                // prod = prods;
//                 res.render('shop/index', {
//                     pageTitle: 'Shop',
//                     path: '/',
//                    // products: prod
//                 });
//                 //console.log(prod);
//             }       
// };

exports.getIndex = (req,res,next) =>{
    // const prod = Product.fetchAll(req,res,next);
    // console.log(prod);
    const query = "SELECT * FROM products";
    // var prrrr = Product.fetchAll(req,res,next);
    // console.log(prrrr);
    var prod;
        cassandra.client.execute(query, [], function(err,result){
            if(err){
                res.status(404).send({msg:err});
            }
            else{  
                prod =  result.rows;
                res.render('shop/index', {
                    pageTitle: 'Shop',
                    path: '/',
                    products: prod
                });
                //console.log(prod);
            }            
        });
}

exports.getProducts = (req,res) => {
    
}
