import {Config} from '../config/Config';
import {ILogger} from '../ILogger';
import {ICookie} from '../ICookie';
import {Messages} from '../Messages';
import {DebugLogger} from '../DebugLogger';
import {Queue} from '../queue/Queue';
import {ACleaner} from '../ACleaner';

export abstract class ACore extends ACleaner {
    /**
     * Mapp Intelligence version.
     */
    public static readonly VERSION: string = '${project.version}';

    /**
     * Identifier for pixel v4.
     */
    public static readonly V4: string = 'v4';

    /**
     * Identifier for pixel v5.
     */
    public static readonly V5: string = 'v5';

    /**
     * Identifier for smart pixel.
     */
    public static readonly SMART: string = 'smart';

    /**
     * Identifier for 1st party cookies.
     */
    public static readonly CLIENT_SIDE_COOKIE: string = '1';

    /**
     * Identifier for 3rd party cookies.
     */
    public static readonly SERVER_SIDE_COOKIE: string = '3';

    /**
     * Constant for tracking platform.
     */
    protected static readonly TRACKING_PLATFORM: string = 'Node';

    /**
     * Deactivate the tracking functionality.
     */
    protected readonly deactivate: boolean;

    /**
     * Your Mapp Intelligence track ID provided by Mapp.
     */
    protected readonly trackId: string;

    /**
     * Your Mapp Intelligence tracking domain.
     */
    protected readonly trackDomain: string;

    /**
     * Mapp Intelligence request queue.
     */
    protected readonly queue: Queue;

    /**
     * Mapp Intelligence debug logger.
     */
    protected readonly logger: DebugLogger;

    /**
     * @param config Mapp Intelligence configuration
     */
    protected constructor(config: Config) {
        super();

        const mappIntelligenceConfig: {[key: string]: any} = config.build();
        this.queue = new Queue(mappIntelligenceConfig);

        const l: ILogger = mappIntelligenceConfig['logger'];
        this.logger = new DebugLogger(l);

        this.deactivate = mappIntelligenceConfig['deactivate'];
        this.trackId = mappIntelligenceConfig['trackId'];
        this.trackDomain = mappIntelligenceConfig['trackDomain'];
    }

    /**
     * Sends all requests in the queue.
     */
    protected async close(): Promise<void> {
        await this.queue.flush();
    }

    /**
     * @param pixelVersion Version ot the current pixel (v4, v5, smart)
     * @param context Cookie context (1st, 3rd)
     *
     * @return MappIntelligenceCookie
     */
    public getUserIdCookie(pixelVersion: string, context: string): ICookie {
        if (!this.trackId || !this.trackDomain) {
            this.logger.log(Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_COOKIE);
            return null;
        }

        return this.queue.getUserIdCookie(pixelVersion, context);
    }
}
