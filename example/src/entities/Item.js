/**
 * @param {Product} product
 * @param {number} quantity
 * @constructor
 */
const Item = function(product, quantity) {
    this.product = product;
    this.quantity = quantity;

    /**
     * @returns {Product}
     */
    this.getProduct = () => {
        return this.product;
    };

    /**
     * @param {Product} product
     */
    this.setProduct = (product) => {
        this.product = product;
    };

    /**
     * @returns {number}
     */
    this.getQuantity = () => {
        return this.quantity;
    };

    /**
     * @param {number} quantity
     */
    this.setQuantity = (quantity) => {
        this.quantity = quantity;
    };
};

module.exports = Item;
