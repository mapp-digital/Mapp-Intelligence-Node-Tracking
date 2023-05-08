const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const router = require('./router');
const global = require('./src/controller/global');

const HOST = 'sgu.pixel-test.com';
const TRACKING_HOST = 'tracking.pixel-test.com';
const TRACKING_HOST_2 = 'tracking2.pixel-test.com';
const TRACKING_HOST_3 = 'tracking3.pixel-test.com';
const TRACKING_HOST_4 = 'track.customer.com';
const PORT = 80;
const SECURE_PORT = 443;
const CERTS = {
    key: fs.readFileSync(__dirname + '/certs/selfsigned.key'),
    cert: fs.readFileSync(__dirname + '/certs/selfsigned.crt')
};

const app = express();

const HINTS = [
    'Sec-CH-UA',
    'Sec-CH-UA-Mobile',
    'Sec-CH-UA-Full-Version',
    'Sec-CH-UA-Full-Version-List',
    'Sec-CH-UA-Platform',
    'Sec-CH-UA-Platform-Version',
    'Sec-CH-UA-Arch',
    'Sec-CH-UA-Wow64',
    'Sec-CH-UA-Bitness',
    'Sec-CH-UA-Model',
];

app.set('view engine', 'ejs');
app.set('views', 'src');

app.use((req, res, next) => {
    let port = ":" + (req.secure ? SECURE_PORT : PORT);
    if (port === ':80' || port === ':443') {
        port = '';
    }

    req.globalStoreData = {
        shop: {
            host: HOST,
            port: port,
            protocol: req.secure ? 'https' : 'http'
        }
    };

    if (req.secure) {
        res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
        // res.setHeader('Accept-CH', HINTS.join(', '));

        if (req.hostname === TRACKING_HOST_4) {
            // do nothing
        }

        if (req.hostname === TRACKING_HOST_2) {
            // if (!req.headers['sec-ch-ua-full-version']) {
            //     res.setHeader('Accept-CH', HINTS.join(', '));
            //     res.redirect(307, req.originalUrl);
            // }
        }

        if (req.hostname === TRACKING_HOST) {
            // res.setHeader('Accept-CH', HINTS.join(', '));
        }

        if (req.hostname === HOST) {
            res.setHeader('Accept-CH', 'Sec-CH-UA, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Model, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version');
            // res.setHeader('Permissions-Policy', 'ch-ua=(self "https://track.customer.com"), ch-ua-full-version-list=(self "https://track.customer.com"), ch-ua-model=(self "https://track.customer.com"), ch-ua-mobile=(self "https://track.customer.com"), ch-ua-platform=(self "https://track.customer.com"),ch-ua-platform-version=(self "https://track.customer.com")');

            // res.setHeader('Accept-CH', HINTS.join(', '));
            // res.setHeader('Feature-Policy', 'ch-ua-full-version https://tracking.pixel-test.com; ch-ua-full-version-list https://tracking.pixel-test.com;');
            // res.setHeader('Permissions-Policy', 'ch-ua-full-version=(self "https://tracking.wt-eu02.net"), ch-ua-full-version-list=(self "https://tracking.wt-eu02.net")');
        }

        // res.setHeader('Accept-CH', HINTS.join(', '));

        // res.setHeader('Feature-Policy', 'ch-ua-arch https://tracking.pixel-test.com; ch-ua-bitness https://tracking.pixel-test.com; ch-ua-full-version https://tracking.pixel-test.com; ch-ua-full-version-list https://tracking.pixel-test.com; ch-ua-mobile https://tracking.pixel-test.com; ch-ua-model https://tracking.pixel-test.com; ch-ua-platform-version https://tracking.pixel-test.com; ch-ua-platform https://tracking.pixel-test.com; ch-ua-wow64 https://tracking.pixel-test.com; ch-ua https://tracking.pixel-test.com;');
        // res.setHeader('Permissions-Policy', 'ch-ua-arch=(self "https://tracking.pixel-test.com"), ch-ua-bitness=(self "https://tracking.pixel-test.com"), ch-ua-full-version=(self "https://tracking.pixel-test.com"), ch-ua-full-version-list=(self "https://tracking.pixel-test.com"), ch-ua-mobile=(self "https://tracking.pixel-test.com"), ch-ua-model=(self "https://tracking.pixel-test.com"), ch-ua-platform-version=(self "https://tracking.pixel-test.com"), ch-ua-platform=(self "https://tracking.pixel-test.com"), ch-ua-wow64=(self "https://tracking.pixel-test.com"), ch-ua=(self "https://tracking.pixel-test.com")');

        // res.setHeader('Permissions-Policy', 'ch-ua-arch=(self), ch-ua-bitness=(self), ch-ua-full-version=(self), ch-ua-full-version-list=(self), ch-ua-mobile=(self), ch-ua-model=(self), ch-ua-platform-version=(self), ch-ua-platform=(self), ch-ua-wow64=(self), ch-ua=(self)');
    }

    next();
});

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(global);

app.use('/assets', express.static(__dirname + '/src/assets'));
app.use(router);

http.createServer(app).listen(PORT, HOST, function() {
    console.log(`Server listen on http://${HOST}:${PORT}`);
});

https.createServer(CERTS, app).listen(SECURE_PORT, function() {
    console.log(`Server listen on https://${HOST}:${SECURE_PORT}`);
    console.log(`Server listen on https://${TRACKING_HOST}:${SECURE_PORT}`);
    console.log(`Server listen on https://${TRACKING_HOST_2}:${SECURE_PORT}`);
    console.log(`Server listen on https://${TRACKING_HOST_3}:${SECURE_PORT}`);
    console.log(`Server listen on https://${TRACKING_HOST_4}:${SECURE_PORT}`);
});
