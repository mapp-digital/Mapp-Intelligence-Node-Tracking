const Item = require('../entities/Item');
const ProductModel = require('../models/ProductModel');

const isExisting = (id, cart) => {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product.id === id) {
            return i;
        }
    }
    return -1;
};

const displayCart = (req, res) => {
    req.globalStoreData.cart = req.session.cart || [];
    res.render('index', req.globalStoreData);
};

const add = (req, res) => {
    const session = req.session;
    const productModel = new ProductModel();

    const id = parseInt((req.query || {})['id'] || '');
    const qty = parseInt((req.query || {})['qty'] || '');
    const product = productModel.findById(id);

    if (product) {
        const tracking = req.globalStoreData.ts;
        tracking.addProduct(product, qty);

        let cartList = session.cart || [];

        if (cartList.length === 0) {
            cartList.push(new Item(product, qty));
        }
        else {
            const index = isExisting(id, cartList);
            if (index === -1) {
                cartList.push(new Item(product, qty));
            }
            else {
                cartList[index].quantity = cartList[index].quantity + qty;
            }
        }

        req.session.cart = cartList;
    }

    res.redirect('/basket/cart');
};

const remove = (req, res) => {
    const session = req.session;
    const cartList = session.cart || [];

    const id = parseInt((req.query || {})['id'] || '');
    const index = isExisting(id, cartList);

    if (index !== -1) {
        cartList.splice(index, 1);
    }

    req.session.cart = cartList;
    res.redirect('/basket/cart');
};

const cart = (req, res) => {
    const action = (req.query || {})['action'];

    if (!action) {
        displayCart(req, res);
    }
    else {
        if (action.toLowerCase() === 'add') {
            add(req, res);
        }
        else if (action.toLowerCase() === 'remove') {
            remove(req, res);
        }
        else {
            displayCart(req, res);
        }
    }
};

module.exports = cart;
