import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Page extends AData {
    /**
     * Allows to overwrite the default page naming.
     */
    private name: string = '';
    /**
     * Search terms used in internal search.
     */
    private search: string = '';
    /**
     * Number of internal search results.
     */
    private numberSearchResults: number = 0;
    /**
     * Allows to track error messages.
     */
    private errorMessages: string = '';
    /**
     * Allows to mark an article, if it is behind the Paywall.
     */
    private paywall: boolean = false;
    /**
     * Article heading.
     */
    private articleTitle: string = '';
    /**
     * Tags of an article.
     */
    private contentTags: string = '';
    /**
     * Title of the page.
     */
    private title: string = '';
    /**
     * Type of the page (e.g. 'overview').
     */
    private type: string = '';
    /**
     * Length of the page (e.g. 'large').
     */
    private length: string = '';
    /**
     * Days since publication.
     */
    private daysSincePublication: number = 0;
    /**
     * Name of the test variant.
     */
    private testVariant: string = '';
    /**
     * Name of the test.
     */
    private testExperiment: string = '';
    /**
     * You can use parameters to enrich Mapp Intelligence data with your own website-specific information and/or metrics.
     */
    private readonly parameter: {[key: number]: string} = {};
    /**
     * Page categories (called 'Content Groups' in Mapp) are used to group pages to create website areas.
     */
    private readonly category: {[key: number]: string} = {};
    /**
     * When using website goals, all central goals are quickly available for analyzing and filtering.
     */
    private readonly goal: {[key: number]: string} = {};

    /**
     * @param n Allows to overwrite the default page naming
     */
    public constructor(n?: string) {
        super();

        if (n) {
            this.name = n;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
        queryList['name'] = Parameter.PAGE_NAME;
        queryList['search'] = Parameter.SEARCH;
        queryList['numberSearchResults'] = Parameter.NUMBER_SEARCH_RESULTS;
        queryList['errorMessages'] = Parameter.ERROR_MESSAGES;
        queryList['paywall'] = Parameter.PAYWALL;
        queryList['articleTitle'] = Parameter.ARTICLE_TITLE;
        queryList['contentTags'] = Parameter.CONTENT_TAGS;
        queryList['title'] = Parameter.PAGE_TITLE;
        queryList['type'] = Parameter.PAGE_TYPE;
        queryList['length'] = Parameter.PAGE_LENGTH;
        queryList['daysSincePublication'] = Parameter.DAYS_SINCE_PUBLICATION;
        queryList['testVariant'] = Parameter.TEST_VARIANT;
        queryList['testExperiment'] = Parameter.TEST_EXPERIMENT;
        queryList['parameter'] = Parameter.CUSTOM_PAGE_PARAMETER;
        queryList['category'] = Parameter.CUSTOM_PAGE_CATEGORY;
        queryList['goal'] = Parameter.CUSTOM_PRODUCT_PARAMETER;

        return queryList;
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
        data['name'] = this.name;
        data['search'] = this.search;
        data['numberSearchResults'] = this.numberSearchResults;
        data['errorMessages'] = this.errorMessages;
        data['paywall'] = this.paywall;
        data['articleTitle'] = this.articleTitle;
        data['contentTags'] = this.contentTags;
        data['title'] = this.title;
        data['type'] = this.type;
        data['length'] = this.length;
        data['daysSincePublication'] = this.daysSincePublication;
        data['testVariant'] = this.testVariant;
        data['testExperiment'] = this.testExperiment;
        data['parameter'] = this.parameter;
        data['category'] = this.category;
        data['goal'] = this.goal;

        return data;
    }

    /**
     * @param n Allows to overwrite the default page naming
     *
     * @return MappIntelligencePage
     */
    public setName(n: string): Page {
        this.name = n;

        return this;
    }

    /**
     * @param s Search terms used in internal search
     *
     * @return MappIntelligencePage
     */
    public setSearch(s: string): Page {
        this.search = s;

        return this;
    }

    /**
     * @param nSearchResults Number of internal search results
     *
     * @return MappIntelligencePage
     */
    public setNumberSearchResults(nSearchResults: number): Page {
        this.numberSearchResults = nSearchResults;

        return this;
    }

    /**
     * @param eMessages Allows to track error messages
     *
     * @return MappIntelligencePage
     */
    public setErrorMessages(eMessages: string): Page {
        this.errorMessages = eMessages;

        return this;
    }

    /**
     * @param p Allows to mark an article, if it is behind the Paywall
     *
     * @return MappIntelligencePage
     */
    public setPaywall(p: boolean): Page {
        this.paywall = p;

        return this;
    }

    /**
     * @param aTitle Article heading
     *
     * @return MappIntelligencePage
     */
    public setArticleTitle(aTitle: string): Page {
        this.articleTitle = aTitle;

        return this;
    }

    /**
     * @param cTags Tags of an article
     *
     * @return MappIntelligencePage
     */
    public setContentTags(cTags: string): Page {
        this.contentTags = cTags;

        return this;
    }

    /**
     * @param t Title of the page
     *
     * @return MappIntelligencePage
     */
    public setTitle(t: string): Page {
        this.title = t;

        return this;
    }

    /**
     * @param t Type of the page (e.g. 'overview')
     *
     * @return MappIntelligencePage
     */
    public setType(t: string): Page {
        this.type = t;

        return this;
    }

    /**
     * @param l Length of the page (e.g. 'large')
     *
     * @return MappIntelligencePage
     */
    public setLength(l: string): Page {
        this.length = l;

        return this;
    }

    /**
     * @param dSincePublication Days since publication
     *
     * @return MappIntelligencePage
     */
    public setDaysSincePublication(dSincePublication: number): Page {
        this.daysSincePublication = dSincePublication;

        return this;
    }

    /**
     * @param tExperiment Name of the test
     *
     * @return MappIntelligencePage
     */
    public setTestExperiment(tExperiment: string): Page {
        this.testExperiment = tExperiment;

        return this;
    }

    /**
     * @param tVariant Name of the test variant
     *
     * @return MappIntelligencePage
     */
    public setTestVariant(tVariant: string): Page {
        this.testVariant = tVariant;

        return this;
    }

    /**
     * You can use parameters to enrich Mapp Intelligence data with your own website-specific information and/or metrics.
     *
     * @param id    ID of the parameter
     * @param value Value of the parameter
     * @return MappIntelligencePage
     */
    public setParameter(id: number, value: string): Page {
        this.parameter[id] = value;

        return this;
    }

    /**
     * Page categories (called 'Content Groups' in Mapp) are used to group pages to create website areas.
     *
     * @param id    ID of the parameter
     * @param value Value of the parameter
     * @return MappIntelligencePage
     */
    public setCategory(id: number, value: string): Page {
        this.category[id] = value;

        return this;
    }

    /**
     * When using website goals, all central goals are quickly available for analyzing and filtering.
     *
     * @param id    ID of the parameter
     * @param value Value of the parameter
     * @return MappIntelligencePage
     */
    public setGoal(id: number, value: string): Page {
        this.goal[id] = value;

        return this;
    }
}
