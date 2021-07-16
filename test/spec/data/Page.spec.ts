import {MappIntelligencePage} from '../../../src/MappIntelligence';

describe('MappIntelligencePage', () => {
    it('new page without name', async () => {
        const page = new MappIntelligencePage();

        const data: { [key: string]: any } = page.getData();
        expect("").toBe(data['name']);
    });

    it('new page with name', async () => {
        const page = new MappIntelligencePage("foo.bar");

        const data: { [key: string]: any } = page.getData();
        expect("foo.bar").toBe(data['name']);
    });

    it('get default', async () => {
        const page = new MappIntelligencePage();

        const data: { [key: string]: any } = page.getData();
        expect("").toBe(data['name']);
        expect("").toBe(data['search']);
        expect(0).toBe(data['numberSearchResults']);
        expect("").toBe(data['errorMessages']);
        expect(false).toBe(data['paywall']);
        expect("").toBe(data['articleTitle']);
        expect("").toBe(data['contentTags']);
        expect("").toBe(data['title']);
        expect("").toBe(data['type']);
        expect("").toBe(data['length']);
        expect(0).toBe(data['daysSincePublication']);
        expect("").toBe(data['testVariant']);
        expect("").toBe(data['testExperiment']);
        expect(0).toBe(Object.keys(data["parameter"]).length);
        expect(0).toBe(Object.keys(data["category"]).length);
        expect(0).toBe(Object.keys(data["goal"]).length);
    });

    it('set test experiment', async () => {
        const page = new MappIntelligencePage();
        page.setTestExperiment("name of an experiment");

        const data: { [key: string]: any } = page.getData();
        expect("name of an experiment").toBe(data['testExperiment']);
    });

    it('set content tags', async () => {
        const page = new MappIntelligencePage();
        page.setContentTags("name of a content tag");

        const data: { [key: string]: any } = page.getData();
        expect("name of a content tag").toBe(data['contentTags']);
    });

    it('set paywall', async () => {
        const page = new MappIntelligencePage();
        page.setPaywall(true);

        const data: { [key: string]: any } = page.getData();
        expect(true).toBe(data['paywall']);
    });

    it('set length', async () => {
        const page = new MappIntelligencePage();
        page.setLength("large");

        const data: { [key: string]: any } = page.getData();
        expect("large").toBe(data['length']);
    });

    it('set parameter', async () => {
        const page = new MappIntelligencePage();
        page.setParameter(2, "foo");
        page.setParameter(15, "bar");

        const data: { [key: string]: any } = page.getData();
        expect("foo").toBe(data["parameter"][2]);
        expect("bar").toBe(data["parameter"][15]);
    });

    it('set days since publication', async () => {
        const page = new MappIntelligencePage();
        page.setDaysSincePublication(8);

        const data: { [key: string]: any } = page.getData();
        expect(8).toBe(data['daysSincePublication']);
    });

    it('set test variant', async () => {
        const page = new MappIntelligencePage();
        page.setTestVariant("name of a variant");

        const data: { [key: string]: any } = page.getData();
        expect("name of a variant").toBe(data['testVariant']);
    });

    it('set search', async () => {
        const page = new MappIntelligencePage();
        page.setSearch("search term");

        const data: { [key: string]: any } = page.getData();
        expect("search term").toBe(data['search']);
    });

    it('set article title', async () => {
        const page = new MappIntelligencePage();
        page.setArticleTitle("name of an article");

        const data: { [key: string]: any } = page.getData();
        expect("name of an article").toBe(data['articleTitle']);
    });

    it('set type', async () => {
        const page = new MappIntelligencePage();
        page.setType("type of a page");

        const data: { [key: string]: any } = page.getData();
        expect("type of a page").toBe(data['type']);
    });

    it('set error messages', async () => {
        const page = new MappIntelligencePage();
        page.setErrorMessages("error message");

        const data: { [key: string]: any } = page.getData();
        expect("error message").toBe(data['errorMessages']);
    });

    it('set name', async () => {
        const page = new MappIntelligencePage();
        page.setName("name of a page");

        const data: { [key: string]: any } = page.getData();
        expect("name of a page").toBe(data['name']);
    });

    it('set title', async () => {
        const page = new MappIntelligencePage();
        page.setTitle("title of a page");

        const data: { [key: string]: any } = page.getData();
        expect("title of a page").toBe(data['title']);
    });

    it('set number search results', async () => {
        const page = new MappIntelligencePage();
        page.setNumberSearchResults(15);

        const data: { [key: string]: any } = page.getData();
        expect(15).toBe(data['numberSearchResults']);
    });

    it('set category', async () => {
        const page = new MappIntelligencePage();
        page.setCategory(2, "foo");
        page.setCategory(15, "bar");

        const data: { [key: string]: any } = page.getData();
        expect("foo").toBe(data["category"][2]);
        expect("bar").toBe(data["category"][15]);
    });

    it('set goal', async () => {
        const page = new MappIntelligencePage();
        page.setGoal(2, "foo");
        page.setGoal(15, "bar");

        const data: { [key: string]: any } = page.getData();
        expect("foo").toBe(data["goal"][2]);
        expect("bar").toBe(data["goal"][15]);
    });

    it('get query parameter', async () => {
        const page = new MappIntelligencePage();
        page
            .setTestExperiment("name of an experiment")
            .setContentTags("name of a content tag")
            .setPaywall(true)
            .setLength("large")
            .setDaysSincePublication(8)
            .setTestVariant("name of a variant")
            .setSearch("search term")
            .setArticleTitle("name of an article")
            .setType("type of a page")
            .setErrorMessages("error message")
            .setName("name of a page")
            .setTitle("title of a page")
            .setNumberSearchResults(15)
            .setParameter(2, "parameter 2")
            .setParameter(15, "parameter 15")
            .setCategory(2, "category 2")
            .setCategory(15, "category 15")
            .setGoal(2, "goal 2")
            .setGoal(15, "goal 15");

        const data: { [key: string]: string } = page.getQueryParameter();
        expect("name of a page").toBe(data['pn']);
        expect("search term").toBe(data['is']);
        expect("15").toBe(data['cp771']);
        expect("error message").toBe(data['cp772']);
        expect("true").toBe(data['cp773']);
        expect("name of an article").toBe(data['cp774']);
        expect("name of a content tag").toBe(data['cp775']);
        expect("title of a page").toBe(data['cp776']);
        expect("type of a page").toBe(data['cp777']);
        expect("large").toBe(data['cp778']);
        expect("8").toBe(data['cp779']);
        expect("name of a variant").toBe(data['cp781']);
        expect("name of an experiment").toBe(data['cp782']);
        expect("parameter 2").toBe(data['cp2']);
        expect("parameter 15").toBe(data['cp15']);
        expect("category 2").toBe(data['cg2']);
        expect("category 15").toBe(data['cg15']);
        expect("goal 2").toBe(data['cb2']);
        expect("goal 15").toBe(data['cb15']);
    });

    it('get default query parameter', async () => {
        const page = new MappIntelligencePage();

        const data: { [key: string]: string } = page.getQueryParameter();
        expect(0).toBe(Object.keys(data).length);
    });
});
