const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();


router.get('/', shopController.getIndex);

router.get('/product-detail/:id', );


module.exports = router;