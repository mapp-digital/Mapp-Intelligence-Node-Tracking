import {ConsumerType} from '../consumer/ConsumerType';
import {ConfigFile} from './ConfigFile';

export class ConfigProperties {
    /**
     * Properties object.
     */
    private readonly prop: {[key: string]: any};

    /**
     * @param propertyFile Property file path
     */
    public constructor(propertyFile: string) {
        const configFile = new ConfigFile(propertyFile);
        this.prop = configFile.build();
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return string
     */
    private getProperty(propertyName: string, defaultValue: any): any {
        const hierarchy: Array<string> = propertyName.split('.');
        const propValue: any = this.prop[hierarchy[0]][hierarchy[1]];

        return ((typeof propValue !== 'undefined') ? propValue : defaultValue);
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return string
     */
    public getStringProperty(propertyName: string, defaultValue: string): string {
        return this.getProperty(propertyName, defaultValue);
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return boolean
     */
    public getBooleanProperty(propertyName: string, defaultValue: boolean): boolean {
        return this.getProperty(propertyName, defaultValue);
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return boolean
     */
    public getIntegerProperty(propertyName: string, defaultValue: number): number {
        return this.getProperty(propertyName, defaultValue);
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return string
     */
    public getConsumerTypeProperty(propertyName: string, defaultValue: string): string {
        let consumerValue: string = defaultValue;
        const propertyValue: string = this.getProperty(propertyName, consumerValue);

        switch (propertyValue) {
            case ConsumerType.FILE:
                consumerValue = ConsumerType.FILE;
                break;
            case ConsumerType.HTTP_CLIENT:
                consumerValue = ConsumerType.HTTP_CLIENT;
                break;
            case ConsumerType.FORK_CURL:
                consumerValue = ConsumerType.FORK_CURL;
                break;
            default:
                break;
        }

        return consumerValue;
    }

    /**
     * @param propertyName Name of the property
     * @param defaultValue Default value for the property
     *
     * @return MappIntelligenceConsumer
     */
    public getListProperty(propertyName: string, defaultValue: Array<string | RegExp>): Array<string | RegExp> {
        return this.getProperty(propertyName, defaultValue);
    }
}
