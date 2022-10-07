import {CustomParameter} from './CustomParameter';

export class Parameter {
    // special parameter
    public static readonly USER_AGENT: string = 'X-WT-UA';
    public static readonly USER_IP: string = 'X-WT-IP';

    // predefined parameter
    public static readonly EVER_ID: string = 'eid';
    public static readonly CUSTOM_EVER_ID: string = 'ceid';
    public static readonly PAGE_URL: string = 'pu';
    public static readonly ACTION_NAME: string = 'ct';
    public static readonly CAMPAIGN_ID: string = 'mc';
    public static readonly CAMPAIGN_ACTION: string = 'mca';
    public static readonly CUSTOMER_ID: string = 'cd';
    public static readonly ORDER_VALUE: string = 'ov';
    public static readonly ORDER_ID: string = 'oi';
    public static readonly CURRENCY: string = 'cr';
    public static readonly PAGE_NAME: string = 'pn';
    public static readonly SEARCH: string = 'is';
    public static readonly PRODUCT_ID: string = 'ba';
    public static readonly PRODUCT_COST: string = 'co';
    public static readonly PRODUCT_QUANTITY: string = 'qn';
    public static readonly PRODUCT_STATUS: string = 'st';
    public static readonly PIXEL_FEATURES: string = 'pf';

    // predefined custom parameter and category
    // predefined urm category
    public static readonly EMAIL: string = CustomParameter.CUSTOM_URM_CATEGORY.with(700);
    public static readonly EMAIL_RID: string = CustomParameter.CUSTOM_URM_CATEGORY.with(701);
    public static readonly EMAIL_OPTIN: string = CustomParameter.CUSTOM_URM_CATEGORY.with(702);
    public static readonly FIRST_NAME: string = CustomParameter.CUSTOM_URM_CATEGORY.with(703);
    public static readonly LAST_NAME: string = CustomParameter.CUSTOM_URM_CATEGORY.with(704);
    public static readonly TELEPHONE: string = CustomParameter.CUSTOM_URM_CATEGORY.with(705);
    public static readonly GENDER: string = CustomParameter.CUSTOM_URM_CATEGORY.with(706);
    public static readonly BIRTHDAY: string = CustomParameter.CUSTOM_URM_CATEGORY.with(707);
    public static readonly COUNTRY: string = CustomParameter.CUSTOM_URM_CATEGORY.with(708);
    public static readonly CITY: string = CustomParameter.CUSTOM_URM_CATEGORY.with(709);
    public static readonly POSTAL_CODE: string = CustomParameter.CUSTOM_URM_CATEGORY.with(710);
    public static readonly STREET: string = CustomParameter.CUSTOM_URM_CATEGORY.with(711);
    public static readonly STREET_NUMBER: string = CustomParameter.CUSTOM_URM_CATEGORY.with(712);
    public static readonly CUSTOMER_VALIDATION: string = CustomParameter.CUSTOM_URM_CATEGORY.with(713);
    // predefined e-commerce parameter
    public static readonly COUPON_VALUE: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(563);
    public static readonly PAYMENT_METHOD: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(761);
    public static readonly SHIPPING_SERVICE: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(762);
    public static readonly SHIPPING_SPEED: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(763);
    public static readonly SHIPPING_COSTS: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(764);
    public static readonly GROSS_MARGIN: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(765);
    public static readonly ORDER_STATUS: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(766);
    public static readonly PRODUCT_VARIANT: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(767);
    public static readonly PRODUCT_SOLD_OUT: string = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(760);
    // predefined page parameter
    public static readonly NUMBER_SEARCH_RESULTS: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(771);
    public static readonly ERROR_MESSAGES: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(772);
    public static readonly PAYWALL: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(773);
    public static readonly ARTICLE_TITLE: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(774);
    public static readonly CONTENT_TAGS: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(775);
    public static readonly PAGE_TITLE: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(776);
    public static readonly PAGE_TYPE: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(777);
    public static readonly PAGE_LENGTH: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(778);
    public static readonly DAYS_SINCE_PUBLICATION: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(779);
    public static readonly TEST_VARIANT: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(781);
    public static readonly TEST_EXPERIMENT: string = CustomParameter.CUSTOM_PAGE_PARAMETER.with(782);
    // predefined session parameter
    public static readonly LOGIN_STATUS: string = CustomParameter.CUSTOM_SESSION_PARAMETER.with(800);
    public static readonly VERSION: string = CustomParameter.CUSTOM_SESSION_PARAMETER.with(801);
    public static readonly TRACKING_PLATFORM: string = CustomParameter.CUSTOM_SESSION_PARAMETER.with(802);

    // custom parameter and category
    public static readonly CUSTOM_SESSION_PARAMETER: string = 'cs';
    public static readonly CUSTOM_PAGE_PARAMETER: string = 'cp';
    public static readonly CUSTOM_PRODUCT_PARAMETER: string = 'cb';
    public static readonly CUSTOM_ACTION_PARAMETER: string = 'ck';
    public static readonly CUSTOM_CAMPAIGN_PARAMETER: string = 'cc';
    public static readonly CUSTOM_PAGE_CATEGORY: string = 'cg';
    public static readonly CUSTOM_PRODUCT_CATEGORY: string = 'ca';
    public static readonly CUSTOM_URM_CATEGORY: string = 'uc';

    // cookie names
    public static readonly SMART_PIXEL_COOKIE_NAME: string = 'wtstp_eid';
    public static readonly PIXEL_COOKIE_NAME: string = 'wt3_eid';
    public static readonly SERVER_COOKIE_NAME_PREFIX: string = 'wteid_';
}
