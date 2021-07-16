export abstract class ACleaner {
    private static readonly EVENTS: Array<string> = ['exit', 'uncaughtException'];
    private static readonly SIGNALS: Array<string> = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];

    private static readonly cleanerJobs: Array<ACleaner> = [];

    /**
     * Default constructor.
     */
    protected constructor() {
        if (ACleaner.cleanerJobs.length <= 0) {
            this.addHocks(ACleaner.EVENTS);
            this.addHocks(ACleaner.SIGNALS);
        }

        ACleaner.cleanerJobs.push(this);
    }

    /**
     *
     */
    private static startCleaner(): void {
        ACleaner.cleanerJobs.forEach(async function(cleaner) {
            await cleaner.close();
        });
    }

    /**
     * @param hocks List of process hocks
     */
    private addHocks(hocks: Array<string>): void {
        hocks.forEach((eType) => {
            process.on(eType, function() {
                ACleaner.startCleaner();
            });
        });
    }

    /**
     * @return Promise<void>
     */
    protected abstract close(): Promise<void>;
}
