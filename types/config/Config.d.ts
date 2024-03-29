import { ILogger } from '../ILogger';
import { IConsumer } from '../IConsumer';
export declare class Config {
    private readonly PORT_80;
    private readonly PORT_443;
    static readonly DEFAULT_ATTEMPT_TIMEOUT: number;
    static readonly DEFAULT_MAX_BATCH_SIZE: number;
    static readonly DEFAULT_MAX_QUEUE_SIZE: number;
    static readonly DEFAULT_MAX_FILE_LINES: number;
    static readonly DEFAULT_MAX_FILE_DURATION: number;
    static readonly DEFAULT_MAX_FILE_SIZE: number;
    private readonly MAX_ATTEMPT;
    private readonly MAX_ATTEMPT_TIMEOUT;
    private trackId;
    private trackDomain;
    private domain;
    private deactivate;
    private deactivateByInAndExclude;
    private logger;
    private logLevel;
    private consumer;
    private consumerType;
    private filePath;
    private filePrefix;
    private maxAttempt;
    private attemptTimeout;
    private maxBatchSize;
    private maxQueueSize;
    private maxFileLines;
    private maxFileDuration;
    private maxFileSize;
    private forceSSL;
    private useParamsForDefaultPageName;
    private userAgent;
    private clientHintUserAgent;
    private clientHintUserAgentFullVersionList;
    private clientHintUserAgentModel;
    private clientHintUserAgentMobile;
    private clientHintUserAgentPlatform;
    private clientHintUserAgentPlatformVersion;
    private remoteAddress;
    private referrerURL;
    private requestURL;
    private cookie;
    private containsInclude;
    private containsExclude;
    private matchesInclude;
    private matchesExclude;
    constructor(tId?: string, tDomain?: string);
    private getOwnDomain;
    private getStatistics;
    private checkContains;
    private checkMatches;
    private isDeactivateByInAndExclude;
    private static decode;
    private static getOrDefault;
    setTrackId(tId: string): Config;
    setTrackDomain(tDomain: string): Config;
    setUserAgent(ua: string): Config;
    setClientHintUserAgent(ch: string): Config;
    setClientHintUserAgentFullVersionList(ch: string): Config;
    setClientHintUserAgentModel(ch: string): Config;
    setClientHintUserAgentMobile(ch: string): Config;
    setClientHintUserAgentPlatform(ch: string): Config;
    setClientHintUserAgentPlatformVersion(ch: string): Config;
    setRemoteAddress(ra: string): Config;
    setReferrerURL(refURL: string): Config;
    setRequestURL(rURL: string): Config;
    addCookie(name: string, value: string): Config;
    setCookie(cookies: {
        [key: string]: string;
    }): Config;
    setDomain(d: Array<string | RegExp>): Config;
    addDomain(d: string | RegExp): Config;
    setLogger(l: ILogger): Config;
    setLogLevel(ll: number | string): Config;
    setDebug(d: boolean): Config;
    setDeactivate(d: boolean): Config;
    setConsumerType(cType: string): Config;
    setConsumer(c: IConsumer): Config;
    setFilePath(f: string): Config;
    setFilePrefix(f: string): Config;
    setMaxAttempt(mAttempt: number): Config;
    setAttemptTimeout(aTimeout: number): Config;
    setMaxBatchSize(mBatchSize: number): Config;
    setMaxQueueSize(mQueueSize: number): Config;
    setMaxFileLines(mFileLines: number): Config;
    setMaxFileDuration(mFileDuration: number): Config;
    setMaxFileSize(mFileSize: number): Config;
    setForceSSL(fSSL: boolean): Config;
    setUseParamsForDefaultPageName(uParamsForDefaultPageName: Array<string | RegExp>): Config;
    addUseParamsForDefaultPageName(uParamsForDefaultPageName: string): Config;
    setContainsInclude(containsInclude: Array<string | RegExp>): Config;
    addContainsInclude(containsInclude: string): Config;
    setContainsExclude(containsExclude: Array<string | RegExp>): Config;
    addContainsExclude(containsExclude: string): Config;
    setMatchesInclude(matchesInclude: Array<string | RegExp>): Config;
    addMatchesInclude(matchesInclude: RegExp): Config;
    setMatchesExclude(matchesExclude: Array<string | RegExp>): Config;
    addMatchesExclude(matchesExclude: RegExp): Config;
    build(): {
        [key: string]: any;
    };
}
