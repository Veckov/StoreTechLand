const CassandraDB = require('../model/database');
const Product = require('../model/product');

const cassandra = new CassandraDB();
//const Products = new Product();

cassandra.connection("Admin Controller");

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
    });
}

exports.postAddProduct = (req,res,next) =>{
    const rating= '0';
    var InsertQuery = "INSERT INTO products (prod_id, title, category, price, amount, description, imageUrl, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    cassandra.client.execute(InsertQuery, [req.body.id, req.body.title, req.body.category, req.body.price,
        req.body.amount, req.body.description, req.body.imageUrl, rating],
        function(err,result){
            if(err){
                res.status(404).send({msg:err});
            }else{
                console.log("Uspesno Dodato!");
                res.redirect('/');
            }
        });
}