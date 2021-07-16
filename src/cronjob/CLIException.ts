export class CLIException extends Error {
    /**
     * @param errorMessage Error message
     */
    public constructor(errorMessage: string) {
        super(errorMessage);
    }
}