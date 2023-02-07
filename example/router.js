const express = require('express');

const cart = require('./src/controller/cart');
const category = require('./src/controller/category');
const detail = require('./src/controller/detail');
const filter = require('./src/controller/filter');
const search = require('./src/controller/search');
const order = require('./src/controller/order');
const tracking = require('./src/controller/tracking');

const router = express.Router();

router.get('/order/*', order);
router.post('/order/*', order);
router.get('/basket/*', cart);
router.post('/basket/*', cart);
router.get('/product_detail/*', detail);
router.post('/product_detail/*', detail);
router.get('/category/*', category);
router.post('/category/*', category);
router.get('/search/*', search);
router.post('/search/*', search);

router.get('/img/*', tracking);
router.post('/img/*', tracking);

router.get('/*', filter);
router.post('/*', filter);

module.exports = router;
