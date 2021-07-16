import {Product} from './Product';

export class ProductCollection {
    /**
     * List of products.
     */
    private readonly data: Array<Product> = [];

    /**
     * @param value Add value to map
     *
     * @return MappIntelligenceProductCollection
     */
    public add(value: Product): ProductCollection {
        this.data.push(value);
        return this;
    }

    /**
     * @return List(MappIntelligenceProduct)
     */
    public build(): Array<Product> {
        return this.data;
    }
}
