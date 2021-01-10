const CassandraDB = require('../model/database');
const Product = require('../model/product');

const cassandra = new CassandraDB();
const product = new Product();

cassandra.connection("Admin Controller");

exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product', {
        pageTitle: "Add Product",
        path: '/admin/add-product',
    });
}

exports.postAddProduct = (req,res,next) =>{
    // const rating= '0';

    // Product.add();
    // var InsertQuery = "INSERT INTO products (prod_id, title, category, price, amount, description, imageUrl, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    // cassandra.client.execute(InsertQuery, [req.body.id, req.body.title, req.body.category, req.body.price,
    //     req.body.amount, req.body.description, req.body.imageUrl, rating],
    //     function(err,result){
    //         if(err){
    //             res.status(404).send({msg:err});
    //         }else{
    //             console.log("Uspesno Dodato!");
    //             res.redirect('/');
    //         }
    //     });


    const id = req.body.id;
    const title = req.body.title;
    const category = req.body.category;
    const price =  req.body.price;
    const amount = req.body.amonut;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const rating = '0';

    console.log("1:" + id + " t" + title + " " + category + " " + price + " " + amount + " " + description + " " + imageUrl);

    product.AddProduct(res, id, title, category, price, amount, description, imageUrl, rating );

}

exports.getProducts = (req,res,next) =>{

    const query = "SELECT * FROM products";
    var prod;
    cassandra.client.execute(query, [], function(err,result){
        if(err){
            res.status(400).send({msg:err});
        }else{
            prod = result.rows;
            res.render('admin/products',{
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: prod
            });
        }
    });
}

exports.getEditProduct = (req,res,next) => {
    //res.send("<h1>test ID: " + req.params['id'] + "</h1>");
    prodID = req.params['id'];
    res.render('admin/edit-product', {
        pageTitle: "Edit Product",
        path: '/admin/edit-product',
        productID: prodID
    });
}

 //" UPDATE subscribers SET email=?, first_name=?, last_name=? WHERE id=?"
exports.postEditProduct = (req,res) => {
    const prod_id = req.params['id'];
    const updateQuery = "UPDATE products SET title=?, category=?, price=?, amount=?, description=?, imageUrl=? WHERE prod_id=?" ;

    const title = req.body['title'];
    const category = req.body['category'];
    const price = req.body['price'];
    const amount = req.body['amonut'];
    const description = req.body['description'];
    const imageUrl = req.body['imageUrl'];

    cassandra.client.execute(updateQuery, [title, category, price, amount, description, imageUrl, prod_id], 
        function(err,result){
            if(err){
                res.status(400).send({msg:err});
            }else{
                console.log("Uspesno Editovano");
                res.redirect('/');
            }
        })
}

exports.postDeleteProduct = (req,res) => {
    const pID = req.body.productId;
    const query = "DELETE FROM products WHERE id = ?";
    cassandra.client.execute(query, [pID], function(err, res){
        if(err){
            res.status(404).send({msg:err});
        }else{
            console.log("Uspesno Izbrisano");
        }
        res.redirect('/admin/products');
    });
}
