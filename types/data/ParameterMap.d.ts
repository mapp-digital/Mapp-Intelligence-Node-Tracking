export declare class ParameterMap {
    private readonly data;
    add(key: string, value: string): ParameterMap;
    build(): {
        [key: string]: string;
    };
}
