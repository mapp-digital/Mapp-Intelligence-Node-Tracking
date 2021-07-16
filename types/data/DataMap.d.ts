import { Action } from './Action';
import { Campaign } from './Campaign';
import { Customer } from './Customer';
import { Order } from './Order';
import { Page } from './Page';
import { ProductCollection } from './ProductCollection';
import { Session } from './Session';
export declare class DataMap {
    private readonly data;
    action(value: Action): DataMap;
    campaign(value: Campaign): DataMap;
    customer(value: Customer): DataMap;
    order(value: Order): DataMap;
    page(value: Page): DataMap;
    product(value: ProductCollection): DataMap;
    session(value: Session): DataMap;
    build(): {
        [key: string]: any;
    };
}
