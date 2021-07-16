import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil';
import {
    MappIntelligenceConfig,
    MappIntelligenceQueue,
    MappIntelligenceParameterMap,
    MappIntelligenceConsumerType, IMappIntelligenceConsumer
} from '../../../src/MappIntelligence';

class TestCustomConsumer implements IMappIntelligenceConsumer {
    private requests: Array<string> = [];

    public sendBatch(batchContent: Array<string>): Promise<boolean> {
        const that = this;
        return new Promise(async function(resolve) {
            for (const request of batchContent) {
                that.requests.push(request);
            }

            resolve(true);
        });
    }

    public getRequests(): Array<string> {
        return this.requests;
    }
}

describe('MappIntelligenceQueue', () => {
    let customLogger: CustomLogger;

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();
    });

    it('add tracking request', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        mic.setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=300,0.*/);
    });

    it('add empty string tracking data - 1', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        mic.setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(0);
    });

    it('add empty string tracking data - 2', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        mic.setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add(false);

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(0);
    });

    it('add empty tracking data', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        mic.setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({'': 'test123'});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,.*/);
    });

    it('max batch size - 1', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setMaxBatchSize(10);

        const queue = new MappIntelligenceQueue(mic.build());

        for (let i = 0; i < 15; i++) {
            await queue.add((new MappIntelligenceParameterMap()).add('pn', i + '').build());
        }

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 10 req.');
        expect(message).toContain('Sent batch requests, current queue size is 11 req.');
        expect(message).toContain('Sent batch requests, current queue size is 12 req.');
        expect(message).toContain('Sent batch requests, current queue size is 13 req.');
        expect(message).toContain('Sent batch requests, current queue size is 14 req.');
        expect(message).toContain('Sent batch requests, current queue size is 15 req.');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(15);
        for (let i = 0; i < 15; i++) {
            expect(requests[i]).toMatch(new RegExp('^wt\\?p=600,' + i + ',,,,,[0-9]{13},0,,.*'));
        }
    });

    it('max batch size - 2', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setMaxBatchSize(10);

        const queue = new MappIntelligenceQueue(mic.build());

        for (let i = 0; i < 15; i++) {
            await queue.add('wt?p=300,' + i);
        }

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 10 req.');
        expect(message).toContain('Sent batch requests, current queue size is 11 req.');
        expect(message).toContain('Sent batch requests, current queue size is 12 req.');
        expect(message).toContain('Sent batch requests, current queue size is 13 req.');
        expect(message).toContain('Sent batch requests, current queue size is 14 req.');
        expect(message).toContain('Sent batch requests, current queue size is 15 req.');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(15);
        for (let i = 0; i < 15; i++) {
            expect(requests[i]).toContain('wt?p=300,' + i);
        }
    });

    it('with user agent - 1', async () => {
        const userAgent: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setUserAgent(userAgent);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,.*/);
        expect(requests[0]).toMatch(
            new RegExp('.+&X-WT-UA=' + encodeURIComponent(userAgent).replace(/([.()])/ig, '\\$1') + '.*')
        );
    });

    it('with user agent - 2', async () => {
        const userAgent: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setUserAgent(userAgent);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=300,0&.+/);
        expect(requests[0]).toMatch(
            new RegExp('.+&X-WT-UA=' + encodeURIComponent(userAgent).replace(/([.()])/ig, '\\$1') + '.*')
        );
    });

    it('with user agent - 3', async () => {
        const userAgent: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setUserAgent(userAgent);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0&X-WT-UA=test');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=300,0&.+/);
        expect(requests[0]).toMatch(/.+&X-WT-UA=test$/);
    });

    it('with remote addr - 1', async () => {
        const remoteAddr: string = '127.0.0.1';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRemoteAddress(remoteAddr);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},0,,.*/);
        expect(requests[0]).toMatch(/.+&X-WT-IP=127\.0\.0\.1$/);
    });

    it('with remote addr - 2', async () => {
        const remoteAddr: string = '127.0.0.1';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRemoteAddress(remoteAddr);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0&X-WT-UA=test');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=300,0&.+/);
        expect(requests[0]).toMatch(/.+&X-WT-IP=127\.0\.0\.1$/);
    });

    it('with remote addr - 3', async () => {
        const remoteAddr: string = '127.0.0.1';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRemoteAddress(remoteAddr);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0&X-WT-IP=127.0.0.20');

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=300,0&.+/);
        expect(requests[0]).toMatch(/.+&X-WT-IP=127\.0\.0\.20$/);
    });

    it('with request URI', async () => {
        const requestURL: string = 'https://sub.domain.tld/path/to/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRequestURL(requestURL);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,sub\.domain\.tld%2Fpath%2Fto%2Fpage\.html,,,,,[0-9]{13},0,,&.+/);
        expect(requests[0]).toMatch(
            new RegExp('.+&pu=' + encodeURIComponent(requestURL).replace(/([.])/ig, '\\$1') + '.*')
        );
    });

    it('with SmartPixel everId', async () => {
        const smartPixelEverId: string = '2157070685656224066';
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .addCookie('wtstp_eid', smartPixelEverId)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp('.+&eid=' + smartPixelEverId + '.*'));
    });

    it('with track server everId', async () => {
        const trackServerEverId: string = '6157070685656224066';
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .addCookie('wteid_111111111111111', trackServerEverId)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp('.+&eid=' + trackServerEverId + '.*'));
    });

    it('without old Pixel everId', async () => {
        let oldPixelEverIdCookie: string = ';385255285199574|2155991359000202180#2157830383874881775';
        oldPixelEverIdCookie += ';222222222222222|2155991359353080227#2157830383339928168';
        oldPixelEverIdCookie += ';100000020686800|2155991359000202180#2156076321300417449';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .addCookie('wt3_eid', oldPixelEverIdCookie)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).not.toMatch(/.+&eid=.+/);
    });

    it('with old Pixel everId', async () => {
        const oldPixelEverId: string = '2155991359353080227';
        let oldPixelEverIdCookie: string = ';385255285199574|2155991359000202180#2157830383874881775';
        oldPixelEverIdCookie += ';111111111111111|' + oldPixelEverId + '#2157830383339928168';
        oldPixelEverIdCookie += ';100000020686800|2155991359000202180#2156076321300417449';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .addCookie('wt3_eid', oldPixelEverIdCookie)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp('.+&eid=' + oldPixelEverId + '.*'));
    });

    it('default page name', async () => {
        const requestURL: string = 'https://sub.domain.tld/path/to/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRequestURL(requestURL);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp(/^wt\?p=600,sub\.domain\.tld%2Fpath%2Fto%2Fpage\.html,,,,,[0-9]{13},0,,&.+/));
        expect(requests[0]).toMatch(
            new RegExp('.+&pu=' + encodeURIComponent(requestURL).replace(/([.])/ig, '\\$1') + '.*')
        );
    });

    it('default page name without params - 1', async () => {
        const requestURL: string = 'https://sub.domain.tld/path/to/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRequestURL(requestURL)
            .addUseParamsForDefaultPageName('aa')
            .addUseParamsForDefaultPageName('bb')
            .addUseParamsForDefaultPageName('cc');

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp(/^wt\?p=600,sub\.domain\.tld%2Fpath%2Fto%2Fpage\.html,,,,,[0-9]{13},0,,&.+/));
        expect(requests[0]).toMatch(
            new RegExp('.+&pu=' + encodeURIComponent(requestURL).replace(/([.])/ig, '\\$1') + '.*')
        );
    });

    it('default page name without params - 2', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .addUseParamsForDefaultPageName('aa')
            .addUseParamsForDefaultPageName('bb')
            .addUseParamsForDefaultPageName('cc');

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp(/^wt\?p=600,0,,,,,[0-9]{13},0,,.*/));
        expect(requests[0]).not.toMatch(/.+&pu=.+/);
    });

    it('default page name with params', async () => {
        const requestURL: string = 'https://sub.domain.tld/path/to/page.html?bb=value%20bb&cc=value%20cc';
        const pageNameRegExp: string = 'sub\\.domain\\.tld' + encodeURIComponent('/path/to/page.html?bb=value bb&cc=value cc');

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setRequestURL(requestURL)
            .addUseParamsForDefaultPageName('aa')
            .addUseParamsForDefaultPageName('bb')
            .addUseParamsForDefaultPageName('cc');

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp('^wt\\?p=600,' + pageNameRegExp + ',,,,,[0-9]{13},0,,&.+'));
        expect(requests[0]).toMatch(new RegExp('.+&pu=https%3A%2F%2F' + pageNameRegExp + '.*'));
    });

    it('empty referrer', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(new RegExp(/^wt\?p=600,0,,,,,[0-9]{13},0,,.*/));
    });

    it('referrer not equals own domain', async () => {
        const referrerURL: string = 'https://sub.domain.tld/path/to/previous/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(
            new RegExp('^wt\\?p=600,0,,,,,[0-9]{13},' + encodeURIComponent(referrerURL).replace(/([.])/ig, '\\$1') + ',,.*')
        );
    });

    it('invalid referrer - 1', async () => {
        const referrerURL: string = 'foo.bar';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL)
            .setDomain(['sub.domain.tld']);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(
            new RegExp('^wt\\?p=600,0,,,,,[0-9]{13},' + encodeURIComponent(referrerURL).replace(/([.])/ig, '\\$1') + ',,.*')
        );
    });

    it('invalid referrer - 2', async () => {
        const referrerURL: string = 'foo.bar';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},1,,.*/);
    });

    it('referrer equals own domain - 1', async () => {
        const referrerURL: string = 'https://sub.domain.tld/path/to/previous/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL)
            .setDomain(['sub.domain.tld']);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},1,,.*/);
    });

    it('referrer equals own domain - 2', async () => {
        const referrerURL: string = 'https://sub.domain.tld/path/to/previous/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL)
            .setDomain([/.+\.domain\.tld/]);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(/^wt\?p=600,0,,,,,[0-9]{13},1,,.*/);
    });

    it('referrer equals own domain - 3', async () => {
        const referrerURL: string = 'https://sub.domain.tld/path/to/previous/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL)
            .setDomain([/[a-z]{3}\.domain\.tld\)/]);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(
            new RegExp('^wt\\?p=600,0,,,,,[0-9]{13},' + encodeURIComponent(referrerURL).replace(/([.])/ig, '\\$1') + ',,.*')
        );
    });

    it('referrer equals own domain - 4', async () => {
        const referrerURL: string = 'https://sub.domain.tld/path/to/previous/page.html';

        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger)
            .setReferrerURL(referrerURL)
            .setDomain(['subsub.domain.tld']);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add({});

        const requests: Array<string> = MappIntelligenceUnitUtil.getQueue(queue);
        expect(requests.length).toBe(1);
        expect(requests[0]).toMatch(
            new RegExp('^wt\\?p=600,0,,,,,[0-9]{13},' + encodeURIComponent(referrerURL).replace(/([.])/ig, '\\$1') + ',,.*')
        );
    });

    it('flush empty queue', async () => {
        const mic = new MappIntelligenceConfig();

        const queue = new MappIntelligenceQueue(mic.build());

        expect(await queue.flush()).toBeTruthy();
    });

    it('undefined consumer type', async () => {
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType('PRINT')
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');

        expect(await queue.flush()).toBeFalsy();
    });

    it('flush empty queue with debug', async () => {
        const mic = (new MappIntelligenceConfig())
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());

        expect(await queue.flush()).toBeTruthy();

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');
    });

    it('flush queue failed', async () => {
        const mic = (new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');

        expect(await queue.flush()).toBeFalsy();

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 1 req.');
        expect(message).toContain('Send batch data to analytics01.wt-eu02.net (1 req.)');
        expect(message).toContain('Batch request responding the status code 404');
        expect(message).toContain('Batch request failed!');
        expect(message).toContain('Batch of 1 req. sent, current queue size is 1 req.');
    });

    it('flush HTTP queue success', async () => {
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');

        expect(await queue.flush()).toBeTruthy();

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 5 req.');
        expect(message).toContain('Send batch data to analytics01.wt-eu02.net (5 req.)');
        expect(message).toContain('Batch request responding the status code 200');
        expect(message).toContain('Batch of 5 req. sent, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');
    });

    it('flush cURL queue success', async () => {
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType(MappIntelligenceConsumerType.FORK_CURL)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');

        expect(await queue.flush()).toBeTruthy();

        const message: string = customLogger.getMessages();
        expect(message).toContain('Sent batch requests, current queue size is 5 req.');
        expect(message).toContain('Send batch data to https://analytics01.wt-eu02.net/123451234512345/batch (5 req.)');
        expect(message).toContain('Batch request responding the status code 200');
        expect(message).toContain('Batch of 5 req. sent, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');
    });

    it('flush file queue success', async () => {
        const tempFilePath: string = process.cwd() + '/test/resources/';
        const tempFilePrefix: string = 'mapp_intelligence_test';

        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType(MappIntelligenceConsumerType.FILE)
            .setFilePath(tempFilePath)
            .setFilePrefix(tempFilePrefix)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,0');

        await queue.flush();

        const message: string = customLogger.getMessages();
        expect(message).toContain('Create new file mapp_intelligence_test');
        expect(message).toContain('Add the following request to queue (1 req.)');
        expect(message).toContain('Sent batch requests, current queue size is 1 req.');
        expect(message).toContain('Write batch data in mapp_intelligence_test');
        expect(message).toContain('Batch of 1 req. sent, current queue size is 0 req.');
        expect(message).toContain('MappIntelligenceQueue is empty');

        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.tmp');
        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.log');
    });

    it('custom consumer', async () => {
        const tcc = new TestCustomConsumer();
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType(MappIntelligenceConsumerType.CUSTOM)
            .setConsumer(tcc)
            .setLogger(customLogger);

        const queue = new MappIntelligenceQueue(mic.build());
        await queue.add('wt?p=300,0');
        await queue.add('wt?p=300,1');
        await queue.add('wt?p=300,2');
        await queue.add('wt?p=300,3');
        await queue.add('wt?p=300,4');

        expect(await queue.flush()).toBeTruthy();

        const requests: string = tcc.getRequests().join(',');
        expect(requests).toContain('wt?p=300,0');
        expect(requests).toContain('wt?p=300,1');
        expect(requests).toContain('wt?p=300,2');
        expect(requests).toContain('wt?p=300,3');
        expect(requests).toContain('wt?p=300,4');
    });
});
