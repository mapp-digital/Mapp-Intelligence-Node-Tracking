export class LogLevel {
    public static readonly NONE: number = 0;
    public static readonly FATAL: number = 1;
    public static readonly ERROR: number = 2;
    public static readonly WARN: number = 3;
    public static readonly INFO: number = 4;
    public static readonly DEBUG: number = 5;

    /**
     * @param ll Integer log level
     *
     * @return Log level name
     */
    public static getName(ll: number): string {
        for (const p in LogLevel) {
            const prop: string = p + '';
            const logLvl: number = LogLevel[prop as keyof LogLevel];
            if (logLvl === ll) {
                return prop;
            }
        }

        return null;
    }

    /**
     * @param ll Log level name
     *
     * @return int Integer log level
     */
    public static getValue(ll: string): number {
        const logLvl: string = ll.toUpperCase();
        if (LogLevel[logLvl as keyof LogLevel]) {
            return LogLevel[logLvl as keyof LogLevel];
        }

        return -1;
    }
}
