const {MappIntelligenceConfig, MappIntelligenceHybrid, MappIntelligenceConsumerType} = require('@mapp-intelligence/node');

const CustomLogger = function() {
    this.log = (msg) => {
        console.log(msg);
    };
};

const tracking = (req, res) => {
    const mappConfig = new MappIntelligenceConfig()
        .setTrackId('123451234512345')
        .setTrackDomain('analytics01.wt-eu02.net')
        .setLogger(new CustomLogger())
        .setFilePath('./log/')
        .setConsumerType(MappIntelligenceConsumerType.FILE)
        .setMaxFileLines(10)
        .setReferrerURL(req.headers['referer'])
        .setRequestURL('https://127.0.0.1:9091' + req.url)
        .setRemoteAddress(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
        .setUserAgent(req.headers['user-agent']);

    for (let cookie in req.cookies) {
        if (req.cookies.hasOwnProperty(cookie)) {
            mappConfig.addCookie(cookie, req.cookies[cookie]);
        }
    }

    const mappHybrid = new MappIntelligenceHybrid(mappConfig);
    mappHybrid.track().then(() => {
        const mappUserCookie = mappHybrid.getUserIdCookie(MappIntelligenceHybrid.SMART, MappIntelligenceHybrid.CLIENT_SIDE_COOKIE);
        if (mappUserCookie) {
            res.cookie(mappUserCookie.getName(), mappUserCookie.getValue(), {
                domain: mappUserCookie.getDomain(),
                path: mappUserCookie.getPath(),
                maxAge: mappUserCookie.getMaxAge() * 1000,
                httpOnly: mappUserCookie.isHttpOnly(),
                secure: mappUserCookie.isSecure()
            });
        }

        res.writeHead(200, {
            'Content-Type': 'image/gif;charset=UTF-8',
            'Content-Length': '43'
        });

        res.end(mappHybrid.getResponseAsBuffer(), 'binary');
    });
};

module.exports = tracking;
