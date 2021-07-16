import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil'
import {
    IMappIntelligenceCookie,
    MappIntelligenceTracking,
    MappIntelligenceConfig,
    MappIntelligenceParameterMap,
    MappIntelligenceDataMap,
    MappIntelligenceProductCollection,
    MappIntelligencePage,
    MappIntelligenceAction,
    MappIntelligenceCampaign,
    MappIntelligenceCustomer,
    MappIntelligenceProduct,
    MappIntelligenceSession,
    MappIntelligenceOrder,
    MappIntelligenceParameter,
    MappIntelligenceCustomParameter
} from '../../../src/MappIntelligence';

describe('MappIntelligenceTracking', () => {
    let customLogger: CustomLogger;
    let events: { [event: string]: (...args: any[]) => void } = {};

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();

        jest.spyOn(process, 'on').mockImplementation((event: string, listener: (...args: any[]) => void) => {
            events[event] = listener;
            return process;
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('trackId and trackDomain are required', async () => {
        const mic = (new MappIntelligenceConfig())
            .setDebug(true);

        const mit = new MappIntelligenceTracking(mic);

        const result = await mit.track((new MappIntelligenceParameterMap()).add('pn', 'en.page.test'));
        expect(result).toBeFalsy();
    });

    it('trackId is required', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackDomain('analytics01.wt-eu02.net')
            .setLogger(customLogger);

        const mit = new MappIntelligenceTracking(mic);

        const result = await mit.track((new MappIntelligenceParameterMap()).add('pn', 'en.page.test'));
        expect(result).toBeFalsy();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to track data');
    });

    it('trackDomain is required', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackId('111111111111111')
            .setLogger(customLogger);

        const mit = new MappIntelligenceTracking(mic);

        const result = await mit.track((new MappIntelligenceParameterMap()).add('pn', 'en.page.test'));
        expect(result).toBeFalsy();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to track data');
    });

    it('empty data', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        const result = await mit.track(new MappIntelligenceParameterMap());
        expect(result).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,&.+/);
    });

    it('empty track', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        const result = await mit.track();
        expect(result).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,&.+/);
    });

    it('tracking is deactivated', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setDeactivate(true);

        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.flush()).toBeTruthy();
        expect(await mit.track((new MappIntelligenceParameterMap()).add('pn', 'en.page.test'))).toBeFalsy();
        expect(customLogger.getMessages()).toContain('Mapp Intelligence tracking is deactivated');
    });

    it('simple data - 1', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track(null)).toBeTruthy();
        expect(await mit.track(true)).toBeFalsy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,&.+/);
    });

    it('simple data - 2', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        mic.setDeactivate(true);
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track(null)).toBeFalsy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(0);
    });

    it('simple data - 3', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track((new MappIntelligenceParameterMap())
            .add(MappIntelligenceParameter.PAGE_NAME, "en.page.test")
        )).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,en\.page\.test,,,,,[0-9]{13},0,,&.+/);
    });

    it('simple data - 4', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track((new MappIntelligenceParameterMap())
            .add(MappIntelligenceParameter.PAGE_NAME, "en.page.test")
            .add(MappIntelligenceCustomParameter.CUSTOM_PAGE_CATEGORY.with(1), "page.test")
            .add(MappIntelligenceCustomParameter.CUSTOM_PAGE_CATEGORY.with(2), "en")
            .add(MappIntelligenceCustomParameter.CUSTOM_PAGE_CATEGORY.with(3), "page")
            .add(MappIntelligenceCustomParameter.CUSTOM_PAGE_CATEGORY.with(4), "test")
            .add(MappIntelligenceParameter.ORDER_VALUE, "360.93")
            .add(MappIntelligenceParameter.CUSTOMER_ID, "24")
            .add(MappIntelligenceParameter.FIRST_NAME, "John")
            .add(MappIntelligenceParameter.LAST_NAME, "Doe")
            .add(MappIntelligenceParameter.EMAIL, "john@doe.com")
            .add(MappIntelligenceCustomParameter.CUSTOM_SESSION_PARAMETER.with(1), "1")
            .add(MappIntelligenceParameter.PRODUCT_ID, "065ee2b001;085eo2f009;995ee1k906")
            .add(MappIntelligenceParameter.PRODUCT_COST, "59.99;49.99;15.99")
            .add(MappIntelligenceParameter.PRODUCT_QUANTITY, "1;5;1")
            .add(MappIntelligenceParameter.PRODUCT_STATUS, "conf")
        )).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);

        const request: string = requests[0];
        expect(request).toMatch(/^wt\?p=600,en\.page\.test,,,,,[0-9]{13},0,,&.*/);
        expect(request).toMatch(/.*&cg1=page\.test.*/);
        expect(request).toMatch(/.*&cg2=en.*/);
        expect(request).toMatch(/.*&cg3=page.*/);
        expect(request).toMatch(/.*&cg4=test.*/);
        expect(request).toMatch(/.*&ov=360\.93.*/);
        expect(request).toMatch(/.*&cd=24.*/);
        expect(request).toMatch(/.*&uc703=John.*/);
        expect(request).toMatch(/.*&uc704=Doe.*/);
        expect(request).toMatch(/.*&uc700=john%40doe\.com.*/);
        expect(request).toMatch(/.*&cs1=1.*/);
        expect(request).toMatch(/.*&ba=065ee2b001%3B085eo2f009%3B995ee1k906.*/);
        expect(request).toMatch(/.*&co=59\.99%3B49\.99%3B15\.99.*/);
        expect(request).toMatch(/.*&qn=1%3B5%3B1.*/);
        expect(request).toMatch(/.*&st=conf.*/);
    });

    it('data object - 1', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track((new MappIntelligenceDataMap())
            .page(new MappIntelligencePage("en.page.test"))
        )).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,en\.page\.test,,,,,[0-9]{13},0,,&.+/);
    });

    it('data object - 2', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        const page = (new MappIntelligencePage("en.page.test"))
            .setCategory(1, "page.test")
            .setCategory(2, "en")
            .setCategory(3, "page")
            .setCategory(4, "test");

        const session = (new MappIntelligenceSession())
            .setParameter(1, "1");

        const customer = (new MappIntelligenceCustomer("24"))
            .setFirstName("John")
            .setLastName("Doe")
            .setCustomIdentifier("foo")
            .setEmail("john@doe.com");

        const product1 = (new MappIntelligenceProduct("065ee2b001"))
            .setCost(59.99)
            .setQuantity(1)
            .setStatus(MappIntelligenceProduct.CONFIRMATION);

        const product2 = (new MappIntelligenceProduct("085eo2f009"))
            .setCost(49.99)
            .setQuantity(5)
            .setStatus(MappIntelligenceProduct.CONFIRMATION);

        const product3 = (new MappIntelligenceProduct("995ee1k906"))
            .setCost(15.99)
            .setQuantity(1)
            .setStatus(MappIntelligenceProduct.CONFIRMATION);

        const product4 = (new MappIntelligenceProduct("abc"))
            .setCost(0)
            .setQuantity(0)
            .setSoldOut(true)
            .setVariant('false')
            .setStatus(MappIntelligenceProduct.CONFIRMATION);

        expect(await mit.track((new MappIntelligenceDataMap())
            .action(new MappIntelligenceAction("webtrekk_ignore"))
            .page(page)
            .campaign(new MappIntelligenceCampaign("wt_mc%3Dfoo.bar"))
            .order(new MappIntelligenceOrder(360.93))
            .session(session)
            .customer(customer)
            .product((new MappIntelligenceProductCollection())
                .add(product1).add(product2).add(product3).add(product4)
            )
        )).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);

        const request: string = requests[0];
        expect(request).toMatch(/^wt\?p=600,en\.page\.test,,,,,[0-9]{13},0,,&.*/);
        expect(request).toMatch(/.*&cg1=page\.test.*/);
        expect(request).toMatch(/.*&cg2=en.*/);
        expect(request).toMatch(/.*&cg3=page.*/);
        expect(request).toMatch(/.*&cg4=test.*/);
        expect(request).toMatch(/.*&ov=360\.93.*/);
        expect(request).toMatch(/.*&cd=24.*/);
        expect(request).toMatch(/.*&uc703=John.*/);
        expect(request).toMatch(/.*&uc704=Doe.*/);
        expect(request).toMatch(/.*&uc700=john%40doe\.com.*/);
        expect(request).toMatch(/.*&cs1=1.*/);
        expect(request).toMatch(/.*&ba=065ee2b001%3B085eo2f009%3B995ee1k906.*/);
        expect(request).toMatch(/.*&co=59\.99%3B49\.99%3B15\.99.*/);
        expect(request).toMatch(/.*&qn=1%3B5%3B1.*/);
        expect(request).toMatch(/.*&st=conf.*/);
        expect(request).toMatch(/.*&cb767=%3B%3B%3B0.*/);
    });

    it('data object - 3', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track((new MappIntelligenceDataMap())
            .action(null)
            .page(null)
            .campaign(null)
            .order(null)
            .session(null)
            .customer(null)
            .product(null)
        )).toBeTruthy();

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(mit);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,&.+/);
    });

    it('set userId failed - 1', async () => {
        const mic = (new MappIntelligenceConfig())
            .setLogger(customLogger);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to get user cookie');
    });

    it('set userId failed - 2', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackId('111111111111111')
            .setLogger(customLogger);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to get user cookie');
    });

    it('set userId failed - 3', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackDomain('analytics01.wt-eu02.net')
            .setLogger(customLogger);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to get user cookie');
    });

    it('existing SmartPixel everId', async () => {
        const smartPixelEverId: string = "2157070685656224066";
        const cookies = {
            wtstp_eid: smartPixelEverId,
            foo: 'bar',
            v: '%FC%F6%E4',
            null: null
        };

        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .setCookie(cookies);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('existing server everId', async () => {
        const serverEverId: string = '2157070685656224066';

        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .addCookie('wteid_111111111111111', serverEverId);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('existing V4 everId', async () => {
        const v4EverId: string = ';111111111111111|2157070685656224066';

        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .addCookie('wt3_eid', v4EverId);
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('ignore server side everId with MappIntelligence trackDomain', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.SERVER_SIDE_COOKIE)).toBeNull();
    });

    it('ignore not supported pixel version', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(mit.getUserIdCookie('v3', MappIntelligenceTracking.SERVER_SIDE_COOKIE)).toBeNull();
        expect(mit.getUserIdCookie('', MappIntelligenceTracking.SERVER_SIDE_COOKIE)).toBeNull();
    });

    it('null cookie', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .setCookie(null);
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wtstp_eid');
        expect(cookie.getValue()).toMatch(/^8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('server side everId', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld');
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.SERVER_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wteid_111111111111111');
        expect(cookie.getValue()).toMatch(/^8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('domain.tld');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('new v4 client side everId', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld');
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.V4, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wt3_eid');
        expect(cookie.getValue()).toMatch(/^;111111111111111\|8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('append v4 client side everId', async () => {
        let oldPixelEverIdCookie: string = '';
        oldPixelEverIdCookie += ';385255285199574|2155991359000202180#2157830383874881775';
        oldPixelEverIdCookie += ';222222222222222|2155991359353080227#2157830383339928168';
        oldPixelEverIdCookie += ';100000020686800|2155991359000202180#2156076321300417449';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld'))
            .addCookie("wt3_eid", oldPixelEverIdCookie);
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.V4, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wt3_eid');
        expect(cookie.getValue()).toMatch(new RegExp(`^${oldPixelEverIdCookie.replace(/\|/, '\\|')};111111111111111\|8[0-9]{18}$`));
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('new v5 client side everId', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld');
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.V5, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wt3_eid');
        expect(cookie.getValue()).toMatch(/^;111111111111111\|8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('append v5 client side everId', async () => {
        let oldPixelEverIdCookie: string = '';
        oldPixelEverIdCookie += ';385255285199574|2155991359000202180#2157830383874881775';
        oldPixelEverIdCookie += ';222222222222222|2155991359353080227#2157830383339928168';
        oldPixelEverIdCookie += ';100000020686800|2155991359000202180#2156076321300417449';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld'))
            .addCookie("wt3_eid", oldPixelEverIdCookie);
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.V5, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wt3_eid');
        expect(cookie.getValue()).toMatch(new RegExp(`^${oldPixelEverIdCookie.replace(/\|/, '\\|')};111111111111111\|8[0-9]{18}$`));
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('new SmartPixel client side everId', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics.domain.tld');
        const mit = new MappIntelligenceTracking(mic);

        const cookie: IMappIntelligenceCookie = mit.getUserIdCookie(MappIntelligenceTracking.SMART, MappIntelligenceTracking.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wtstp_eid');
        expect(cookie.getValue()).toMatch(/^8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('exit process', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mit = new MappIntelligenceTracking(mic);

        expect(await mit.track((new MappIntelligenceParameterMap())
            .add(MappIntelligenceParameter.PAGE_NAME, "en.page.test")
        )).toBeTruthy();

        await events.exit();
    });
});
