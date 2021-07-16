import { AData } from './AData';
export declare class Order extends AData {
    private value;
    private id;
    private currency;
    private couponValue;
    private paymentMethod;
    private shippingService;
    private shippingSpeed;
    private shippingCosts;
    private grossMargin;
    private orderStatus;
    private readonly parameter;
    constructor(v?: number);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setValue(v: number): Order;
    setId(i: string): Order;
    setCurrency(c: string): Order;
    setCouponValue(cValue: number): Order;
    setPaymentMethod(pMethod: string): Order;
    setShippingService(sService: string): Order;
    setShippingSpeed(sSpeed: string): Order;
    setShippingCosts(sCosts: number): Order;
    setGrossMargin(gMargin: number): Order;
    setOrderStatus(oStatus: string): Order;
    setParameter(i: number, v: string): Order;
}
