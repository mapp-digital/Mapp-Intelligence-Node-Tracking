import {MappIntelligenceCustomParameter} from '../../src/MappIntelligence';

describe('MappIntelligenceCustomParameter', () => {
    it('custom parameter', async () => {
        expect(MappIntelligenceCustomParameter.CUSTOM_ACTION_PARAMETER.with(5)).toBe('ck5');
        expect(MappIntelligenceCustomParameter.CUSTOM_SESSION_PARAMETER.with(2)).toBe('cs2');
        expect(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(3)).toBe('cp3');
        expect(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(7)).toBe('cb7');
        expect(MappIntelligenceCustomParameter.CUSTOM_CAMPAIGN_PARAMETER.with(20)).toBe('cc20');
        expect(MappIntelligenceCustomParameter.CUSTOM_PAGE_CATEGORY.with(12)).toBe('cg12');
        expect(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_CATEGORY.with(8)).toBe('ca8');
        expect(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(1)).toBe('uc1');
    });
});
