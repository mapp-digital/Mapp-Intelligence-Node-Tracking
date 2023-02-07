const ProductModel = require('../models/ProductModel');

const category = (req, res, next) => {
    const requestUrl = req.globalStoreData.requestUrl;
    const urlSplit = requestUrl.split('/');
    const productCategory = urlSplit[urlSplit.length - 1];

    const productModel = new ProductModel();
    const categoryList = productModel.findAllByCategory(productCategory);

    req.globalStoreData.category = productCategory;
    req.globalStoreData.categoryList = null;
    if (categoryList.length > 0) {
        req.globalStoreData.categoryList = categoryList;
    }

    res.render('index', req.globalStoreData);
};

module.exports = category;