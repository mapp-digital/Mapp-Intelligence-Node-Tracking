const order = (req, res) => {
    const session = req.session || {};
    const cartList = session.cart || [];

    if (cartList.length > 0) {
        const orderId = Date.now() + '.' + parseInt(Math.random() * 100000 + '');

        const tracking = req.globalStoreData.ts;
        tracking.order(orderId, cartList);

        req.session.cart = [];
        req.globalStoreData.cart = [];
        req.globalStoreData.orderId = orderId;

        res.render('index', req.globalStoreData);
    }
    else {
        res.redirect('/');
    }
};

module.exports = order;
