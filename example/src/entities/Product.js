const Product = function() {
    this.id = 0;
    this.sku = '';
    this.name = '';
    this.price = 0;
    this.category = '';
    this.description = '';
    this.url = '';
    this.bestSeller = false;
    this.feature = false;
    this.latest = false;

    this.setId = (id) => {
        this.id = id;
    };

    this.setSku = (sku) => {
        this.sku = sku;
    };

    this.setName = (name) => {
        this.name = name;
    };

    this.setPrice = (price) => {
        this.price = price;
    };

    this.setCategory = (category) => {
        this.category = category;
    };

    this.setDescription = (description) => {
        this.description = description;
    };

    this.setUrl = (url) => {
        this.url = url;
    };

    this.setBestSeller = (bestSeller) => {
        this.bestSeller = bestSeller;
    };

    this.setFeature = (feature) => {
        this.feature = feature;
    };

    this.setLatest = (latest) => {
        this.latest = latest;
    };

    this.getId = () => {
        return this.id;
    };

    this.getSku = () => {
        return this.sku;
    };

    this.getName = () => {
        return this.name;
    };

    this.getPrice = () => {
        return this.price;
    };

    this.getCategory = () => {
        return this.category;
    };

    this.getDescription = () => {
        return this.description;
    };

    this.getUrl = () => {
        return this.url;
    };

    this.getBestSeller = () => {
        return this.bestSeller;
    };

    this.getFeature = () => {
        return this.feature;
    };

    this.getLatest = () => {
        return this.latest;
    };
};

module.exports = Product;
