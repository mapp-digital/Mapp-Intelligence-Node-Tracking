const Product = require('../entities/Product');
const staticProducts = require('../../resources/products');

const ProductModel = function() {
    const products = [];
    const bestSeller = [];
    const featureProducts = [];
    const latestProducts = [];

    const __constructor = () => {
        for (let i = 0; i < staticProducts.length; i++) {
            this.addProduct(staticProducts[i]);
        }
    };

    this.addProduct = (staticProduct) => {
        const p = new Product();
        p.setId(staticProduct['Id']);
        p.setSku(staticProduct["SKU"]);
        p.setName(staticProduct["Name"]);
        p.setCategory(staticProduct["Category"]);
        p.setPrice(staticProduct["Price"]);
        p.setDescription(staticProduct["Description"]);
        p.setUrl(staticProduct["ImageUrl"]);
        p.setBestSeller(staticProduct["BestSeller"]);
        p.setFeature(staticProduct["Feature"]);
        p.setLatest(staticProduct["Latest"]);

        if (p.getBestSeller()) {
            bestSeller.push(p);
        }

        if (p.getFeature()) {
            featureProducts.push(p);
        }

        if (p.getLatest()) {
            latestProducts.push(p);
        }

        products.push(p);
    };

    this.findAll = () => {
        return products;
    };

    this.findAllByCategory = (category) => {
        const p = [];
        for (let i = 0, l = products.length; i < l; i++) {
            if (products[i].getCategory().toLowerCase() === category.toLowerCase()) {
                p.push(products[i]);
            }
        }

        return p;
    };

    this.findAllBySearch = (searchTerm) => {
        const p = [];
        let category;
        let name;
        let description;
        let term = searchTerm.toLowerCase();

        for (let i = 0, l = products.length; i < l; i++) {
            category = products[i].getCategory().toLowerCase();
            name = products[i].getName().toLowerCase();
            description = products[i].getDescription().toLowerCase();

            if (category.indexOf(term) !== -1 || name.indexOf(term) !== -1 || description.indexOf(term) !== -1) {
                p.push(products[i]);
            }
        }

        return p;
    };

    this.findBestSeller = () => {
        return bestSeller;
    };

    this.findFeature = () => {
        return featureProducts;
    };

    this.findLatest = () => {
        return latestProducts;
    };

    this.findBySku = (sku) => {
        for (let i = 0, l = products.length; i < l; i++) {
            if (products[i].getSku() === sku) {
                return products[i];
            }
        }

        return null;
    };

    this.findById = (id) => {
        for (let i = 0, l = products.length; i < l; i++) {
            if (products[i].getId() === id) {
                return products[i];
            }
        }

        return null;
    };

    __constructor();
};

module.exports = ProductModel;
