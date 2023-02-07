const filter = (req, res, next) => {
    const requestUrl = req.url.split('?')[0];

    if (requestUrl.indexOf('/assets/') !== -1 || requestUrl.indexOf('favicon') !== -1) {
        return next();
    }
    else {
        req.globalStoreData.requestUrl = requestUrl;

        res.render('index', req.globalStoreData);
    }
};

module.exports = filter;
