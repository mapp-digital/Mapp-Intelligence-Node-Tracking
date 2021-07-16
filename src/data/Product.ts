import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Product extends AData {
    /**
     * Constant for product view.
     */
    public static readonly VIEW: string = 'view';
    /**
     * Constant for add product to basket.
     */
    public static readonly BASKET: string = 'add';
    /**
     * Constant for order confirmation.
     */
    public static readonly CONFIRMATION: string = 'conf';

    /**
     * Saves products placed in the shopping cart. This property must be entered if products are to be measured.
     * A product ID may not contain more than 110 characters.
     */
    private id: string = '';
    /**
     * Contains the product price ('0' prices are allowed). If you transmit a product several times (quantity
     * property greater than 1), use the total price not the unit price.
     */
    private cost: number = 0;
    /**
     * Contains the product quantity.
     */
    private quantity: number = 0;
    /**
     * Contains states of your product (VIEW, BASKET, CONFIRMATION).
     */
    private status: string = Product.VIEW;
    /**
     * Use this to transmit the variant of the product.
     */
    private variant: string = '';
    /**
     * Use this to transmit the product is sold out or in stock (sold out = true, in stock = false).
     */
    private soldOut: boolean = false;
    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     */
    private parameter: {[key: number]: string} = {};
    /**
     * Product categories allow the grouping of products.
     */
    private category: {[key: number]: string} = {};

    /**
     * @param [i] Saves products placed in the shopping cart. This property must be entered if products are to be
     *          measured. A product ID may not contain more than 110 characters
     */
    public constructor(i?: string) {
        super();

        this.filterQueryParameter = false;
        if (i) {
            this.id = i;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['id'] = Parameter.PRODUCT_ID;
        queryList['cost'] = Parameter.PRODUCT_COST;
        queryList['quantity'] = Parameter.PRODUCT_QUANTITY;
        queryList['status'] = Parameter.PRODUCT_STATUS;
        queryList['variant'] = Parameter.PRODUCT_VARIANT;
        queryList['soldOut'] = Parameter.PRODUCT_SOLD_OUT;
        queryList['parameter'] = Parameter.CUSTOM_PRODUCT_PARAMETER;
        queryList['category'] = Parameter.CUSTOM_PRODUCT_CATEGORY;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['id'] = this.id;
        data['cost'] = this.cost;
        data['quantity'] = this.quantity;
        data['status'] = this.status;
        data['variant'] = this.variant;
        data['soldOut'] = this.soldOut;
        data['parameter'] = this.parameter;
        data['category'] = this.category;

        return data;
    }

    /**
     * @param i Saves products placed in the shopping cart. This property must be entered if products are to be
     *          measured. A product ID may not contain more than 110 characters
     *
     * @return MappIntelligenceProduct
     */
    public setId(i: string): Product {
        this.id = i;

        return this;
    }

    /**
     * @param c Contains the product price ('0' prices are allowed). If you transmit a product several times
     *          (quantity property greater than 1), use the total price not the unit price
     *
     * @return MappIntelligenceProduct
     */
    public setCost(c: number): Product {
        this.cost = c;

        return this;
    }

    /**
     * @param q Contains the product quantity
     *
     * @return MappIntelligenceProduct
     */
    public setQuantity(q: number): Product {
        this.quantity = q;

        return this;
    }

    /**
     * @param s Contains states of your product (VIEW, BASKET, CONFIRMATION)
     *
     * @return MappIntelligenceProduct
     */
    public setStatus(s: string): Product {
        if (s === Product.VIEW || s === Product.BASKET || s === Product.CONFIRMATION) {
            this.status = s;
        }

        return this;
    }

    /**
     * @param v Use this to transmit the variant of the product
     *
     * @return MappIntelligenceProduct
     */
    public setVariant(v: string): Product {
        this.variant = v;

        return this;
    }

    /**
     * @param sOut Use this to transmit the product is sold out or in stock (sold out = true, in stock = false)
     *
     * @return MappIntelligenceProduct
     */
    public setSoldOut(sOut: boolean): Product {
        this.soldOut = sOut;

        return this;
    }

    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     *
     * @param i ID of the parameter
     * @param v Value of the parameter
     * @return MappIntelligenceProduct
     */
    public setParameter(i: number, v: string): Product {
        this.parameter[i] = v;

        return this;
    }

    /**
     * Product categories allow the grouping of products.
     *
     * @param i ID of the parameter
     * @param v Value of the parameter
     * @return MappIntelligenceProduct
     */
    public setCategory(i: number, v: string): Product {
        this.category[i] = v;

        return this;
    }
}
