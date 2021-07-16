import { Product } from './Product';
export declare class ProductCollection {
    private readonly data;
    add(value: Product): ProductCollection;
    build(): Array<Product>;
}
