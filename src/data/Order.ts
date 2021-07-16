import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Order extends AData {
    /**
     * Saves the total order value. This property must be entered if total order values are to be tracked.
     */
    private value: number = 0;
    /**
     * Contains a unique order number (order ID). Use of this setting ensures that no orders are counted twice.
     */
    private id: string = '';
    /**
     * The currency of an order.
     */
    private currency: string = '';
    /**
     * Contains the value of a coupon.
     */
    private couponValue: number = 0;
    /**
     * Use this to transmit the payment method of the order.
     */
    private paymentMethod: string = '';
    /**
     * Use this to transmit the shipping service of the order.
     */
    private shippingService: string = '';
    /**
     * Use this to transmit the shipping speed of the order.
     */
    private shippingSpeed: string = '';
    /**
     * Use this to transmit the shipping costs of the order.
     */
    private shippingCosts: number = 0;
    /**
     * Use this to transmit the margin/mark-up of the order.
     */
    private grossMargin: number = 0;
    /**
     * Use this to transmit the order status of the order.
     */
    private orderStatus: string = '';
    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     * Observe the syntax guidelines when defining parameters.
     */
    private readonly parameter: {[key: number]: string} = {};

    /**
     * @param [v] Saves the total order value. This property must be entered if total order values are to be tracked
     */
    public constructor(v?: number) {
        super();

        if (v) {
            this.value = v;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['value'] = Parameter.ORDER_VALUE;
        queryList['id'] = Parameter.ORDER_ID;
        queryList['currency'] = Parameter.CURRENCY;
        queryList['couponValue'] = Parameter.COUPON_VALUE;
        queryList['paymentMethod'] = Parameter.PAYMENT_METHOD;
        queryList['shippingService'] = Parameter.SHIPPING_SERVICE;
        queryList['shippingSpeed'] = Parameter.SHIPPING_SPEED;
        queryList['shippingCosts'] = Parameter.SHIPPING_COSTS;
        queryList['grossMargin'] = Parameter.GROSS_MARGIN;
        queryList['orderStatus'] = Parameter.ORDER_STATUS;
        queryList['parameter'] = Parameter.CUSTOM_PRODUCT_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['value'] = this.value;
        data['id'] = this.id;
        data['currency'] = this.currency;
        data['couponValue'] = this.couponValue;
        data['paymentMethod'] = this.paymentMethod;
        data['shippingService'] = this.shippingService;
        data['shippingSpeed'] = this.shippingSpeed;
        data['shippingCosts'] = this.shippingCosts;
        data['grossMargin'] = this.grossMargin;
        data['orderStatus'] = this.orderStatus;
        data['parameter'] = this.parameter;

        return data;
    }

    /**
     * @param v Saves the total order value. This property must be entered if total order values are to be tracked
     *
     * @return MappIntelligenceOrder
     */
    public setValue(v: number): Order {
        this.value = v;

        return this;
    }

    /**
     * @param i Contains a unique order number (order ID). Use of this setting ensures that no orders are counted twice
     *
     * @return MappIntelligenceOrder
     */
    public setId(i: string): Order {
        this.id = i;

        return this;
    }

    /**
     * @param c The currency of an order
     *
     * @return MappIntelligenceOrder
     */
    public setCurrency(c: string): Order {
        this.currency = c;

        return this;
    }

    /**
     * @param cValue Contains the value of a coupon
     *
     * @return MappIntelligenceOrder
     */
    public setCouponValue(cValue: number): Order {
        this.couponValue = cValue;

        return this;
    }

    /**
     * @param pMethod Use this to transmit the payment method of the order
     *
     * @return MappIntelligenceOrder
     */
    public setPaymentMethod(pMethod: string): Order {
        this.paymentMethod = pMethod;

        return this;
    }

    /**
     * @param sService Use this to transmit the shipping service of the order
     *
     * @return MappIntelligenceOrder
     */
    public setShippingService(sService: string): Order {
        this.shippingService = sService;

        return this;
    }

    /**
     * @param sSpeed Use this to transmit the shipping speed of the order
     *
     * @return MappIntelligenceOrder
     */
    public setShippingSpeed(sSpeed: string): Order {
        this.shippingSpeed = sSpeed;

        return this;
    }

    /**
     * @param sCosts Use this to transmit the shipping costs of the order
     *
     * @return MappIntelligenceOrder
     */
    public setShippingCosts(sCosts: number): Order {
        this.shippingCosts = sCosts;

        return this;
    }

    /**
     * @param gMargin Use this to transmit the margin/mark-up of the order
     *
     * @return MappIntelligenceOrder
     */
    public setGrossMargin(gMargin: number): Order {
        this.grossMargin = gMargin;

        return this;
    }

    /**
     * @param oStatus Use this to transmit the order status of the order
     *
     * @return MappIntelligenceOrder
     */
    public setOrderStatus(oStatus: string): Order {
        this.orderStatus = oStatus;

        return this;
    }

    /**
     * You can use parameters to enrich analytical data with your own website-specific information and/or metrics.
     * Observe the syntax guidelines when defining parameters.
     *
     * @param i ID of the parameter
     * @param v Value of the parameter
     * @return MappIntelligenceOrder
     */
    public setParameter(i: number, v: string): Order {
        this.parameter[i] = v;

        return this;
    }
}
