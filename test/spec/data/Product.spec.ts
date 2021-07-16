import {MappIntelligenceProduct} from '../../../src/MappIntelligence';

describe('MappIntelligenceProduct', () => {
    it('new product without id', async () => {
        const product = new MappIntelligenceProduct();

        const data: { [key: string]: any } = product.getData();
        expect('').toBe(data['id']);
    });

    it('new product with id', async () => {
        const product = new MappIntelligenceProduct('foo.bar');

        const data: { [key: string]: any } = product.getData();
        expect('foo.bar').toBe(data['id']);
    });

    it('get default', async () => {
        const product = new MappIntelligenceProduct();

        const data: { [key: string]: any } = product.getData();
        expect('').toBe(data['id']);
        expect(0.0).toBe(data['cost']);
        expect(0).toBe(data['quantity']);
        expect('view').toBe(data['status']);
        expect('').toBe(data['variant']);
        expect(false).toBe(data['soldOut']);
        expect(0).toBe(Object.keys(data['parameter']).length);
        expect(0).toBe(Object.keys(data['category']).length);
    });

    it('set status default', async () => {
        const product = new MappIntelligenceProduct();
        product.setStatus('wishlist');

        const data: { [key: string]: any } = product.getData();
        expect('view').toBe(data['status']);
    });

    it('set status view', async () => {
        const product = new MappIntelligenceProduct();
        product.setStatus(MappIntelligenceProduct.VIEW);

        const data: { [key: string]: any } = product.getData();
        expect('view').toBe(data['status']);
    });

    it('set status basket', async () => {
        const product = new MappIntelligenceProduct();
        product.setStatus(MappIntelligenceProduct.BASKET);

        const data: { [key: string]: any } = product.getData();
        expect('add').toBe(data['status']);
    });

    it('set status confirmation', async () => {
        const product = new MappIntelligenceProduct();
        product.setStatus(MappIntelligenceProduct.CONFIRMATION);

        const data: { [key: string]: any } = product.getData();
        expect('conf').toBe(data['status']);
    });

    it('set parameter', async () => {
        const product = new MappIntelligenceProduct();
        product.setParameter(2, 'foo');
        product.setParameter(15, 'bar');

        const data: { [key: string]: any } = product.getData();
        expect('foo').toBe(data['parameter'][2]);
        expect('bar').toBe(data['parameter'][15]);
    });

    it('set variant', async () => {
        const product = new MappIntelligenceProduct();
        product.setVariant('red');

        const data: { [key: string]: any } = product.getData();
        expect('red').toBe(data['variant']);
    });

    it('set quantity', async () => {
        const product = new MappIntelligenceProduct();
        product.setQuantity(5);

        const data: { [key: string]: any } = product.getData();
        expect(5).toBe(data['quantity']);
    });

    it('set id', async () => {
        const product = new MappIntelligenceProduct();
        product.setId('id of a product');

        const data: { [key: string]: any } = product.getData();
        expect('id of a product').toBe(data['id']);
    });

    it('set category', async () => {
        const product = new MappIntelligenceProduct();
        product.setCategory(2, 'foo');
        product.setCategory(15, 'bar');

        const data: { [key: string]: any } = product.getData();
        expect('foo').toBe(data['category'][2]);
        expect('bar').toBe(data['category'][15]);
    });

    it('set sold out', async () => {
        const product = new MappIntelligenceProduct();
        product.setSoldOut(true);

        const data: { [key: string]: any } = product.getData();
        expect(true).toBe(data['soldOut']);
    });

    it('set cost', async () => {
        const product = new MappIntelligenceProduct();
        product.setCost(19.95);

        const data: { [key: string]: any } = product.getData();
        expect(19.95).toBe(data['cost']);
    });

    it('get query parameter', async () => {
        const product = new MappIntelligenceProduct();
        product.setStatus('add')
            .setVariant('red')
            .setQuantity(5)
            .setId('id of a product')
            .setSoldOut(true)
            .setCost(19.95)
            .setParameter(2, 'parameter 2')
            .setParameter(15, 'parameter 15')
            .setCategory(2, 'category 2')
            .setCategory(15, 'category 15');

        const data: { [key: string]: string } = product.getQueryParameter();
        expect('add').toBe(data['st']);
        expect('red').toBe(data['cb767']);
        expect('5').toBe(data['qn']);
        expect('id of a product').toBe(data['ba']);
        expect('true').toBe(data['cb760']);
        expect('19.95').toBe(data['co']);
        expect('parameter 2').toBe(data['cb2']);
        expect('parameter 15').toBe(data['cb15']);
        expect('category 2').toBe(data['ca2']);
        expect('category 15').toBe(data['ca15']);
    });

    it('get default query parameter', async () => {
        const product = new MappIntelligenceProduct();

        const data: { [key: string]: string } = product.getQueryParameter();
        expect('').toBe(data['ba']);
        expect('0').toBe(data['co']);
        expect('0').toBe(data['qn']);
        expect('view').toBe(data['st']);
        expect('').toBe(data['cb767']);
        expect('false').toBe(data['cb760']);
    });
});
