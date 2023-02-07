const CustomerService = require('../service/CustomerService');
const TrackingService = require('../service/TrackingService');
const ProductModel = require('../models/ProductModel');

const productModel = new ProductModel();
const productList = productModel.findAll();
const bestSellerList = productModel.findBestSeller();
const latestProductList = productModel.findLatest();
const featureProductList = productModel.findFeature();

const global = (req, res, next) => {
    const requestUrl = req.url.split('?')[0];

    if (requestUrl.indexOf('/assets/') !== -1 || requestUrl.indexOf('favicon') !== -1) {
        return next();
    }

    const ts = new TrackingService(req);
    req.globalStoreData.ts = ts;

    new CustomerService(req);

    req.globalStoreData.requestUrl = requestUrl;
    req.globalStoreData.orderId = '';
    req.globalStoreData.cart = (req.session || {}).cart || [];

    const randomizeList = [
        productList[parseInt(Math.random() * (productList.length - 1))],
        productList[parseInt(Math.random() * (productList.length - 1))]
    ];

    req.globalStoreData.products = productList;
    req.globalStoreData.randomize = randomizeList;
    req.globalStoreData.bestseller = bestSellerList;
    req.globalStoreData.latest = latestProductList;
    req.globalStoreData.feature = featureProductList;

    next();

    ts.track();
};

module.exports = global;
