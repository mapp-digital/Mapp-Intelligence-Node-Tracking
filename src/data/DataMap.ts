import {Action} from './Action';
import {Campaign} from './Campaign';
import {Customer} from './Customer';
import {Order} from './Order';
import {Page} from './Page';
import {ProductCollection} from './ProductCollection';
import {Session} from './Session';

export class DataMap {
    /**
     * Tracking data.
     */
    private readonly data: {[key: string]: any} = {};

    /**
     * @param value Mapp Intelligence action data
     * @return MappIntelligenceDataMap
     */
    public action(value: Action): DataMap {
        this.data['action'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence campaign data
     * @return MappIntelligenceDataMap
     */
    public campaign(value: Campaign): DataMap {
        this.data['campaign'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence customer data
     * @return MappIntelligenceDataMap
     */
    public customer(value: Customer): DataMap {
        this.data['customer'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence order data
     * @return MappIntelligenceDataMap
     */
    public order(value: Order): DataMap {
        this.data['order'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence page data
     * @return MappIntelligenceDataMap
     */
    public page(value: Page): DataMap {
        this.data['page'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence product data
     * @return MappIntelligenceDataMap
     */
    public product(value: ProductCollection): DataMap {
        this.data['product'] = value;
        return this;
    }

    /**
     * @param value Mapp Intelligence session data
     * @return MappIntelligenceDataMap
     */
    public session(value: Session): DataMap {
        this.data['session'] = value;
        return this;
    }

    /**
     * @return Map(String, Object)
     */
    public build(): {[key: string]: any} {
        return this.data;
    }
}
