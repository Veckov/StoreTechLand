const express = require('express');
const CassandraDB = require('../model/database');

const db = new CassandraDB();
db.connection("class Product");

class Product{
    constructor(prod_id, title, category, price, amount, description,
        imageUrl, rating){
    
        this.prod_id = prod_id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.amount = amount;
        this.description = description;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    fetchAll(req,res,next){
        let prod;
        const query = "SELECT * FROM products";
        db.client.execute(query, [], function(err,result){
            if(err){
                res.status(404).send({msg:err});
                return [];
            }
            else{
                //console.log(result.rows);
                prod = result.rows;
                console.log(prod);
                return prod;
            }            
        });
    }

    AddProduct(res, id, title, category, price, amount, description, imageUrl, rating){
        var InsertQuery = "INSERT INTO products (prod_id, title, category, price, amount, description, imageUrl, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        db.client.execute(InsertQuery, [id, title, category, price,
            amount, description, imageUrl, rating],
            function(err,result){
                if(err){
                    res.status(404).send({msg:err});
                }else{
                    console.log("Uspesno Dodato!");
                    res.redirect('/');
                }
            });
    }

}

module.exports = Product;