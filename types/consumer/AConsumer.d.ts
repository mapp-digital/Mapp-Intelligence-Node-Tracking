/// <reference types="node" />
import * as http from 'http';
import { IConsumer } from '../IConsumer';
import { DebugLogger } from '../DebugLogger';
export declare abstract class AConsumer implements IConsumer {
    private static readonly MAX_PAYLOAD_SIZE;
    private static readonly MAX_BATCH_SIZE;
    private static readonly DOUBLE_100;
    private static readonly INTEGER_1024;
    protected static readonly DEFAULT_MAX_FILE_LINES: number;
    protected static readonly DEFAULT_MAX_FILE_DURATION: number;
    protected static readonly DEFAULT_MAX_FILE_SIZE: number;
    protected static readonly DEFAULT_CONNECT_TIMEOUT: number;
    protected readonly logger: DebugLogger;
    private readonly trackId;
    private readonly trackDomain;
    private readonly forceSSL;
    protected constructor(config: {
        [key: string]: any;
    });
    private getPort;
    protected getUrl(): string;
    protected getHTTPOptions(): {
        [key: string]: any;
    };
    protected getHTTPClient(options: {
        [key: string]: any;
    }, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
    protected verifyPayload(batchContent: Array<string>): string;
    abstract sendBatch(batchContent: Array<string>): Promise<boolean>;
}
