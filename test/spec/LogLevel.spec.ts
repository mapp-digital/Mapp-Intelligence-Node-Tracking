import {MappIntelligenceLogLevel} from '../../src/MappIntelligence';

describe('MappIntelligenceLogLevel', () => {
    it('get name error', async () => {
        expect(MappIntelligenceLogLevel.getName(2)).toBe('ERROR');
    });

    it('get name debug', async () => {
        expect(MappIntelligenceLogLevel.getName(5)).toBe('DEBUG');
    });

    it('get name not found', async () => {
        expect(MappIntelligenceLogLevel.getName(6)).toBeNull();
    });

    it('get value error', async () => {
        expect(MappIntelligenceLogLevel.getValue("ERROR")).toBe(2);
    });

    it('get value debug', async () => {
        expect(MappIntelligenceLogLevel.getValue("debug")).toBe(5);
    });

    it('get value not found', async () => {
        expect(MappIntelligenceLogLevel.getValue('FAILED')).toBe(-1);
    });
});
