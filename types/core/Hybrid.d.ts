/// <reference types="node" />
import { Config } from '../config/Config';
import { ACore } from './ACore';
export declare class Hybrid extends ACore {
    private static readonly PIXEL;
    private static readonly CONTENT_TYPE;
    private static readonly CONTENT_LENGTH;
    private requestURL;
    constructor(config: Config);
    getResponseAsBase64(): string;
    getResponseAsBuffer(): Buffer;
    track(rURL?: string): Promise<void>;
}
