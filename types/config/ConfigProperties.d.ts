export declare class ConfigProperties {
    private readonly prop;
    constructor(propertyFile: string);
    private getProperty;
    getStringProperty(propertyName: string, defaultValue: string): string;
    getBooleanProperty(propertyName: string, defaultValue: boolean): boolean;
    getIntegerProperty(propertyName: string, defaultValue: number): number;
    getConsumerTypeProperty(propertyName: string, defaultValue: string): string;
    getListProperty(propertyName: string, defaultValue: Array<string | RegExp>): Array<string | RegExp>;
}
