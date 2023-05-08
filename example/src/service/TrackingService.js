const {
    MappIntelligenceConfig,
    MappIntelligenceTracking,
    MappIntelligencePage,
    MappIntelligenceSession,
    MappIntelligenceCustomer,
    MappIntelligenceOrder,
    MappIntelligenceProduct,
    MappIntelligenceDataMap,
    MappIntelligenceProductCollection,
    MappIntelligenceConsumerType
} = require('@mapp-intelligence/node');

const CustomLogger = function() {
    this.log = (msg) => {
        console.log(msg);
    };
};

const TrackingService = function(req) {
    let request = req;
    let mappIntelligenceTracking = null;

    let actionData = null;
    let campaignData = null;
    let customerData = null;
    let orderData = null;
    let pageData = null;
    let sessionData = null;
    let productDataList = new MappIntelligenceProductCollection();

    const __constructor = () => {
        const mic = new MappIntelligenceConfig()
            .setTrackId('123451234512345')
            .setTrackDomain('analytics01.wt-eu02.net')
            // .setLogger(new CustomLogger())
            .setFilePath('./log/')
            .setConsumerType(MappIntelligenceConsumerType.FILE)
            .setMaxFileLines(10)
            .setReferrerURL(request.headers['referer'])
            .setRequestURL('https://127.0.0.1:9091' + request.url)
            .setRemoteAddress(request.headers['x-forwarded-for'] || request.socket.remoteAddress)
            .setUserAgent(request.headers['user-agent']);

        for (let cookie in request.cookies) {
            if (request.cookies.hasOwnProperty(cookie)) {
                mic.addCookie(cookie, request.cookies[cookie]);
            }
        }

        mappIntelligenceTracking = new MappIntelligenceTracking(mic);
    };

    const trackProduct = (product, status, qty) => {
        const tProduct = new MappIntelligenceProduct()
            .setStatus(status)
            .setQuantity(qty)
            .setId(product.sku)
            .setCost(product.price * qty)
            .setParameter(1, product.bestSeller ? "best seller" : "")
            .setParameter(2, product.feature ? "feature product" : "")
            .setParameter(3, product.latest ? "latest product" : "")
            .setCategory(1, product.description)
            .setCategory(2, product.category)
            .setCategory(3, product.id + "")
            .setCategory(4, product.name);

        productDataList.add(tProduct);
    };

    this.search = (search, numberSearchResults) => {
        pageData = new MappIntelligencePage()
            .setSearch(search)
            .setNumberSearchResults(numberSearchResults);
    };

    this.customer = (user, personal) => {
        sessionData = new MappIntelligenceSession()
            .setLoginStatus('login');

        customerData = new MappIntelligenceCustomer()
            .setFirstName(user.firstName)
            .setLastName(user.lastName)
            .setEmail(user.email)
            .setTelephone(user.telephone)
            .setValidation(true)
            .setCategory(1, user.fullName);

        if (personal) {
            customerData
                .setCity(personal.city)
                .setStreet(personal.address1)
                .setCountry(personal.country)
                .setPostalCode(personal.postCode);
        }
    };

    this.order = (orderId, cart) => {
        let orderValue = 0;
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            trackProduct(item.product, MappIntelligenceProduct.CONFIRMATION, item.quantity);

            orderValue += item.product.price * item.quantity;
        }

        orderData = new MappIntelligenceOrder()
            .setCurrency('EUR')
            .setId(orderId)
            .setValue(orderValue);
    };

    this.viewProduct = (product) => {
        trackProduct(product, MappIntelligenceProduct.VIEW, 1);
    };

    this.addProduct = (product, qty) => {
        trackProduct(product, MappIntelligenceProduct.BASKET, qty);
    };

    this.track = () => {
        const dataMap = new MappIntelligenceDataMap()
            .action(actionData)
            .campaign(campaignData)
            .customer(customerData)
            .order(orderData)
            .page(pageData)
            .product(productDataList)
            .session(sessionData);

        mappIntelligenceTracking.track(dataMap).finally(() => {
            actionData = null;
            campaignData = null;
            customerData = null;
            orderData = null;
            pageData = null;
            productDataList = new MappIntelligenceProductCollection();
            sessionData = null;
        });
    };

    __constructor();
};

module.exports = TrackingService;
