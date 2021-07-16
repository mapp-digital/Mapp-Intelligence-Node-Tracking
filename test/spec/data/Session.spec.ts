import {MappIntelligenceSession} from '../../../src/MappIntelligence';

describe('MappIntelligenceSession', () => {
    it('get default', async () => {
        const session = new MappIntelligenceSession();

        const data: { [key: string]: any } = session.getData();
        expect('').toBe(data['loginStatus']);
        expect(0).toBe(Object.keys(data['parameter']).length);
    });

    it('set parameter', async () => {
        const session = new MappIntelligenceSession();
        session.setParameter(2, 'foo');
        session.setParameter(15, 'bar');

        const data: { [key: string]: any } = session.getData();
        expect('foo').toBe(data['parameter'][2]);
        expect('bar').toBe(data['parameter'][15]);
    });

    it('set login status', async () => {
        const session = new MappIntelligenceSession();
        session.setLoginStatus('logged in');

        const data: { [key: string]: any } = session.getData();
        expect('logged in').toBe(data['loginStatus']);
    });

    it('get query parameter', async () => {
        const session = new MappIntelligenceSession();
        session.setLoginStatus('logged in')
            .setParameter(2, 'param2')
            .setParameter(15, 'param15');

        const data: { [key: string]: string } = session.getQueryParameter();
        expect('logged in').toBe(data['cs800']);
        expect('param2').toBe(data['cs2']);
        expect('param15').toBe(data['cs15']);
    });

    it('get default query parameter', async () => {
        const session = new MappIntelligenceSession();

        const data: { [key: string]: string } = session.getQueryParameter();
        expect(0).toBe(Object.keys(data).length);
    });
});
