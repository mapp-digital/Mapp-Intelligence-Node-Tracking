import { AData } from './AData';
export declare class Page extends AData {
    private name;
    private search;
    private numberSearchResults;
    private errorMessages;
    private paywall;
    private articleTitle;
    private contentTags;
    private title;
    private type;
    private length;
    private daysSincePublication;
    private testVariant;
    private testExperiment;
    private readonly parameter;
    private readonly category;
    private readonly goal;
    constructor(n?: string);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setName(n: string): Page;
    setSearch(s: string): Page;
    setNumberSearchResults(nSearchResults: number): Page;
    setErrorMessages(eMessages: string): Page;
    setPaywall(p: boolean): Page;
    setArticleTitle(aTitle: string): Page;
    setContentTags(cTags: string): Page;
    setTitle(t: string): Page;
    setType(t: string): Page;
    setLength(l: string): Page;
    setDaysSincePublication(dSincePublication: number): Page;
    setTestExperiment(tExperiment: string): Page;
    setTestVariant(tVariant: string): Page;
    setParameter(id: number, value: string): Page;
    setCategory(id: number, value: string): Page;
    setGoal(id: number, value: string): Page;
}
