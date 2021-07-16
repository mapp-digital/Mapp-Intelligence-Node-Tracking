import {MappIntelligenceCustomer} from '../../../src/MappIntelligence';

describe('MappIntelligenceCustomer', () => {
    it('new customer without id', async () => {
        const customer = new MappIntelligenceCustomer();

        const data: { [key: string]: any } = customer.getData();
        expect('').toBe(data['id']);
    });

    it('new customer with id', async () => {
        const customer = new MappIntelligenceCustomer('24');

        const data: { [key: string]: any } = customer.getData();
        expect('24').toBe(data['id']);
    });

    it('get default', async () => {
        const customer = new MappIntelligenceCustomer();

        const data: { [key: string]: any } = customer.getData();
        expect('').toBe(data['id']);
        expect('').toBe(data['customIdentifier']);
        expect('').toBe(data['email']);
        expect('').toBe(data['emailRID']);
        expect(false).toBe(data['emailOptin']);
        expect('').toBe(data['firstName']);
        expect('').toBe(data['lastName']);
        expect('').toBe(data['telephone']);
        expect(0).toBe(data['gender']);
        expect('').toBe(data['birthday']);
        expect('').toBe(data['country']);
        expect('').toBe(data['city']);
        expect('').toBe(data['postalCode']);
        expect('').toBe(data['street']);
        expect('').toBe(data['streetNumber']);
        expect(false).toBe(data['validation']);
        expect(0).toBe(Object.keys(data['category']).length);
    });

    it('set custom identifier', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setCustomIdentifier('foo');

        const data: { [key: string]: any } = customer.getData();
        expect('foo').toBe(data['customIdentifier']);
    });

    it('set first name', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setFirstName('John');

        const data: { [key: string]: any } = customer.getData();
        expect('John').toBe(data['firstName']);
    });

    it('set last name', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setLastName('Doe');

        const data: { [key: string]: any } = customer.getData();
        expect('Doe').toBe(data['lastName']);
    });

    it('set street number', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setStreetNumber('4A');

        const data: { [key: string]: any } = customer.getData();
        expect('4A').toBe(data['streetNumber']);
    });

    it('set country', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setCountry('Germany');

        const data: { [key: string]: any } = customer.getData();
        expect('Germany').toBe(data['country']);
    });

    it('set postal code', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setPostalCode('12345');

        const data: { [key: string]: any } = customer.getData();
        expect('12345').toBe(data['postalCode']);
    });

    it('set email optin', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setEmailOptin(true);

        const data: { [key: string]: any } = customer.getData();
        expect(true).toBe(data['emailOptin']);
    });

    it('set id', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setId('24');

        const data: { [key: string]: any } = customer.getData();
        expect('24').toBe(data['id']);
    });

    it('set telephone', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setTelephone('+491234567890');

        const data: { [key: string]: any } = customer.getData();
        expect('+491234567890').toBe(data['telephone']);
    });

    it('set street', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setStreet('Robert-Koch-Platz');

        const data: { [key: string]: any } = customer.getData();
        expect('Robert-Koch-Platz').toBe(data['street']);
    });

    it('set gender', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setGender(1);

        const data: { [key: string]: any } = customer.getData();
        expect(1).toBe(data['gender']);
    });

    it('set email RID', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setEmailRID('ABC123-xyz789');

        const data: { [key: string]: any } = customer.getData();
        expect('ABC123-xyz789').toBe(data['emailRID']);
    });

    it('set email', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setEmail('foo@bar.com');

        const data: { [key: string]: any } = customer.getData();
        expect('foo@bar.com').toBe(data['email']);
    });

    it('set birthday', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setBirthday('19900101');

        const data: { [key: string]: any } = customer.getData();
        expect('19900101').toBe(data['birthday']);
    });

    it('set city', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setCity('Berlin');

        const data: { [key: string]: any } = customer.getData();
        expect('Berlin').toBe(data['city']);
    });

    it('set validation', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setValidation(true);

        const data: { [key: string]: any } = customer.getData();
        expect(true).toBe(data['validation']);
    });

    it('set category', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setCategory(2, 'foo');
        customer.setCategory(15, 'bar');

        const data: { [key: string]: any } = customer.getData();
        expect('foo').toBe(data['category'][2]);
        expect('bar').toBe(data['category'][15]);
    });

    it('get query parameter', async () => {
        const customer = new MappIntelligenceCustomer();
        customer.setCustomIdentifier('foo')
            .setFirstName('John')
            .setLastName('Doe')
            .setStreetNumber('4A')
            .setCountry('Germany')
            .setPostalCode('12345')
            .setEmailOptin(true)
            .setId('24')
            .setTelephone('+491234567890')
            .setStreet('Robert-Koch-Platz')
            .setGender(1)
            .setEmailRID('ABC123-xyz789')
            .setEmail('foo@bar.com')
            .setBirthday('19900101')
            .setCity('Berlin')
            .setValidation(true)
            .setCategory(2, 'category2')
            .setCategory(15, 'category15');

        const data: { [key: string]: string } = customer.getQueryParameter();
        expect('24').toBe(data['cd']);
        expect('foo').toBe(data['ceid']);
        expect('foo@bar.com').toBe(data['uc700']);
        expect('ABC123-xyz789').toBe(data['uc701']);
        expect('true').toBe(data['uc702']);
        expect('John').toBe(data['uc703']);
        expect('Doe').toBe(data['uc704']);
        expect('+491234567890').toBe(data['uc705']);
        expect('1').toBe(data['uc706']);
        expect('19900101').toBe(data['uc707']);
        expect('Germany').toBe(data['uc708']);
        expect('Berlin').toBe(data['uc709']);
        expect('12345').toBe(data['uc710']);
        expect('Robert-Koch-Platz').toBe(data['uc711']);
        expect('4A').toBe(data['uc712']);
        expect('true').toBe(data['uc713']);
        expect('category2').toBe(data['uc2']);
        expect('category15').toBe(data['uc15']);
    });

    it('get default query parameter', async () => {
        const customer = new MappIntelligenceCustomer();

        const data: { [key: string]: string } = customer.getQueryParameter();
        expect(0).toBe(Object.keys(data).length);
    });
});
