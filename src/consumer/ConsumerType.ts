export class ConsumerType {
    /**
     * Identifier for file consumer.
     */
    public static readonly FILE: string = 'FILE';

    /**
     * Identifier for http client consumer.
     */
    public static readonly HTTP_CLIENT: string = 'HTTP_CLIENT';

    /**
     * Identifier for http client consumer.
     */
    public static readonly FORK_CURL: string = 'FORK_CURL';

    /**
     * Identifier for custom consumer.
     */
    public static readonly CUSTOM: string = 'CUSTOM';
}
