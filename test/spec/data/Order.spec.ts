import {MappIntelligenceOrder} from '../../../src/MappIntelligence';

describe('MappIntelligenceOrder', () => {
    it('new order without value', async () => {
        const order = new MappIntelligenceOrder();

        const data: { [key: string]: string } = order.getData();
        expect(0.0).toBe(data['value']);
    });

    it('new order with value', async () => {
        const order = new MappIntelligenceOrder(24.95);

        const data: { [key: string]: string } = order.getData();
        expect(24.95).toBe(data['value']);
    });

    it('get default', async () => {
        const order = new MappIntelligenceOrder();

        const data: { [key: string]: string } = order.getData();
        expect(0.0).toBe(data['value']);
        expect("").toBe(data['id']);
        expect("").toBe(data['currency']);
        expect(0.0).toBe(data['couponValue']);
        expect("").toBe(data['paymentMethod']);
        expect("").toBe(data['shippingService']);
        expect("").toBe(data['shippingSpeed']);
        expect(0.0).toBe(data['shippingCosts']);
        expect(0.0).toBe(data['grossMargin']);
        expect("").toBe(data['orderStatus']);
        expect(0).toBe(Object.keys(data["parameter"]).length);
    });

    it('set parameter', async () => {
        const order = new MappIntelligenceOrder();
        order.setParameter(2, "foo");
        order.setParameter(15, "bar");

        const data: { [key: string]: string } = order.getData();
        expect("foo").toBe(data["parameter"][2]);
        expect("bar").toBe(data["parameter"][15]);
    });

    it('set value', async () => {
        const order = new MappIntelligenceOrder();
        order.setValue(24.95);

        const data: { [key: string]: string } = order.getData();
        expect(24.95).toBe(data['value']);
    });

    it('set coupon value', async () => {
        const order = new MappIntelligenceOrder();
        order.setCouponValue(10.99);

        const data: { [key: string]: string } = order.getData();
        expect(10.99).toBe(data['couponValue']);
    });

    it('set payment method', async () => {
        const order = new MappIntelligenceOrder();
        order.setPaymentMethod("paypal");

        const data: { [key: string]: string } = order.getData();
        expect("paypal").toBe(data['paymentMethod']);
    });

    it('set order status', async () => {
        const order = new MappIntelligenceOrder();
        order.setOrderStatus("payed");

        const data: { [key: string]: string } = order.getData();
        expect("payed").toBe(data['orderStatus']);
    });

    it('set id', async () => {
        const order = new MappIntelligenceOrder();
        order.setId("ABC123");

        const data: { [key: string]: string } = order.getData();
        expect("ABC123").toBe(data['id']);
    });

    it('set gross margin', async () => {
        const order = new MappIntelligenceOrder();
        order.setGrossMargin(6.95);

        const data: { [key: string]: string } = order.getData();
        expect(6.95).toBe(data['grossMargin']);
    });

    it('set shipping service', async () => {
        const order = new MappIntelligenceOrder();
        order.setShippingService("dhl");

        const data: { [key: string]: string } = order.getData();
        expect("dhl").toBe(data['shippingService']);
    });

    it('set shipping speed', async () => {
        const order = new MappIntelligenceOrder();
        order.setShippingSpeed("2d");

        const data: { [key: string]: string } = order.getData();
        expect("2d").toBe(data['shippingSpeed']);
    });

    it('set shipping costs', async () => {
        const order = new MappIntelligenceOrder();
        order.setShippingCosts(3.95);

        const data: { [key: string]: string } = order.getData();
        expect(3.95).toBe(data['shippingCosts']);
    });

    it('set currency', async () => {
        const order = new MappIntelligenceOrder();
        order.setCurrency("EUR");

        const data: { [key: string]: string } = order.getData();
        expect("EUR").toBe(data['currency']);
    });

    it('get query parameter', async () => {
        const order = new MappIntelligenceOrder();
        order.setValue(24.95)
            .setCouponValue(10.99)
            .setPaymentMethod("paypal")
            .setOrderStatus("payed")
            .setId("ABC123")
            .setGrossMargin(6.95)
            .setShippingService("dhl")
            .setShippingSpeed("2d")
            .setShippingCosts(3.95)
            .setCurrency("EUR")
            .setParameter(2, "param2")
            .setParameter(15, "param15");

        const data: { [key: string]: string } = order.getQueryParameter();
        expect("24.95").toBe(data['ov']);
        expect("ABC123").toBe(data['oi']);
        expect("EUR").toBe(data['cr']);
        expect("10.99").toBe(data['cb563']);
        expect("paypal").toBe(data['cb761']);
        expect("dhl").toBe(data['cb762']);
        expect("2d").toBe(data['cb763']);
        expect("3.95").toBe(data['cb764']);
        expect("6.95").toBe(data['cb765']);
        expect("payed").toBe(data['cb766']);
        expect("param2").toBe(data['cb2']);
        expect("param15").toBe(data['cb15']);
    });

    it('get default query parameter', async () => {
        const order = new MappIntelligenceOrder();
        order.setCurrency(null);

        const data: { [key: string]: string } = order.getQueryParameter();
        expect(0).toBe(Object.keys(data).length);
    });
});
