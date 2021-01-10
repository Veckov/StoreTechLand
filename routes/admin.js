const path = require('path');

const express = require('express');

const AdminController = require('../controllers/admin');

const router = express.Router();

// /admin je setovan u app.js (/admin/add-product)
router.get('/add-product', AdminController.getAddProduct);
router.post('/add-product', AdminController.postAddProduct);

router.get('/products', AdminController.getProducts);

router.get('/edit-product/:id', AdminController.getEditProduct);
router.post('/edit-product/:id', AdminController.postEditProduct);


router.post('/delete-product', AdminController.postDeleteProduct);


module.exports = router;

