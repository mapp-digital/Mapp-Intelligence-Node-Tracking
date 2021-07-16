import { DebugLogger } from '../DebugLogger';
import { ICookie } from '../ICookie';
export declare class Enrichment {
    private static readonly MAX_COOKIE_AGE;
    private static readonly MAX_RANDOM;
    private readonly trackId;
    private readonly trackDomain;
    private readonly domain;
    private readonly referrerURL;
    private readonly userAgent;
    private readonly remoteAddress;
    private readonly requestURL;
    private readonly useParamsForDefaultPageName;
    private readonly cookie;
    private everId;
    protected readonly logger: DebugLogger;
    protected constructor(config: {
        [key: string]: any;
    });
    protected static decode(str: string): string;
    protected static encode(str: string): string;
    private static getTimestamp;
    private static getReferrerDomain;
    private isOwnDomain;
    private getReferrer;
    private getCookieValue;
    private getUserId;
    private static zeroPad;
    private static generateUserId;
    private setUserIdCookie;
    private isOwnTrackDomain;
    protected getUserAgent(): string;
    protected getUserIP(): string;
    protected getRequestURI(): string;
    protected getQueryMap(): {
        [key: string]: string;
    };
    protected getMandatoryQueryParameter(pageName: string): string;
    protected getDefaultPageName(): string;
    protected getEverId(): string;
    getUserIdCookie(pixelVersion: string, context: string): ICookie;
}
