import {DebugLogger} from '../DebugLogger';
import {ILogger} from '../ILogger';
import {Messages} from '../Messages';
import {Parameter} from '../Parameter';
import {ICookie} from '../ICookie';
import {ServerCookie} from './ServerCookie';
import {ACore} from '../core/ACore';

export class Enrichment {
    /**
     * Constant for the max cookie age (6 month).
     */
    private static readonly MAX_COOKIE_AGE: number = 60 * 60 * 24 * 30 * 6;
    /**
     * Constant for the max random number.
     */
    private static readonly MAX_RANDOM: number = 100000000;

    /**
     * Your Mapp Intelligence track ID provided by Mapp.
     */
    private readonly trackId: string;
    /**
     * Your Mapp Intelligence tracking domain.
     */
    private readonly trackDomain: string;
    /**
     * The domains you do not want to identify as an external referrer (e.g. your subdomains).
     */
    private readonly domain: Array<string | RegExp>;
    /**
     * HTTP referrer URL.
     */
    private readonly referrerURL: string;
    /**
     * HTTP user agent string.
     */
    private readonly userAgent: string;
    /**
     * Remote address (ip) from the client.
     */
    private readonly remoteAddress: string;
    /**
     * HTTP request URL.
     */
    private readonly requestURL: URL;
    /**
     * Specific URL parameter(s) in the default page name.
     */
    private readonly useParamsForDefaultPageName: Array<string>;
    /**
     * Map with cookies.
     */
    private readonly cookie: {[key: string]: string};
    /**
     * Mapp Intelligence unique user id.
     */
    private everId: string;
    /**
     * Mapp Intelligence debug logger.
     */
    protected readonly logger: DebugLogger;

    /**
     * @param config Current tracking configuration
     */
    protected constructor(config: {[key: string]: any}) {
        this.trackId = config['trackId'];
        this.trackDomain = config['trackDomain'];
        this.domain = config['domain'];
        this.referrerURL = config['referrerURL'];
        this.userAgent = config['userAgent'];
        this.remoteAddress = config['remoteAddress'];
        this.requestURL = config['requestURL'];
        this.useParamsForDefaultPageName = config['useParamsForDefaultPageName'];
        this.cookie = config['cookie'];
        this.everId = this.getUserId();

        const l: ILogger = config['logger'];
        this.logger = new DebugLogger(l);
    }

