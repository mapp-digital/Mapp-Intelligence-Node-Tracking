import { AData } from './AData';
export declare class Product extends AData {
    static readonly VIEW: string;
    static readonly BASKET: string;
    static readonly ADD_TO_CART: string;
    static readonly DELETE_FROM_CART: string;
    static readonly CHECKOUT: string;
    static readonly CONFIRMATION: string;
    static readonly ADD_TO_WISHLIST: string;
    static readonly DELETE_FROM_WISHLIST: string;
    private id;
    private cost;
    private quantity;
    private status;
    private variant;
    private soldOut;
    private parameter;
    private category;
    constructor(i?: string);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setId(i: string): Product;
    setCost(c: number): Product;
    setQuantity(q: number): Product;
    setStatus(s: string): Product;
    setVariant(v: string): Product;
    setSoldOut(sOut: boolean): Product;
    setParameter(i: number, v: string): Product;
    setCategory(i: number, v: string): Product;
}
