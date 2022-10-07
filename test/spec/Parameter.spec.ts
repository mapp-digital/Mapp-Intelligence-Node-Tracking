import {MappIntelligenceParameter, MappIntelligenceCustomParameter} from '../../src/MappIntelligence';

describe('MappIntelligenceParameter', () => {
    it('special parameter', async () => {
        expect(MappIntelligenceParameter.USER_AGENT).toBe('X-WT-UA');
        expect(MappIntelligenceParameter.USER_IP).toBe('X-WT-IP');
    });

    it('predefined parameter', async () => {
        expect(MappIntelligenceParameter.EVER_ID).toBe('eid');
        expect(MappIntelligenceParameter.CUSTOM_EVER_ID).toBe('ceid');
        expect(MappIntelligenceParameter.PAGE_URL).toBe('pu');
        expect(MappIntelligenceParameter.ACTION_NAME).toBe('ct');
        expect(MappIntelligenceParameter.CAMPAIGN_ID).toBe('mc');
        expect(MappIntelligenceParameter.CAMPAIGN_ACTION).toBe('mca');
        expect(MappIntelligenceParameter.CUSTOMER_ID).toBe('cd');
        expect(MappIntelligenceParameter.ORDER_VALUE).toBe('ov');
        expect(MappIntelligenceParameter.ORDER_ID).toBe('oi');
        expect(MappIntelligenceParameter.CURRENCY).toBe('cr');
        expect(MappIntelligenceParameter.PAGE_NAME).toBe('pn');
        expect(MappIntelligenceParameter.SEARCH).toBe('is');
        expect(MappIntelligenceParameter.PRODUCT_ID).toBe('ba');
        expect(MappIntelligenceParameter.PRODUCT_COST).toBe('co');
        expect(MappIntelligenceParameter.PRODUCT_QUANTITY).toBe('qn');
        expect(MappIntelligenceParameter.PRODUCT_STATUS).toBe('st');
        expect(MappIntelligenceParameter.PIXEL_FEATURES).toBe('pf');
    });

    describe('predefined custom parameter and category', () => {
        it('urm category', async () => {
            expect(MappIntelligenceParameter.EMAIL).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(700));
            expect(MappIntelligenceParameter.EMAIL_RID).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(701));
            expect(MappIntelligenceParameter.EMAIL_OPTIN).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(702));
            expect(MappIntelligenceParameter.FIRST_NAME).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(703));
            expect(MappIntelligenceParameter.LAST_NAME).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(704));
            expect(MappIntelligenceParameter.TELEPHONE).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(705));
            expect(MappIntelligenceParameter.GENDER).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(706));
            expect(MappIntelligenceParameter.BIRTHDAY).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(707));
            expect(MappIntelligenceParameter.COUNTRY).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(708));
            expect(MappIntelligenceParameter.CITY).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(709));
            expect(MappIntelligenceParameter.POSTAL_CODE).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(710));
            expect(MappIntelligenceParameter.STREET).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(711));
            expect(MappIntelligenceParameter.STREET_NUMBER).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(712));
            expect(MappIntelligenceParameter.CUSTOMER_VALIDATION).toBe(MappIntelligenceCustomParameter.CUSTOM_URM_CATEGORY.with(713));
        });

        it('e-commerce parameter', async () => {
            expect(MappIntelligenceParameter.COUPON_VALUE).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(563));
            expect(MappIntelligenceParameter.PAYMENT_METHOD).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(761));
            expect(MappIntelligenceParameter.SHIPPING_SERVICE).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(762));
            expect(MappIntelligenceParameter.SHIPPING_SPEED).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(763));
            expect(MappIntelligenceParameter.SHIPPING_COSTS).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(764));
            expect(MappIntelligenceParameter.GROSS_MARGIN).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(765));
            expect(MappIntelligenceParameter.ORDER_STATUS).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(766));
            expect(MappIntelligenceParameter.PRODUCT_VARIANT).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(767));
            expect(MappIntelligenceParameter.PRODUCT_SOLD_OUT).toBe(MappIntelligenceCustomParameter.CUSTOM_PRODUCT_PARAMETER.with(760));
        });

        it('page parameter', async () => {
            expect(MappIntelligenceParameter.NUMBER_SEARCH_RESULTS).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(771));
            expect(MappIntelligenceParameter.ERROR_MESSAGES).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(772));
            expect(MappIntelligenceParameter.PAYWALL).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(773));
            expect(MappIntelligenceParameter.ARTICLE_TITLE).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(774));
            expect(MappIntelligenceParameter.CONTENT_TAGS).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(775));
            expect(MappIntelligenceParameter.PAGE_TITLE).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(776));
            expect(MappIntelligenceParameter.PAGE_TYPE).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(777));
            expect(MappIntelligenceParameter.PAGE_LENGTH).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(778));
            expect(MappIntelligenceParameter.DAYS_SINCE_PUBLICATION).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(779));
            expect(MappIntelligenceParameter.TEST_VARIANT).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(781));
            expect(MappIntelligenceParameter.TEST_EXPERIMENT).toBe(MappIntelligenceCustomParameter.CUSTOM_PAGE_PARAMETER.with(782));
        });

        it('session parameter', async () => {
            expect(MappIntelligenceParameter.LOGIN_STATUS).toBe(MappIntelligenceCustomParameter.CUSTOM_SESSION_PARAMETER.with(800));
            expect(MappIntelligenceParameter.VERSION).toBe(MappIntelligenceCustomParameter.CUSTOM_SESSION_PARAMETER.with(801));
            expect(MappIntelligenceParameter.TRACKING_PLATFORM).toBe(MappIntelligenceCustomParameter.CUSTOM_SESSION_PARAMETER.with(802));
        });
    });

    it('custom parameter and category', async () => {
        expect(MappIntelligenceParameter.CUSTOM_SESSION_PARAMETER).toBe('cs');
        expect(MappIntelligenceParameter.CUSTOM_PAGE_PARAMETER).toBe('cp');
        expect(MappIntelligenceParameter.CUSTOM_PRODUCT_PARAMETER).toBe('cb');
        expect(MappIntelligenceParameter.CUSTOM_ACTION_PARAMETER).toBe('ck');
        expect(MappIntelligenceParameter.CUSTOM_CAMPAIGN_PARAMETER).toBe('cc');
        expect(MappIntelligenceParameter.CUSTOM_PAGE_CATEGORY).toBe('cg');
        expect(MappIntelligenceParameter.CUSTOM_PRODUCT_CATEGORY).toBe('ca');
        expect(MappIntelligenceParameter.CUSTOM_URM_CATEGORY).toBe('uc');
    });

    it('cookie names', async () => {
        expect(MappIntelligenceParameter.SMART_PIXEL_COOKIE_NAME).toBe('wtstp_eid');
        expect(MappIntelligenceParameter.PIXEL_COOKIE_NAME).toBe('wt3_eid');
        expect(MappIntelligenceParameter.SERVER_COOKIE_NAME_PREFIX).toBe('wteid_');
    });
});
