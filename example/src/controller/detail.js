const ProductModel = require('../models/ProductModel');

const detail = (req, res, next) => {
    const requestUrl = req.globalStoreData.requestUrl;
    const productSplit = requestUrl.split('/');
    const productSku = productSplit[productSplit.length - 1];

    const productModel = new ProductModel();
    const product = productModel.findBySku(productSku);

    req.globalStoreData.product = null;
    req.globalStoreData.related = null;

    if (product !== null) {
        req.globalStoreData.product = product;
        req.globalStoreData.related = productModel.findAllByCategory(product.getCategory());

        const tracking = req.globalStoreData.ts;
        tracking.viewProduct(product);
    }

    res.render('index', req.globalStoreData);
};

module.exports = detail;