import {MappIntelligenceAction} from '../../../src/MappIntelligence';

describe('MappIntelligenceAction', () => {
    it('new action without name', async () => {
        const action = new MappIntelligenceAction();

        const data: { [key: string]: any } = action.getData();
        expect('').toBe(data['name']);
    });

    it('new action with name', async () => {
        const action = new MappIntelligenceAction('foo.bar');

        const data: { [key: string]: any } = action.getData();
        expect('foo.bar').toBe(data['name']);
    });

    it('get default', async () => {
        const action = new MappIntelligenceAction();

        const data: { [key: string]: any } = action.getData();
        expect('').toBe(data['name']);
        expect(0).toBe(Object.keys(data['parameter']).length);
        expect(0).toBe(Object.keys(data['goal']).length);
    });

    it('set name', async () => {
        const action = new MappIntelligenceAction('foo.bar');
        action.setName('bar.foo');

        const data: { [key: string]: any } = action.getData();
        expect('bar.foo').toBe(data['name']);
    });

    it('set goal', async () => {
        const action = new MappIntelligenceAction();
        action.setGoal(2, 'foo')
            .setGoal(15, 'bar');

        const data: { [key: string]: any } = action.getData();
        expect('foo').toBe(data['goal'][2]);
        expect('bar').toBe(data['goal'][15]);
    });

    it('set parameter', async () => {
        const action = new MappIntelligenceAction();
        action.setParameter(2, 'foo')
            .setParameter(15, 'bar');

        const data: { [key: string]: any } = action.getData();
        expect('foo').toBe(data['parameter'][2]);
        expect('bar').toBe(data['parameter'][15]);
    });

    it('get query parameter', async () => {
        const action = new MappIntelligenceAction();
        action.setName('foo.bar')
            .setParameter(2, 'param2')
            .setParameter(15, 'param15')
            .setGoal(2, 'goal2')
            .setGoal(15, 'goal15');

        const data: { [key: string]: string } = action.getQueryParameter();
        expect('foo.bar').toBe(data['ct']);
        expect('param2').toBe(data['ck2']);
        expect('param15').toBe(data['ck15']);
        expect('goal2').toBe(data['cb2']);
        expect('goal15').toBe(data['cb15']);
    });

    it('get default query parameter', async () => {
        const action = new MappIntelligenceAction();

        const data: { [key: string]: string } = action.getQueryParameter();
        expect(0).toBe(Object.keys(data).length);
    });
});
