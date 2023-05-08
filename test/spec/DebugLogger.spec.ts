import {MappIntelligenceLogLevel} from '../../src/MappIntelligence';
import {CustomLogger, MappIntelligenceUnitUtil} from './_utils/MappIntelligenceUnitUtil';
import {DebugLogger} from '../../src/DebugLogger';

describe('MappIntelligenceDebugLogger', () => {
    let customLogger: CustomLogger;

    beforeEach(() => {
        customLogger = MappIntelligenceUnitUtil.getCustomLogger();
    });

    it('new Mapp Intelligence debug logger', async () => {
        try {
            new DebugLogger(MappIntelligenceUnitUtil.getCustomLogger(), MappIntelligenceLogLevel.DEBUG);
            expect(true).toBeTruthy();
        } catch (e) {
            fail();
        }
    });

    it('new Mapp Intelligence debug logger 2', async () => {
        try {
            new DebugLogger(null, MappIntelligenceLogLevel.DEBUG);
            expect(true).toBeTruthy();
        } catch (e) {
            fail();
        }
    });

    it('fatal 1', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.FATAL);

        logger.fatal("fatal1");
        logger.fatal("${0} ${1}", "fatal2", "fatal3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("FATAL [Mapp Intelligence]: fatal1");
        expect(message).toContain("FATAL [Mapp Intelligence]: fatal2 fatal3");
    });

    it('fatal 2', async () => {
        const logger = new DebugLogger(null, MappIntelligenceLogLevel.FATAL);

        logger.fatal("fatal1");
        logger.fatal("${0} ${1}", "fatal2", "fatal3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('fatal 3', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.NONE);

        logger.fatal("fatal1");
        logger.fatal("${0} ${1}", "fatal2", "fatal3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('fatal 4', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.fatal("fatal1");
        logger.fatal("${0} ${1}", "fatal2", "fatal3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("FATAL [Mapp Intelligence]: fatal1");
        expect(message).toContain("FATAL [Mapp Intelligence]: fatal2 fatal3");
    });

    it('error 1', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.ERROR);

        logger.error("error1");
        logger.error("${0} ${1}", "error2", "error3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("ERROR [Mapp Intelligence]: error1");
        expect(message).toContain("ERROR [Mapp Intelligence]: error2 error3");
    });

    it('error 2', async () => {
        const logger = new DebugLogger(null, MappIntelligenceLogLevel.ERROR);

        logger.error("error1");
        logger.error("${0} ${1}", "error2", "error3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('error 3', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.NONE);

        logger.error("error1");
        logger.error("${0} ${1}", "error2", "error3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('error 4', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.error("error1");
        logger.error("${0} ${1}", "error2", "error3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("ERROR [Mapp Intelligence]: error1");
        expect(message).toContain("ERROR [Mapp Intelligence]: error2 error3");
    });

    it('warn 1', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.WARN);

        logger.warn("warn1");
        logger.warn("${0} ${1}", "warn2", "warn3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("WARN [Mapp Intelligence]: warn1");
        expect(message).toContain("WARN [Mapp Intelligence]: warn2 warn3");
    });

    it('warn 2', async () => {
        const logger = new DebugLogger(null, MappIntelligenceLogLevel.WARN);

        logger.warn("warn1");
        logger.warn("${0} ${1}", "warn2", "warn3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('warn 3', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.NONE);

        logger.warn("warn1");
        logger.warn("${0} ${1}", "warn2", "warn3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('warn 4', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.warn("warn1");
        logger.warn("${0} ${1}", "warn2", "warn3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("WARN [Mapp Intelligence]: warn1");
        expect(message).toContain("WARN [Mapp Intelligence]: warn2 warn3");
    });

    it('info 1', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.INFO);

        logger.info("info1");
        logger.info("${0} ${1}", "info2", "info3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("INFO [Mapp Intelligence]: info1");
        expect(message).toContain("INFO [Mapp Intelligence]: info2 info3");
    });

    it('info 2', async () => {
        const logger = new DebugLogger(null, MappIntelligenceLogLevel.INFO);

        logger.info("info1");
        logger.info("${0} ${1}", "info2", "info3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('info 3', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.NONE);

        logger.info("info1");
        logger.info("${0} ${1}", "info2", "info3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('info 4', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.info("info1");
        logger.info("${0} ${1}", "info2", "info3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("INFO [Mapp Intelligence]: info1");
        expect(message).toContain("INFO [Mapp Intelligence]: info2 info3");
    });

    it('debug 1', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.debug("debug1");
        logger.debug("${0} ${1}", "debug2", "debug3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("DEBUG [Mapp Intelligence]: debug1");
        expect(message).toContain("DEBUG [Mapp Intelligence]: debug2 debug3");
    });

    it('debug 2', async () => {
        const logger = new DebugLogger(null, MappIntelligenceLogLevel.DEBUG);

        logger.debug("debug1");
        logger.debug("${0} ${1}", "debug2", "debug3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('debug 3', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.NONE);

        logger.debug("debug1");
        logger.debug("${0} ${1}", "debug2", "debug3");

        const message: string = customLogger.getMessages();
        expect(message).toBe('');
    });

    it('debug 4', async () => {
        const logger = new DebugLogger(customLogger, MappIntelligenceLogLevel.DEBUG);

        logger.debug("debug1");
        logger.debug("${0} ${1}", "debug2", "debug3");

        const message: string = customLogger.getMessages();
        expect(message).toContain("DEBUG [Mapp Intelligence]: debug1");
        expect(message).toContain("DEBUG [Mapp Intelligence]: debug2 debug3");
    });
});
