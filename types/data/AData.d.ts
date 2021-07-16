export declare abstract class AData {
    protected filterQueryParameter: boolean;
    private static removeEmptyQueryParameter;
    protected getParameterList(params: {
        [key: number]: string;
    }, key: string): {
        [key: string]: string;
    };
    getData(): {
        [key: string]: any;
    };
    getQueryParameter(): {
        [key: string]: string;
    };
    protected abstract getQueryList(): {
        [key: string]: string;
    };
    protected abstract toMap(): {
        [key: string]: any;
    };
}
