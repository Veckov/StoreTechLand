const path = require('path');

const express = require('express');

const AdminController = require('../controllers/admin');

const router = express.Router();

// /admin je setovan u app.js (/admin/add-product)
router.get('/add-product', AdminController.getAddProduct);

router.post('/add-product', AdminController.postAddProduct);


module.exports = router;