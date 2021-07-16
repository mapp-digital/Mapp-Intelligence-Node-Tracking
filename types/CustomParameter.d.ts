declare class CustomParameterWithId {
    private readonly queryParameter;
    constructor(qp: string);
    with(id: number): string;
}
export declare class CustomParameter {
    private static readonly SESSION_PARAMETER;
    private static readonly PAGE_PARAMETER;
    private static readonly PRODUCT_PARAMETER;
    private static readonly ACTION_PARAMETER;
    private static readonly CAMPAIGN_PARAMETER;
    private static readonly PAGE_CATEGORY;
    private static readonly PRODUCT_CATEGORY;
    private static readonly URM_CATEGORY;
    static readonly CUSTOM_SESSION_PARAMETER: CustomParameterWithId;
    static readonly CUSTOM_PAGE_PARAMETER: CustomParameterWithId;
    static readonly CUSTOM_PRODUCT_PARAMETER: CustomParameterWithId;
    static readonly CUSTOM_ACTION_PARAMETER: CustomParameterWithId;
    static readonly CUSTOM_CAMPAIGN_PARAMETER: CustomParameterWithId;
    static readonly CUSTOM_PAGE_CATEGORY: CustomParameterWithId;
    static readonly CUSTOM_PRODUCT_CATEGORY: CustomParameterWithId;
    static readonly CUSTOM_URM_CATEGORY: CustomParameterWithId;
}
export {};
