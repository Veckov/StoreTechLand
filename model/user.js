const express = require('express');
const CassandraDB = require('../model/database');

const db = new CassandraDB();
db.connection("class User");

class User {
    constructor(username, email,password, cart, id){
        this.username = username;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this.id = id;
    }

}

module.exports = User;