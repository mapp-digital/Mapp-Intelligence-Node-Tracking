const ProductModel = require('../models/ProductModel');

const search = (req, res, next) => {
    const requestUrl = req.globalStoreData.requestUrl;
    const urlSplit = requestUrl.split('/');
    const search = decodeURIComponent(urlSplit[urlSplit.length - 1]);

    const productModel = new ProductModel();
    const searchList = productModel.findAllBySearch(search);

    const tracking = req.globalStoreData.ts;
    tracking.search(search, searchList.length);

    req.globalStoreData.search = search;
    req.globalStoreData.searchList = [];
    req.globalStoreData.searchListResult = searchList.length;

    if (searchList.length > 0) {
        req.globalStoreData.searchList = searchList;
    }

    res.render('index', req.globalStoreData);
};

module.exports = search;
