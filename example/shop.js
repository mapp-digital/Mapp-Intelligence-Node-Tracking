const http = require('http');

const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const router = require('./router');
const global = require('./src/controller/global');

const HOST = '0.0.0.0';
const PORT = 8081;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src');

app.use((req, res, next) => {
    req.globalStoreData = {
        shop: {
            host: HOST,
            port: PORT
        }
    };

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
    console.log(`Server listen on ${HOST}:${PORT}`);
});
