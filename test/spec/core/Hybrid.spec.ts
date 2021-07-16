import {tmpdir} from 'os';
import {MappIntelligenceUnitUtil, CustomLogger} from '../_utils/MappIntelligenceUnitUtil'
import {
    IMappIntelligenceCookie,
    IMappIntelligenceConsumer,
    MappIntelligenceHybrid,
    MappIntelligenceConfig,
    MappIntelligenceConsumerType
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

class TestCustomConsumer2 implements IMappIntelligenceConsumer {
    public sendBatch(batchContent: Array<string>): Promise<boolean> {
        return new Promise(async function(resolve, reject) {
            reject(false);
        });
    }
}

describe('MappIntelligenceHybrid', () => {
    const tempFilePath: string = tmpdir();
    const tempFilePrefix: string = 'MappIntelligenceRequests';
    let customLogger: CustomLogger;

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();
    });

    afterEach(async () => {
        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.tmp');
        await MappIntelligenceUnitUtil.deleteFiles(tempFilePath, tempFilePrefix, '.log');
    });

    it('deactivate tacking', async () => {
        const mic = (new MappIntelligenceConfig())
            .setDeactivate(true);
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(MappIntelligenceUnitUtil.getQueue(mih).length).toBe(0);
    });

    it('track without request URL', async () => {
        const mic = new MappIntelligenceConfig();
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(MappIntelligenceUnitUtil.getQueue(mih).length).toBe(0);
    });

    it('track with empty query parameter - 1', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld/pix');
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(MappIntelligenceUnitUtil.getQueue(mih).length).toBe(0);
    });

    it('track with empty query parameter - 2', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld/pix?');
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(MappIntelligenceUnitUtil.getQueue(mih).length).toBe(0);
    });

    it('track with query parameter', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld/pix?foo=bar&test=1%202%203');
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toContain('wt?foo=bar&test=1%202%203');
    });

    it('track with query parameter and hash', async () => {
        const mic = (new MappIntelligenceConfig())
            .setRequestURL('https://sub.domain.tld/pix?foo=bar&test=1%202%203#abc');
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toContain('wt?foo=bar&test=1%202%203');
    });

    it('track with request URL', async () => {
        const mic = new MappIntelligenceConfig();
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track('https://sub.domain.tld/pix?foo=bar&test=1%202%203');
        expect(await MappIntelligenceUnitUtil.getFileContent(tempFilePath, tempFilePrefix, '.tmp'))
            .toContain('wt?foo=bar&test=1%202%203');
    });

    it('track with null request URL', async () => {
        const mic = new MappIntelligenceConfig();
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track(null);
        expect(MappIntelligenceUnitUtil.getQueue(mih).length).toBe(0);
    });

    it('image response as string', async () => {
        const mic = new MappIntelligenceConfig();
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getResponseAsBuffer().toString()).toContain('GIF89');
    });

    it('image response as base64', async () => {
        const mic = new MappIntelligenceConfig();
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getResponseAsBase64()).toBe('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
    });

    it('set userId failed - 1', async () => {
        const mic = (new MappIntelligenceConfig())
            .setLogger(customLogger);
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to get user cookie');
    });

    it('set userId failed - 2', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackId('111111111111111')
            .setLogger(customLogger);
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
        expect(customLogger.getMessages()).toContain('The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to get user cookie');
    });

    it('set userId failed - 3', async () => {
        const mic = (new MappIntelligenceConfig())
            .setTrackDomain('analytics01.wt-eu02.net')
            .setLogger(customLogger);
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
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
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('existing server everId', async () => {
        const serverEverId: string = '2157070685656224066';

        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .addCookie('wteid_111111111111111', serverEverId);
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('existing V4 everId', async () => {
        const v4EverId: string = ';111111111111111|2157070685656224066';

        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .addCookie('wt3_eid', v4EverId);
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE)).toBeNull();
    });

    it('ignore server side everId with MappIntelligence trackDomain', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.SERVER_SIDE_COOKIE)).toBeNull();
    });

    it('ignore not supported pixel version', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net');
        const mih = new MappIntelligenceHybrid(mic);

        expect(mih.getUserIdCookie('v3', MappIntelligenceHybrid.SERVER_SIDE_COOKIE)).toBeNull();
        expect(mih.getUserIdCookie('', MappIntelligenceHybrid.SERVER_SIDE_COOKIE)).toBeNull();
    });

    it('null cookie', async () => {
        const mic = new MappIntelligenceConfig('111111111111111', 'analytics01.wt-eu02.net')
            .setCookie(null);
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.SERVER_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.V4, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.V4, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.V5, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.V5, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

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
        const mih = new MappIntelligenceHybrid(mic);

        const cookie: IMappIntelligenceCookie = mih.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);

        expect(cookie).not.toBeNull();
        expect(cookie.getName()).toBe('wtstp_eid');
        expect(cookie.getValue()).toMatch(/^8[0-9]{18}$/);
        expect(cookie.getMaxAge()).toBe(60 * 60 * 24 * 30 * 6);
        expect(cookie.getPath()).toBe('/');
        expect(cookie.getDomain()).toBe('');
        expect(cookie.isSecure()).toBeTruthy();
        expect(cookie.isHttpOnly()).toBeTruthy();
    });

    it('custom consumer - 1', async () => {
        const tcc = new TestCustomConsumer();
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType(MappIntelligenceConsumerType.CUSTOM)
            .setConsumer(tcc)
            .setLogger(MappIntelligenceUnitUtil.getCustomLogger())
            .setRequestURL('https://sub.domain.tld/pix?foo=bar&test=1%202%203#abc');
        const mih = new MappIntelligenceHybrid(mic);

        await mih.track();
        expect(tcc.getRequests().join(',')).toContain('wt?foo=bar&test=1%202%203');
    });

    it('custom consumer - 2', async () => {
        const tcc = new TestCustomConsumer2();
        const mic = (new MappIntelligenceConfig('123451234512345', 'analytics01.wt-eu02.net'))
            .setConsumerType(MappIntelligenceConsumerType.CUSTOM)
            .setConsumer(tcc)
            .setLogger(MappIntelligenceUnitUtil.getCustomLogger())
            .setRequestURL('https://sub.domain.tld/pix?foo=bar&test=1%202%203#abc');
        const mih = new MappIntelligenceHybrid(mic);

        expect(await mih.track()).toBeFalsy();
    });
});
