import { Config } from '../config/Config';
import { ICookie } from '../ICookie';
import { DebugLogger } from '../DebugLogger';
import { Queue } from '../queue/Queue';
import { ACleaner } from '../ACleaner';
export declare abstract class ACore extends ACleaner {
    static readonly VERSION: string;
    static readonly V4: string;
    static readonly V5: string;
    static readonly SMART: string;
    static readonly CLIENT_SIDE_COOKIE: string;
    static readonly SERVER_SIDE_COOKIE: string;
    protected static readonly TRACKING_PLATFORM: string;
    protected readonly deactivate: boolean;
    protected readonly trackId: string;
    protected readonly trackDomain: string;
    protected readonly queue: Queue;
    protected readonly logger: DebugLogger;
    protected constructor(config: Config);
    protected close(): Promise<void>;
    getUserIdCookie(pixelVersion: string, context: string): ICookie;
}