    /**
     * @param str String to decoding
     */
    protected static decode(str: string): string {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            /* istanbul ignore next */
            return unescape(str);
        }
    }

    /**
     * @param str String to encoding
     */
    protected static encode(str: string): string {
        try {
            return encodeURIComponent(str);
        } catch (e) {
            /* istanbul ignore next */
            return escape(str);
        }
    }

    /**
     * @return long
     */
    private static getTimestamp(): number {
        return Date.now();
    }

    /**
     * @param referrer referrer URL
     * @return String
     */
    private static getReferrerDomain(referrer: string): string {
        const referrerSplit: Array<string> = referrer.split('/');
        if (referrerSplit.length >= 2) {
            return referrerSplit[2].toLowerCase();
        }

        return '';
    }

    /**
     * @param referrer referrer URL
     * @return boolean
     */
    private isOwnDomain(referrer: string): boolean {
        if (referrer === '0') {
            return false;
        }

        const referrerDomain: string = Enrichment.getReferrerDomain(referrer);
        let d: string | RegExp;
        for (d of this.domain) {
            try {
                if (typeof d === 'string') {
                    if (d === referrerDomain) {
                        return true;
                    }
                }
                else if (d.test(referrerDomain)) {
                    return true;
                }
            } catch (e) {
                /* istanbul ignore next */
                this.logger.log(Messages.GENERIC_ERROR, e.name, e.message);
            }
        }

        return false;
    }

    /**
     * @return String
     */
    private getReferrer(): string {
        let referrer: string = ((!this.referrerURL) ? '0' : Enrichment.decode(this.referrerURL));

        if (this.isOwnDomain(referrer)) {
            referrer = '1';
        }

        return Enrichment.encode(referrer);
    }

    /**
     * @param cookieName Name of the cookie
     * @return String
     */
    private getCookieValue(cookieName: string): string {
        return ((this.cookie[cookieName]) ? this.cookie[cookieName] : '');
    }

    /**
     * @return String
     */
    private getUserId(): string {
        let eid: string = '';
        const smartPixelCookie: string = this.getCookieValue(Parameter.SMART_PIXEL_COOKIE_NAME);
        const trackServerCookie: string = this.getCookieValue(Parameter.SERVER_COOKIE_NAME_PREFIX + this.trackId);
        const oldPixelCookie: string = this.getCookieValue(Parameter.PIXEL_COOKIE_NAME);

        if (smartPixelCookie) {
            eid = smartPixelCookie;
        }
        else if (trackServerCookie) {
            eid = trackServerCookie;
        }
        else if (oldPixelCookie) {
            const everIdValues: Array<string> = oldPixelCookie.split(';');
            let everIdValue: string;
            for (everIdValue of everIdValues) {
                if (everIdValue.indexOf(this.trackId + '|') !== -1) {
                    const regexp = new RegExp(this.trackId + '\\|', 'ig');
                    const tmpEverId: string = everIdValue.replace(regexp, '');
                    eid = tmpEverId.split('#')[0];
                }
            }
        }

        return eid;
    }

    /**
     * @param n
     * @param countZeros
     */
    private static zeroPad(n: number, countZeros: number): string {
        let zeroString = '';
        for (let i = 0; i <= countZeros; i++) {
            zeroString += '0';
        }

        const result = zeroString + n;
        return result.substring((result.length - countZeros), result.length);
    }

    /**
     * @return String
     */
    private static generateUserId(): string {
        const seconds = Math.floor(Enrichment.getTimestamp() / 1000);

        return ('8'
            + Enrichment.zeroPad(seconds, 10)
            + Enrichment.zeroPad(Math.floor(Math.random() * Enrichment.MAX_RANDOM), 8)
        );
    }

    /**
     * @param n Name of the cookie
     * @param v Value for the cookie
     * @param d Domain for the cookie
     *
     * @return MappIntelligenceCookie
     */
    private setUserIdCookie(n: string = Parameter.SMART_PIXEL_COOKIE_NAME, v: string = '', d: string = ''): ICookie {
        let value: string = v;
        if (!value) {
            value = this.everId;
        }

        const everIdCookie: ICookie = new ServerCookie(n, value);
        if (d) {
            everIdCookie.setDomain(d);
        }

        everIdCookie.setMaxAge(Enrichment.MAX_COOKIE_AGE);
        everIdCookie.setPath('/');
        everIdCookie.setSecure(true);
        everIdCookie.setHttpOnly(true);

        return everIdCookie;
    }

    /**
     * @return boolean
     */
    private isOwnTrackDomain(): boolean {
        /*
         * .webtrekk.net          (Germany)
         * .wt-eu02.net           (Germany)
         * .webtrekk-us.net       (USA)
         * .webtrekk-asia.net     (Singapur)
         * .wt-sa.net             (Brasilien)
         */
        return !/^.+\.(wt-.*|webtrekk|webtrekk-.*)\.net$/.test(this.trackDomain);
    }

    /**
     * @return String
     */
    protected getUserAgent(): string {
        return this.userAgent;
    }

    /**
     * @return String
     */
    protected getUserIP(): string {
        return this.remoteAddress;
    }

    /**
     * @return String
     */
    protected getRequestURI(): string {
        if (!this.requestURL) {
            return '';
        }

        return Enrichment.decode(this.requestURL.toString()).split('//')[1];
    }

    /**
     * @return Map(String, String)
     */
    protected getQueryMap(): {[key: string]: string} {
        const map: {[key: string]: string} = {};
        if (!this.requestURL) {
            return map;
        }

        const queryString: string = Enrichment.decode(this.requestURL.search);
        if (queryString) {
            const params: Array<string> = queryString.split('?')[1].split('&');
            let param: string;
            for (param of params) {
                const paramSplit: Array<string> = param.split('=');
                map[paramSplit[0]] = paramSplit[1];
            }
        }

        return map;
    }

    /**
     * @param pageName Name of the page
     * @return String
     */
    protected getMandatoryQueryParameter(pageName: string): string {
        return `600,${Enrichment.encode(pageName)},,,,,${Enrichment.getTimestamp()},${this.getReferrer()},,`;
    }

    /**
     * @return String
     */
    protected getDefaultPageName(): string {
        let plainUrl: string = this.getRequestURI().split('?')[0];
        const parameterList: Array<string> = [];
        const queryMap: {[key: string]: string} = this.getQueryMap();

        let parameterKey: string;
        for (parameterKey of this.useParamsForDefaultPageName) {
            const parameterValue: string = queryMap[parameterKey] ? queryMap[parameterKey] : '';
            if (parameterValue) {
                parameterList.push(`${parameterKey}=${parameterValue}`);
            }
        }

        if (parameterList.length > 0) {
            plainUrl += '?' + parameterList.join('&');
        }

        if (!plainUrl) {
            plainUrl = '0';
        }

        return plainUrl.toLowerCase();
    }

    /**
     * @return string
     */
    protected getEverId(): string {
        return this.everId;
    }

    /**
     * @param pixelVersion Version ot the current pixel (v4, v5, smart)
     * @param context      Cookie context (1st, 3rd)
     * @return MappIntelligenceCookie
     */
    public getUserIdCookie(pixelVersion: string, context: string): ICookie {
        let c: ICookie = null;

        if (!this.everId) {
            this.everId = Enrichment.generateUserId();

            if (context === ACore.SERVER_SIDE_COOKIE) {
                if (this.isOwnTrackDomain()) {
                    const trackDomainSplit: Array<string> = this.trackDomain.split('.');
                    trackDomainSplit.shift();
                    const cookieDomain: string = trackDomainSplit.join('.');

                    // if it is an own tracking domain use this without sub domain
                    c = this.setUserIdCookie(Parameter.SERVER_COOKIE_NAME_PREFIX + this.trackId, '', cookieDomain);
                }
            } else {
                if (pixelVersion === ACore.V4 || pixelVersion === ACore.V5) {
                    let cookieValue: string = this.getCookieValue(Parameter.PIXEL_COOKIE_NAME);
                    cookieValue += `;${this.trackId}|${this.everId}`;
                    c = this.setUserIdCookie(Parameter.PIXEL_COOKIE_NAME, cookieValue);
                }

                if (pixelVersion === ACore.SMART) {
                    c = this.setUserIdCookie();
                }
            }
        }

        return c;
    }
}
