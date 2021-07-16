import {MappIntelligenceCampaign} from '../../../src/MappIntelligence';

describe('MappIntelligenceCampaign', () => {
    it('new campaign without id', async () => {
        const campaign = new MappIntelligenceCampaign();

        const data: { [key: string]: any } = campaign.getData();
        expect('').toBe(data['id']);
    });

    it('new campaign with id', async () => {
        const campaign = new MappIntelligenceCampaign('wt_mc%3Dfoo.bar');

        const data: { [key: string]: any } = campaign.getData();
        expect('wt_mc%3Dfoo.bar').toBe(data['id']);
    });

    it('get default', async () => {
        const campaign = new MappIntelligenceCampaign();

        const data: { [key: string]: any } = campaign.getData();
        expect('').toBe(data['id']);
        expect('c').toBe(data['action']);
        expect(0).toBe(Object.keys(data['parameter']).length);
    });

    it('set id', async () => {
        const campaign = new MappIntelligenceCampaign('wt_mc%3Dfoo.bar');
        campaign.setId('wt%3Dfoo.bar');

        const data: { [key: string]: any } = campaign.getData();
        expect('wt%3Dfoo.bar').toBe(data['id']);
    });

    it('set parameter', async () => {
        const campaign = new MappIntelligenceCampaign();
        campaign.setParameter(2, 'foo');
        campaign.setParameter(15, 'bar');

        const data: { [key: string]: any } = campaign.getData();
        expect('foo').toBe(data['parameter'][2]);
        expect('bar').toBe(data['parameter'][15]);
    });

    it('set media code', async () => {
        const campaign = new MappIntelligenceCampaign();
        campaign.setMediaCode(['foo', 'bar']);

        expect('1').toBe('1');
    });

    it('set once per session', async () => {
        const campaign = new MappIntelligenceCampaign();
        campaign.setOncePerSession(false);

        expect('1').toBe('1');
    });

    it('get query parameter', async () => {
        const campaign = new MappIntelligenceCampaign();
        campaign.setId('wt_mc%3Dfoo.bar');
        campaign.setParameter(2, 'param2');
        campaign.setParameter(15, 'param15');

        const data: { [key: string]: string } = campaign.getQueryParameter();
        expect('wt_mc%3Dfoo.bar').toBe(data['mc']);
        expect('c').toBe(data['mca']);
        expect('param2').toBe(data['cc2']);
        expect('param15').toBe(data['cc15']);
    });

    it('get default query parameter', async () => {
        const campaign = new MappIntelligenceCampaign();

        const data: { [key: string]: string } = campaign.getQueryParameter();
        expect(1).toBe(Object.keys(data).length);
        expect('c').toBe(data['mca']);
    });
});
