export declare abstract class ACleaner {
    private static readonly EVENTS;
    private static readonly SIGNALS;
    private static readonly cleanerJobs;
    protected constructor();
    private static startCleaner;
    private addHocks;
    protected abstract close(): Promise<void>;
}
