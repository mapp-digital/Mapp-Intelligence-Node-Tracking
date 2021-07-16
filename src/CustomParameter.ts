class CustomParameterWithId {
    /**
     * Query parameter string.
     */
    private readonly queryParameter: string;

    /**
     * @param qp Name of the query parameter string
     */
    public constructor(qp: string) {
        this.queryParameter = qp;
    }

    /**
     * @param id ID of the custom parameter
     * @return String
     */
    public with(id: number): string {
        return this.queryParameter + id;
    }
}

export class CustomParameter {
    // custom parameter and category
    private static readonly SESSION_PARAMETER: string = 'cs';
    private static readonly PAGE_PARAMETER: string = 'cp';
    private static readonly PRODUCT_PARAMETER: string = 'cb';
    private static readonly ACTION_PARAMETER: string = 'ck';
    private static readonly CAMPAIGN_PARAMETER: string = 'cc';
    private static readonly PAGE_CATEGORY: string = 'cg';
    private static readonly PRODUCT_CATEGORY: string = 'ca';
    private static readonly URM_CATEGORY: string = 'uc';

    public static readonly CUSTOM_SESSION_PARAMETER: CustomParameterWithId = new CustomParameterWithId(CustomParameter.SESSION_PARAMETER);
    public static readonly CUSTOM_PAGE_PARAMETER: CustomParameterWithId = new CustomParameterWithId(CustomParameter.PAGE_PARAMETER);
    public static readonly CUSTOM_PRODUCT_PARAMETER: CustomParameterWithId = new CustomParameterWithId(CustomParameter.PRODUCT_PARAMETER);
    public static readonly CUSTOM_ACTION_PARAMETER: CustomParameterWithId = new CustomParameterWithId(CustomParameter.ACTION_PARAMETER);
    public static readonly CUSTOM_CAMPAIGN_PARAMETER: CustomParameterWithId = new CustomParameterWithId(CustomParameter.CAMPAIGN_PARAMETER);
    public static readonly CUSTOM_PAGE_CATEGORY: CustomParameterWithId = new CustomParameterWithId(CustomParameter.PAGE_CATEGORY);
    public static readonly CUSTOM_PRODUCT_CATEGORY: CustomParameterWithId = new CustomParameterWithId(CustomParameter.PRODUCT_CATEGORY);
    public static readonly CUSTOM_URM_CATEGORY: CustomParameterWithId = new CustomParameterWithId(CustomParameter.URM_CATEGORY);
}
