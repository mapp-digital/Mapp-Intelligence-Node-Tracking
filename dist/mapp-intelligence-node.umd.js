(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('os'), require('http'), require('https'), require('fs'), require('child_process')) :
    typeof define === 'function' && define.amd ? define(['exports', 'os', 'http', 'https', 'fs', 'child_process'], factory) :
    (global = global || self, factory(global['@mapp-intelligence/node'] = {}, global.os, global.http, global.https, global.fs, global.child_process));
}(this, (function (exports, os, http, https, fs, child_process) { 'use strict';

    var CustomParameterWithId = (function () {
        function CustomParameterWithId(qp) {
            this.queryParameter = qp;
        }
        CustomParameterWithId.prototype.with = function (id) {
            return this.queryParameter + id;
        };
        return CustomParameterWithId;
    }());
    var CustomParameter = (function () {
        function CustomParameter() {
        }
        CustomParameter.SESSION_PARAMETER = 'cs';
        CustomParameter.PAGE_PARAMETER = 'cp';
        CustomParameter.PRODUCT_PARAMETER = 'cb';
        CustomParameter.ACTION_PARAMETER = 'ck';
        CustomParameter.CAMPAIGN_PARAMETER = 'cc';
        CustomParameter.PAGE_CATEGORY = 'cg';
        CustomParameter.PRODUCT_CATEGORY = 'ca';
        CustomParameter.URM_CATEGORY = 'uc';
        CustomParameter.CUSTOM_SESSION_PARAMETER = new CustomParameterWithId(CustomParameter.SESSION_PARAMETER);
        CustomParameter.CUSTOM_PAGE_PARAMETER = new CustomParameterWithId(CustomParameter.PAGE_PARAMETER);
        CustomParameter.CUSTOM_PRODUCT_PARAMETER = new CustomParameterWithId(CustomParameter.PRODUCT_PARAMETER);
        CustomParameter.CUSTOM_ACTION_PARAMETER = new CustomParameterWithId(CustomParameter.ACTION_PARAMETER);
        CustomParameter.CUSTOM_CAMPAIGN_PARAMETER = new CustomParameterWithId(CustomParameter.CAMPAIGN_PARAMETER);
        CustomParameter.CUSTOM_PAGE_CATEGORY = new CustomParameterWithId(CustomParameter.PAGE_CATEGORY);
        CustomParameter.CUSTOM_PRODUCT_CATEGORY = new CustomParameterWithId(CustomParameter.PRODUCT_CATEGORY);
        CustomParameter.CUSTOM_URM_CATEGORY = new CustomParameterWithId(CustomParameter.URM_CATEGORY);
        return CustomParameter;
    }());

    var Parameter = (function () {
        function Parameter() {
        }
        Parameter.USER_AGENT = 'X-WT-UA';
        Parameter.USER_IP = 'X-WT-IP';
        Parameter.EVER_ID = 'eid';
        Parameter.CUSTOM_EVER_ID = 'ceid';
        Parameter.PAGE_URL = 'pu';
        Parameter.ACTION_NAME = 'ct';
        Parameter.CAMPAIGN_ID = 'mc';
        Parameter.CAMPAIGN_ACTION = 'mca';
        Parameter.CUSTOMER_ID = 'cd';
        Parameter.ORDER_VALUE = 'ov';
        Parameter.ORDER_ID = 'oi';
        Parameter.CURRENCY = 'cr';
        Parameter.PAGE_NAME = 'pn';
        Parameter.SEARCH = 'is';
        Parameter.PRODUCT_ID = 'ba';
        Parameter.PRODUCT_COST = 'co';
        Parameter.PRODUCT_QUANTITY = 'qn';
        Parameter.PRODUCT_STATUS = 'st';
        Parameter.PIXEL_FEATURES = 'pf';
        Parameter.EMAIL = CustomParameter.CUSTOM_URM_CATEGORY.with(700);
        Parameter.EMAIL_RID = CustomParameter.CUSTOM_URM_CATEGORY.with(701);
        Parameter.EMAIL_OPTIN = CustomParameter.CUSTOM_URM_CATEGORY.with(702);
        Parameter.FIRST_NAME = CustomParameter.CUSTOM_URM_CATEGORY.with(703);
        Parameter.LAST_NAME = CustomParameter.CUSTOM_URM_CATEGORY.with(704);
        Parameter.TELEPHONE = CustomParameter.CUSTOM_URM_CATEGORY.with(705);
        Parameter.GENDER = CustomParameter.CUSTOM_URM_CATEGORY.with(706);
        Parameter.BIRTHDAY = CustomParameter.CUSTOM_URM_CATEGORY.with(707);
        Parameter.COUNTRY = CustomParameter.CUSTOM_URM_CATEGORY.with(708);
        Parameter.CITY = CustomParameter.CUSTOM_URM_CATEGORY.with(709);
        Parameter.POSTAL_CODE = CustomParameter.CUSTOM_URM_CATEGORY.with(710);
        Parameter.STREET = CustomParameter.CUSTOM_URM_CATEGORY.with(711);
        Parameter.STREET_NUMBER = CustomParameter.CUSTOM_URM_CATEGORY.with(712);
        Parameter.CUSTOMER_VALIDATION = CustomParameter.CUSTOM_URM_CATEGORY.with(713);
        Parameter.COUPON_VALUE = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(563);
        Parameter.PAYMENT_METHOD = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(761);
        Parameter.SHIPPING_SERVICE = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(762);
        Parameter.SHIPPING_SPEED = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(763);
        Parameter.SHIPPING_COSTS = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(764);
        Parameter.GROSS_MARGIN = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(765);
        Parameter.ORDER_STATUS = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(766);
        Parameter.PRODUCT_VARIANT = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(767);
        Parameter.PRODUCT_SOLD_OUT = CustomParameter.CUSTOM_PRODUCT_PARAMETER.with(760);
        Parameter.NUMBER_SEARCH_RESULTS = CustomParameter.CUSTOM_PAGE_PARAMETER.with(771);
        Parameter.ERROR_MESSAGES = CustomParameter.CUSTOM_PAGE_PARAMETER.with(772);
        Parameter.PAYWALL = CustomParameter.CUSTOM_PAGE_PARAMETER.with(773);
        Parameter.ARTICLE_TITLE = CustomParameter.CUSTOM_PAGE_PARAMETER.with(774);
        Parameter.CONTENT_TAGS = CustomParameter.CUSTOM_PAGE_PARAMETER.with(775);
        Parameter.PAGE_TITLE = CustomParameter.CUSTOM_PAGE_PARAMETER.with(776);
        Parameter.PAGE_TYPE = CustomParameter.CUSTOM_PAGE_PARAMETER.with(777);
        Parameter.PAGE_LENGTH = CustomParameter.CUSTOM_PAGE_PARAMETER.with(778);
        Parameter.DAYS_SINCE_PUBLICATION = CustomParameter.CUSTOM_PAGE_PARAMETER.with(779);
        Parameter.TEST_VARIANT = CustomParameter.CUSTOM_PAGE_PARAMETER.with(781);
        Parameter.TEST_EXPERIMENT = CustomParameter.CUSTOM_PAGE_PARAMETER.with(782);
        Parameter.LOGIN_STATUS = CustomParameter.CUSTOM_SESSION_PARAMETER.with(800);
        Parameter.VERSION = CustomParameter.CUSTOM_SESSION_PARAMETER.with(801);
        Parameter.TRACKING_PLATFORM = CustomParameter.CUSTOM_SESSION_PARAMETER.with(802);
        Parameter.CUSTOM_SESSION_PARAMETER = 'cs';
        Parameter.CUSTOM_PAGE_PARAMETER = 'cp';
        Parameter.CUSTOM_PRODUCT_PARAMETER = 'cb';
        Parameter.CUSTOM_ACTION_PARAMETER = 'ck';
        Parameter.CUSTOM_CAMPAIGN_PARAMETER = 'cc';
        Parameter.CUSTOM_PAGE_CATEGORY = 'cg';
        Parameter.CUSTOM_PRODUCT_CATEGORY = 'ca';
        Parameter.CUSTOM_URM_CATEGORY = 'uc';
        Parameter.SMART_PIXEL_COOKIE_NAME = 'wtstp_eid';
        Parameter.PIXEL_COOKIE_NAME = 'wt3_eid';
        Parameter.SERVER_COOKIE_NAME_PREFIX = 'wteid_';
        return Parameter;
    }());

    var ConsumerType = (function () {
        function ConsumerType() {
        }
        ConsumerType.FILE = 'FILE';
        ConsumerType.HTTP_CLIENT = 'HTTP_CLIENT';
        ConsumerType.FORK_CURL = 'FORK_CURL';
        ConsumerType.CUSTOM = 'CUSTOM';
        return ConsumerType;
    }());

    function addProperties(that, data, properties, type) {
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            if (typeof data[prop] === type) {
                that[prop] = data[prop];
            }
        }
    }
    function addArrayProperties(that, data, properties, filter) {
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var prop = properties_2[_i];
            if (data[prop] instanceof Array) {
                that[prop] = data[prop].filter(filter);
            }
        }
    }
    var Tracking = (function () {
        function Tracking(data) {
            this.trackId = "";
            this.trackDomain = "";
            this.deactivate = false;
            this.debug = false;
            this.domain = [];
            this.useParamsForDefaultPageName = [];
            this.containsInclude = [];
            this.containsExclude = [];
            this.matchesInclude = [];
            this.matchesExclude = [];
            this.matchesIncludeRegExp = [];
            this.matchesExcludeRegExp = [];
            addProperties(this, data, Tracking.STRING_PROPERTIES, 'string');
            addProperties(this, data, Tracking.BOOLEAN_PROPERTIES, 'boolean');
            addArrayProperties(this, data, Tracking.ARRAY_STRING_PROPERTIES, function (value) {
                return typeof value === 'string';
            });
            addArrayProperties(this, data, Tracking.ARRAY_STRING_REGEXP_PROPERTIES, function (value) {
                return typeof value === 'string' || value instanceof RegExp;
            });
            Tracking.convertToRegExp(this.matchesInclude, this.matchesIncludeRegExp);
            Tracking.convertToRegExp(this.matchesExclude, this.matchesExcludeRegExp);
        }
        Tracking.convertToRegExp = function (stringArray, regexpArray) {
            for (var _i = 0, stringArray_1 = stringArray; _i < stringArray_1.length; _i++) {
                var str = stringArray_1[_i];
                try {
                    var val = str;
                    if (typeof val === 'string') {
                        val = new RegExp(val);
                    }
                    regexpArray.push(val);
                }
                catch (e) {
                }
            }
        };
        Tracking.prototype.build = function () {
            return {
                trackId: this.trackId,
                trackDomain: this.trackDomain,
                deactivate: this.deactivate,
                debug: this.debug,
                domain: this.domain,
                useParamsForDefaultPageName: this.useParamsForDefaultPageName,
                containsInclude: this.containsInclude,
                containsExclude: this.containsExclude,
                matchesInclude: this.matchesIncludeRegExp,
                matchesExclude: this.matchesExcludeRegExp
            };
        };
        Tracking.STRING_PROPERTIES = ['trackId', 'trackDomain'];
        Tracking.BOOLEAN_PROPERTIES = ['deactivate', 'debug'];
        Tracking.ARRAY_STRING_PROPERTIES = [
            'useParamsForDefaultPageName', 'containsInclude', 'containsExclude'
        ];
        Tracking.ARRAY_STRING_REGEXP_PROPERTIES = [
            'domain', 'matchesInclude', 'matchesExclude'
        ];
        return Tracking;
    }());
    var Consumer = (function () {
        function Consumer(data) {
            addProperties(this, data, Consumer.STRING_PROPERTIES, 'string');
            addProperties(this, data, Consumer.NUMBER_PROPERTIES, 'number');
            addProperties(this, data, Consumer.BOOLEAN_PROPERTIES, 'boolean');
        }
        Consumer.prototype.build = function () {
            return {
                consumerType: this.consumerType,
                filePath: this.filePath,
                filePrefix: this.filePrefix,
                maxAttempt: this.maxAttempt,
                attemptTimeout: this.attemptTimeout,
                maxBatchSize: this.maxBatchSize,
                maxQueueSize: this.maxQueueSize,
                maxFileLines: this.maxFileLines,
                maxFileDuration: this.maxFileDuration,
                maxFileSize: this.maxFileSize,
                forceSSL: this.forceSSL
            };
        };
        Consumer.STRING_PROPERTIES = [
            'consumerType', 'filePath', 'filePrefix'
        ];
        Consumer.NUMBER_PROPERTIES = [
            'maxAttempt', 'attemptTimeout', 'maxBatchSize', 'maxQueueSize', 'maxFileLines', 'maxFileDuration', 'maxFileSize'
        ];
        Consumer.BOOLEAN_PROPERTIES = [
            'forceSSL'
        ];
        return Consumer;
    }());
    var ConfigFile = (function () {
        function ConfigFile(propertyFile) {
            this.tracking = new Tracking({});
            this.consumer = new Consumer({});
            var properties = {};
            try {
                properties = require(propertyFile);
                if (properties.tracking) {
                    this.tracking = new Tracking(properties.tracking);
                }
                if (properties.consumer) {
                    this.consumer = new Consumer(properties.consumer);
                }
            }
            catch (e) {
            }
        }
        ConfigFile.prototype.build = function () {
            return {
                tracking: this.tracking.build(),
                consumer: this.consumer.build(),
            };
        };
        return ConfigFile;
    }());

    var ConfigProperties = (function () {
        function ConfigProperties(propertyFile) {
            var configFile = new ConfigFile(propertyFile);
            this.prop = configFile.build();
        }
        ConfigProperties.prototype.getProperty = function (propertyName, defaultValue) {
            var hierarchy = propertyName.split('.');
            var propValue = this.prop[hierarchy[0]][hierarchy[1]];
            return ((typeof propValue !== 'undefined') ? propValue : defaultValue);
        };
        ConfigProperties.prototype.getStringProperty = function (propertyName, defaultValue) {
            return this.getProperty(propertyName, defaultValue);
        };
        ConfigProperties.prototype.getBooleanProperty = function (propertyName, defaultValue) {
            return this.getProperty(propertyName, defaultValue);
        };
        ConfigProperties.prototype.getIntegerProperty = function (propertyName, defaultValue) {
            return this.getProperty(propertyName, defaultValue);
        };
        ConfigProperties.prototype.getConsumerTypeProperty = function (propertyName, defaultValue) {
            var consumerValue = defaultValue;
            var propertyValue = this.getProperty(propertyName, consumerValue);
            switch (propertyValue) {
                case ConsumerType.FILE:
                    consumerValue = ConsumerType.FILE;
                    break;
                case ConsumerType.HTTP_CLIENT:
                    consumerValue = ConsumerType.HTTP_CLIENT;
                    break;
                case ConsumerType.FORK_CURL:
                    consumerValue = ConsumerType.FORK_CURL;
                    break;
            }
            return consumerValue;
        };
        ConfigProperties.prototype.getListProperty = function (propertyName, defaultValue) {
            return this.getProperty(propertyName, defaultValue);
        };
        return ConfigProperties;
    }());

    var Properties = (function () {
        function Properties() {
        }
        Properties.TRACK_ID = 'tracking.trackId';
        Properties.TRACK_DOMAIN = 'tracking.trackDomain';
        Properties.DEACTIVATE = 'tracking.deactivate';
        Properties.DEBUG = 'tracking.debug';
        Properties.DOMAIN = 'tracking.domain';
        Properties.USE_PARAMS_FOR_DEFAULT_PAGE_NAME = 'tracking.useParamsForDefaultPageName';
        Properties.CONTAINS_INCLUDE = 'tracking.containsInclude';
        Properties.CONTAINS_EXCLUDE = 'tracking.containsExclude';
        Properties.MATCHES_INCLUDE = 'tracking.matchesInclude';
        Properties.MATCHES_EXCLUDE = 'tracking.matchesExclude';
        Properties.CONSUMER_TYPE = 'consumer.consumerType';
        Properties.FILE_PATH = 'consumer.filePath';
        Properties.FILE_PREFIX = 'consumer.filePrefix';
        Properties.MAX_ATTEMPT = 'consumer.maxAttempt';
        Properties.ATTEMPT_TIMEOUT = 'consumer.attemptTimeout';
        Properties.MAX_BATCH_SIZE = 'consumer.maxBatchSize';
        Properties.MAX_QUEUE_SIZE = 'consumer.maxQueueSize';
        Properties.MAX_FILE_LINES = 'consumer.maxFileLines';
        Properties.MAX_FILE_DURATION = 'consumer.maxFileDuration';
        Properties.MAX_FILE_SIZE = 'consumer.maxFileSize';
        Properties.FORCE_SSL = 'consumer.forceSSL';
        return Properties;
    }());

    var DefaultLogger = (function () {
        function DefaultLogger() {
        }
        DefaultLogger.prototype.log = function (msg) {
            console.log(msg);
        };
        return DefaultLogger;
    }());

    var Messages = (function () {
        function Messages() {
        }
        Messages.REQUIRED_TRACK_ID_AND_DOMAIN = 'The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to';
        Messages.TO_LARGE_BATCH_SIZE = 'Batch size is larger than ${0} req. (${1} req.)';
        Messages.TO_LARGE_PAYLOAD_SIZE = 'Payload size is larger than 24MB (${0}MB)';
        Messages.GENERIC_ERROR = '${0} (${1})';
        Messages.CREATE_NEW_LOG_FILE = 'Create new file ${0} (${1})';
        Messages.USE_EXISTING_LOG_FILE = 'Use existing file ${0} (${1})';
        Messages.DIRECTORY_NOT_EXIST = 'Directory not exist ${0}';
        Messages.CANNOT_RENAME_TEMPORARY_FILE = 'Create new file, because cannot rename temporary file';
        Messages.WRITE_BATCH_DATA = 'Write batch data in ${0} (${1} req.)';
        Messages.EXECUTE_COMMAND = 'Execute command: ${0}';
        Messages.SEND_BATCH_DATA = 'Send batch data to ${0} (${1} req.)';
        Messages.BATCH_REQUEST_STATUS = 'Batch request responding the status code ${0}';
        Messages.BATCH_RESPONSE_TEXT = '[${0}]: ${1}';
        Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_COOKIE = Messages.REQUIRED_TRACK_ID_AND_DOMAIN + ' get user cookie';
        Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_TRACKING = Messages.REQUIRED_TRACK_ID_AND_DOMAIN + ' track data';
        Messages.TRACKING_IS_DEACTIVATED = 'Mapp Intelligence tracking is deactivated';
        Messages.TRACKING_IS_DEACTIVATED_BY_IN_AND_EXCLUDE = Messages.TRACKING_IS_DEACTIVATED + ' by include / exclude';
        Messages.SENT_BATCH_REQUESTS = 'Sent batch requests, current queue size is ${0} req.';
        Messages.BATCH_REQUEST_FAILED = 'Batch request failed!';
        Messages.CURRENT_QUEUE_STATUS = 'Batch of ${0} req. sent, current queue size is ${1} req.';
        Messages.QUEUE_IS_EMPTY = 'MappIntelligenceQueue is empty';
        Messages.ADD_THE_FOLLOWING_REQUEST_TO_QUEUE = 'Add the following request to queue (${0} req.): ${1}';
        Messages.MAPP_INTELLIGENCE = '[Mapp Intelligence]: ';
        Messages.REQUIRED_TRACK_ID = 'Argument \'-i\' or alternative \'--trackId\' are required';
        Messages.REQUIRED_TRACK_DOMAIN = 'Argument \'-d\' or alternative \'--trackDomain\' are required';
        Messages.UNSUPPORTED_OPTION = 'Unsupported config option';
        Messages.OPTION_TRACK_ID = 'Enter your Mapp Intelligence track ID provided by Mapp.';
        Messages.OPTION_TRACK_DOMAIN = 'Enter your Mapp Intelligence tracking domain.';
        Messages.OPTION_CONFIG = 'Enter the path to your configuration file (*.json or *.js).';
        Messages.OPTION_FILE_PATH = 'Enter the path to your request logging files.';
        Messages.OPTION_FILE_PREFIX = 'Enter the prefix for your request logging files.';
        Messages.OPTION_DEACTIVATE = 'Deactivate the tracking functionality.';
        Messages.OPTION_HELP = 'Display the help (this text) and exit.';
        Messages.OPTION_DEBUG = 'Activates the debug mode. The debug mode sends messages to the command line.';
        Messages.OPTION_VERSION = 'Display version and exit.';
        Messages.REQUEST_LOG_FILES_NOT_FOUND = 'Request log files "${0}" not found';
        Messages.RENAME_EXPIRED_TEMPORARY_FILE = 'Rename expired temporary file into log file';
        Messages.HELP_SYNTAX = 'node ./mapp-intelligence-java-cronjob.js';
        Messages.HELP_HEADER = 'Send the logfile requests to the Mapp tracking server and delete your logfiles to keep it at a manageable size.\n';
        Messages.HELP_FOOTER = '';
        return Messages;
    }());

    var Config = (function () {
        function Config(tId, tDomain) {
            this.PORT_80 = '80';
            this.PORT_443 = '443';
            this.MAX_ATTEMPT = 5;
            this.MAX_ATTEMPT_TIMEOUT = 500;
            this.trackId = '';
            this.trackDomain = '';
            this.domain = [];
            this.deactivate = false;
            this.deactivateByInAndExclude = false;
            this.consumerType = ConsumerType.HTTP_CLIENT;
            this.filePath = '';
            this.filePrefix = '';
            this.maxAttempt = 1;
            this.attemptTimeout = Config.DEFAULT_ATTEMPT_TIMEOUT;
            this.maxBatchSize = Config.DEFAULT_MAX_BATCH_SIZE;
            this.maxQueueSize = Config.DEFAULT_MAX_QUEUE_SIZE;
            this.maxFileLines = Config.DEFAULT_MAX_FILE_LINES;
            this.maxFileDuration = Config.DEFAULT_MAX_FILE_DURATION;
            this.maxFileSize = Config.DEFAULT_MAX_FILE_SIZE;
            this.forceSSL = true;
            this.useParamsForDefaultPageName = [];
            this.userAgent = '';
            this.remoteAddress = '';
            this.referrerURL = '';
            this.cookie = {};
            this.containsInclude = [];
            this.containsExclude = [];
            this.matchesInclude = [];
            this.matchesExclude = [];
            if (arguments.length === 2) {
                this.trackId = (tId) ? tId : this.trackId;
                this.trackDomain = (tDomain) ? tDomain : this.trackDomain;
            }
            if (arguments.length === 1 && typeof arguments[0] === 'string') {
                var prop = new ConfigProperties(tId);
                this.setTrackId(prop.getStringProperty(Properties.TRACK_ID, this.trackId))
                    .setTrackDomain(prop.getStringProperty(Properties.TRACK_DOMAIN, this.trackDomain))
                    .setDeactivate(prop.getBooleanProperty(Properties.DEACTIVATE, false))
                    .setDebug(prop.getBooleanProperty(Properties.DEBUG, false))
                    .setDomain(prop.getListProperty(Properties.DOMAIN, this.domain))
                    .setUseParamsForDefaultPageName(prop.getListProperty(Properties.USE_PARAMS_FOR_DEFAULT_PAGE_NAME, this.useParamsForDefaultPageName))
                    .setConsumerType(prop.getConsumerTypeProperty(Properties.CONSUMER_TYPE, this.consumerType))
                    .setFilePath(prop.getStringProperty(Properties.FILE_PATH, this.filePath))
                    .setFilePrefix(prop.getStringProperty(Properties.FILE_PREFIX, this.filePrefix))
                    .setMaxAttempt(prop.getIntegerProperty(Properties.MAX_ATTEMPT, this.maxAttempt))
                    .setAttemptTimeout(prop.getIntegerProperty(Properties.ATTEMPT_TIMEOUT, this.attemptTimeout))
                    .setMaxBatchSize(prop.getIntegerProperty(Properties.MAX_BATCH_SIZE, this.maxBatchSize))
                    .setMaxQueueSize(prop.getIntegerProperty(Properties.MAX_QUEUE_SIZE, this.maxQueueSize))
                    .setMaxFileLines(prop.getIntegerProperty(Properties.MAX_FILE_LINES, this.maxFileLines))
                    .setMaxFileDuration(prop.getIntegerProperty(Properties.MAX_FILE_DURATION, this.maxFileDuration))
                    .setMaxFileSize(prop.getIntegerProperty(Properties.MAX_FILE_SIZE, this.maxFileSize))
                    .setForceSSL(prop.getBooleanProperty(Properties.FORCE_SSL, true))
                    .setContainsInclude(prop.getListProperty(Properties.CONTAINS_INCLUDE, this.containsInclude))
                    .setContainsExclude(prop.getListProperty(Properties.CONTAINS_EXCLUDE, this.containsExclude))
                    .setMatchesInclude(prop.getListProperty(Properties.MATCHES_INCLUDE, this.matchesInclude))
                    .setMatchesExclude(prop.getListProperty(Properties.MATCHES_EXCLUDE, this.matchesExclude));
            }
        }
        Config.prototype.getOwnDomain = function () {
            if (!this.requestURL) {
                return '';
            }
            var serverPort = this.requestURL.port;
            if (serverPort === this.PORT_80 || serverPort === this.PORT_443 || !serverPort) {
                return this.requestURL.hostname;
            }
            return this.requestURL.host;
        };
        Config.prototype.getStatistics = function () {
            var statistics = 0;
            if (this.useParamsForDefaultPageName.length > 0) {
                statistics += 1;
            }
            if (this.forceSSL) {
                statistics += 2;
            }
            if (this.logger) {
                statistics += 4;
            }
            if (this.consumerType === ConsumerType.FORK_CURL) {
                statistics += 16;
            }
            if (this.consumerType === ConsumerType.HTTP_CLIENT) {
                statistics += 32;
            }
            if (this.consumerType === ConsumerType.FILE) {
                statistics += 128;
            }
            if (this.consumerType === ConsumerType.CUSTOM) {
                statistics += 256;
            }
            return statistics;
        };
        Config.prototype.checkContains = function (list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var s = list_1[_i];
                if (this.requestURL.href.indexOf(s) !== -1) {
                    return true;
                }
            }
            return false;
        };
        Config.prototype.checkMatches = function (list) {
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var s = list_2[_i];
                try {
                    if (this.requestURL.href.search(s) !== -1) {
                        return true;
                    }
                }
                catch (e) {
                    this.logger.log(Messages.GENERIC_ERROR, e.name, e.message);
                }
            }
            return false;
        };
        Config.prototype.isDeactivateByInAndExclude = function () {
            if (!this.requestURL) {
                return false;
            }
            var isContainsIncludeEmpty = this.containsInclude.length === 0;
            var isMatchesIncludeEmpty = this.matchesInclude.length === 0;
            var isContainsExcludeEmpty = this.containsExclude.length === 0;
            var isMatchesExcludeEmpty = this.matchesExclude.length === 0;
            var isIncluded = isContainsIncludeEmpty && isMatchesIncludeEmpty;
            if (!isContainsIncludeEmpty) {
                isIncluded = this.checkContains(this.containsInclude);
            }
            if (!isIncluded && !isMatchesIncludeEmpty) {
                isIncluded = this.checkMatches(this.matchesInclude);
            }
            if (isIncluded && !isContainsExcludeEmpty) {
                isIncluded = !this.checkContains(this.containsExclude);
            }
            if (isIncluded && !isMatchesExcludeEmpty) {
                isIncluded = !this.checkMatches(this.matchesExclude);
            }
            return !isIncluded;
        };
        Config.decode = function (str) {
            if (str) {
                try {
                    return decodeURIComponent(str);
                }
                catch (e) {
                    return unescape(str);
                }
            }
            return '';
        };
        Config.getOrDefault = function (value, def) {
            return (value) ? value : def;
        };
        Config.prototype.setTrackId = function (tId) {
            this.trackId = Config.getOrDefault(tId, this.trackId);
            return this;
        };
        Config.prototype.setTrackDomain = function (tDomain) {
            this.trackDomain = Config.getOrDefault(tDomain, this.trackDomain);
            return this;
        };
        Config.prototype.setUserAgent = function (ua) {
            this.userAgent = Config.getOrDefault(Config.decode(ua), this.userAgent);
            return this;
        };
        Config.prototype.setRemoteAddress = function (ra) {
            this.remoteAddress = Config.getOrDefault(Config.decode(ra), this.remoteAddress);
            return this;
        };
        Config.prototype.setReferrerURL = function (refURL) {
            this.referrerURL = Config.getOrDefault(refURL, this.referrerURL);
            return this;
        };
        Config.prototype.setRequestURL = function (rURL) {
            try {
                this.requestURL = new URL(rURL);
            }
            catch (e) {
            }
            return this;
        };
        Config.prototype.addCookie = function (name, value) {
            if (name && value) {
                this.cookie[Config.decode(name)] = Config.decode(value);
            }
            return this;
        };
        Config.prototype.setCookie = function (cookies) {
            var c = Config.getOrDefault(cookies, {});
            for (var key in c) {
                this.addCookie(key, c[key]);
            }
            return this;
        };
        Config.prototype.setDomain = function (d) {
            this.domain = Config.getOrDefault(d, this.domain);
            return this;
        };
        Config.prototype.addDomain = function (d) {
            if (d) {
                this.domain.push(d);
            }
            return this;
        };
        Config.prototype.setLogger = function (l) {
            this.logger = Config.getOrDefault(l, this.logger);
            return this;
        };
        Config.prototype.setDebug = function (d) {
            if (d) {
                this.setLogger(new DefaultLogger());
            }
            return this;
        };
        Config.prototype.setDeactivate = function (d) {
            this.deactivate = d;
            return this;
        };
        Config.prototype.setConsumerType = function (cType) {
            this.consumerType = Config.getOrDefault(cType, this.consumerType);
            return this;
        };
        Config.prototype.setConsumer = function (c) {
            this.consumer = Config.getOrDefault(c, this.consumer);
            return this;
        };
        Config.prototype.setFilePath = function (f) {
            this.filePath = Config.getOrDefault(f, this.filePath);
            return this;
        };
        Config.prototype.setFilePrefix = function (f) {
            this.filePrefix = Config.getOrDefault(f, this.filePrefix);
            return this;
        };
        Config.prototype.setMaxAttempt = function (mAttempt) {
            if (mAttempt >= 1 && mAttempt <= this.MAX_ATTEMPT) {
                this.maxAttempt = mAttempt;
            }
            return this;
        };
        Config.prototype.setAttemptTimeout = function (aTimeout) {
            if (aTimeout >= 1 && aTimeout <= this.MAX_ATTEMPT_TIMEOUT) {
                this.attemptTimeout = aTimeout;
            }
            return this;
        };
        Config.prototype.setMaxBatchSize = function (mBatchSize) {
            this.maxBatchSize = mBatchSize;
            return this;
        };
        Config.prototype.setMaxQueueSize = function (mQueueSize) {
            this.maxQueueSize = mQueueSize;
            return this;
        };
        Config.prototype.setMaxFileLines = function (mFileLines) {
            if (mFileLines >= 1 && mFileLines <= Config.DEFAULT_MAX_FILE_LINES) {
                this.maxFileLines = mFileLines;
            }
            return this;
        };
        Config.prototype.setMaxFileDuration = function (mFileDuration) {
            if (mFileDuration >= 1 && mFileDuration <= Config.DEFAULT_MAX_FILE_DURATION) {
                this.maxFileDuration = mFileDuration;
            }
            return this;
        };
        Config.prototype.setMaxFileSize = function (mFileSize) {
            if (mFileSize >= 1 && mFileSize <= Config.DEFAULT_MAX_FILE_SIZE) {
                this.maxFileSize = mFileSize;
            }
            return this;
        };
        Config.prototype.setForceSSL = function (fSSL) {
            this.forceSSL = fSSL;
            return this;
        };
        Config.prototype.setUseParamsForDefaultPageName = function (uParamsForDefaultPageName) {
            this.useParamsForDefaultPageName = Config.getOrDefault(uParamsForDefaultPageName, this.useParamsForDefaultPageName);
            return this;
        };
        Config.prototype.addUseParamsForDefaultPageName = function (uParamsForDefaultPageName) {
            if (uParamsForDefaultPageName) {
                this.useParamsForDefaultPageName.push(uParamsForDefaultPageName);
            }
            return this;
        };
        Config.prototype.setContainsInclude = function (containsInclude) {
            this.containsInclude = Config.getOrDefault(containsInclude, this.containsInclude);
            return this;
        };
        Config.prototype.addContainsInclude = function (containsInclude) {
            if (containsInclude) {
                this.containsInclude.push(containsInclude);
            }
            return this;
        };
        Config.prototype.setContainsExclude = function (containsExclude) {
            this.containsExclude = Config.getOrDefault(containsExclude, this.containsExclude);
            return this;
        };
        Config.prototype.addContainsExclude = function (containsExclude) {
            if (containsExclude) {
                this.containsExclude.push(containsExclude);
            }
            return this;
        };
        Config.prototype.setMatchesInclude = function (matchesInclude) {
            this.matchesInclude = Config.getOrDefault(matchesInclude, this.matchesInclude);
            return this;
        };
        Config.prototype.addMatchesInclude = function (matchesInclude) {
            if (matchesInclude) {
                this.matchesInclude.push(matchesInclude);
            }
            return this;
        };
        Config.prototype.setMatchesExclude = function (matchesExclude) {
            this.matchesExclude = Config.getOrDefault(matchesExclude, this.matchesExclude);
            return this;
        };
        Config.prototype.addMatchesExclude = function (matchesExclude) {
            if (matchesExclude) {
                this.matchesExclude.push(matchesExclude);
            }
            return this;
        };
        Config.prototype.build = function () {
            if (this.domain.length === 0) {
                this.domain.push(this.getOwnDomain());
            }
            if (this.consumerType === ConsumerType.FILE) {
                if (!this.filePath) {
                    this.filePath = os.tmpdir();
                }
                if (!this.filePrefix) {
                    this.filePrefix = 'MappIntelligenceRequests';
                }
                this.maxBatchSize = 1;
            }
            if (this.containsInclude.length > 0 || this.containsExclude.length > 0 || this.matchesInclude.length > 0 || this.matchesExclude.length > 0) {
                this.deactivateByInAndExclude = this.isDeactivateByInAndExclude();
            }
            var statistics = this.getStatistics();
            return {
                trackId: this.trackId,
                trackDomain: this.trackDomain,
                domain: this.domain,
                deactivate: this.deactivate,
                deactivateByInAndExclude: this.deactivateByInAndExclude,
                logger: this.logger,
                consumer: this.consumer,
                consumerType: this.consumerType,
                filePath: this.filePath,
                filePrefix: this.filePrefix,
                maxAttempt: this.maxAttempt,
                attemptTimeout: this.attemptTimeout,
                maxBatchSize: this.maxBatchSize,
                maxQueueSize: this.maxQueueSize,
                maxFileLines: this.maxFileLines,
                maxFileDuration: this.maxFileDuration,
                maxFileSize: this.maxFileSize,
                forceSSL: this.forceSSL,
                useParamsForDefaultPageName: this.useParamsForDefaultPageName,
                userAgent: this.userAgent,
                remoteAddress: this.remoteAddress,
                referrerURL: this.referrerURL,
                requestURL: this.requestURL,
                cookie: this.cookie,
                containsInclude: this.containsInclude,
                containsExclude: this.containsExclude,
                matchesInclude: this.matchesInclude,
                matchesExclude: this.matchesExclude,
                statistics: statistics
            };
        };
        Config.DEFAULT_ATTEMPT_TIMEOUT = 100;
        Config.DEFAULT_MAX_BATCH_SIZE = 50;
        Config.DEFAULT_MAX_QUEUE_SIZE = 1000;
        Config.DEFAULT_MAX_FILE_LINES = 10 * 1000;
        Config.DEFAULT_MAX_FILE_DURATION = 30 * 60 * 1000;
        Config.DEFAULT_MAX_FILE_SIZE = 24 * 1024 * 1024;
        return Config;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    var DebugLogger = (function () {
        function DebugLogger(l) {
            this.logger = l;
        }
        DebugLogger.format = function (format) {
            var val = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                val[_i - 1] = arguments[_i];
            }
            var str = format;
            for (var index = 0; index < val.length; index++) {
                str = str.replace('${' + index + '}', val[index]);
            }
            return str;
        };
        DebugLogger.prototype.log = function () {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (this.logger) {
                var format = Messages.MAPP_INTELLIGENCE + msg.shift();
                if (msg.length === 0) {
                    this.logger.log(format);
                }
                else {
                    this.logger.log(DebugLogger.format.apply(DebugLogger, __spreadArray([format], msg)));
                }
            }
        };
        return DebugLogger;
    }());

    var ServerCookie = (function () {
        function ServerCookie(n, v) {
            this.domain = '';
            this.path = '';
            this.name = n;
            this.value = v;
        }
        ServerCookie.prototype.setDomain = function (d) {
            this.domain = d;
        };
        ServerCookie.prototype.getDomain = function () {
            return this.domain;
        };
        ServerCookie.prototype.setMaxAge = function (e) {
            this.expiry = e;
        };
        ServerCookie.prototype.getMaxAge = function () {
            return this.expiry;
        };
        ServerCookie.prototype.setPath = function (p) {
            this.path = p;
        };
        ServerCookie.prototype.getPath = function () {
            return this.path;
        };
        ServerCookie.prototype.setSecure = function (s) {
            this.secure = s;
        };
        ServerCookie.prototype.isSecure = function () {
            return this.secure;
        };
        ServerCookie.prototype.getName = function () {
            return this.name;
        };
        ServerCookie.prototype.getValue = function () {
            return this.value;
        };
        ServerCookie.prototype.setHttpOnly = function (isHttpOnly) {
            this.httpOnly = isHttpOnly;
        };
        ServerCookie.prototype.isHttpOnly = function () {
            return this.httpOnly;
        };
        return ServerCookie;
    }());

    var Enrichment = (function () {
        function Enrichment(config) {
            this.trackId = config['trackId'];
            this.trackDomain = config['trackDomain'];
            this.domain = config['domain'];
            this.referrerURL = config['referrerURL'];
            this.userAgent = config['userAgent'];
            this.remoteAddress = config['remoteAddress'];
            this.requestURL = config['requestURL'];
            this.useParamsForDefaultPageName = config['useParamsForDefaultPageName'];
            this.cookie = config['cookie'];
            this.everId = this.getUserId();
            var l = config['logger'];
            this.logger = new DebugLogger(l);
        }
        Enrichment.decode = function (str) {
            try {
                return decodeURIComponent(str);
            }
            catch (e) {
                return unescape(str);
            }
        };
        Enrichment.encode = function (str) {
            try {
                return encodeURIComponent(str);
            }
            catch (e) {
                return escape(str);
            }
        };
        Enrichment.getTimestamp = function () {
            return Date.now();
        };
        Enrichment.getReferrerDomain = function (referrer) {
            var referrerSplit = referrer.split('/');
            if (referrerSplit.length >= 2) {
                return referrerSplit[2].toLowerCase();
            }
            return '';
        };
        Enrichment.prototype.isOwnDomain = function (referrer) {
            if (referrer === '0') {
                return false;
            }
            var referrerDomain = Enrichment.getReferrerDomain(referrer);
            var d;
            for (var _i = 0, _a = this.domain; _i < _a.length; _i++) {
                d = _a[_i];
                try {
                    if (typeof d === 'string') {
                        if (d === referrerDomain) {
                            return true;
                        }
                    }
                    else if (d.test(referrerDomain)) {
                        return true;
                    }
                }
                catch (e) {
                    this.logger.log(Messages.GENERIC_ERROR, e.name, e.message);
                }
            }
            return false;
        };
        Enrichment.prototype.getReferrer = function () {
            var referrer = ((!this.referrerURL) ? '0' : Enrichment.decode(this.referrerURL));
            if (this.isOwnDomain(referrer)) {
                referrer = '1';
            }
            return Enrichment.encode(referrer);
        };
        Enrichment.prototype.getCookieValue = function (cookieName) {
            return ((this.cookie[cookieName]) ? this.cookie[cookieName] : '');
        };
        Enrichment.prototype.getUserId = function () {
            var eid = '';
            var smartPixelCookie = this.getCookieValue(Parameter.SMART_PIXEL_COOKIE_NAME);
            var trackServerCookie = this.getCookieValue(Parameter.SERVER_COOKIE_NAME_PREFIX + this.trackId);
            var oldPixelCookie = this.getCookieValue(Parameter.PIXEL_COOKIE_NAME);
            if (smartPixelCookie) {
                eid = smartPixelCookie;
            }
            else if (trackServerCookie) {
                eid = trackServerCookie;
            }
            else if (oldPixelCookie) {
                var everIdValues = oldPixelCookie.split(';');
                var everIdValue = void 0;
                for (var _i = 0, everIdValues_1 = everIdValues; _i < everIdValues_1.length; _i++) {
                    everIdValue = everIdValues_1[_i];
                    if (everIdValue.indexOf(this.trackId + '|') !== -1) {
                        var regexp = new RegExp(this.trackId + '\\|', 'ig');
                        var tmpEverId = everIdValue.replace(regexp, '');
                        eid = tmpEverId.split('#')[0];
                    }
                }
            }
            return eid;
        };
        Enrichment.zeroPad = function (n, countZeros) {
            var zeroString = '';
            for (var i = 0; i <= countZeros; i++) {
                zeroString += '0';
            }
            var result = zeroString + n;
            return result.substring((result.length - countZeros), result.length);
        };
        Enrichment.generateUserId = function () {
            var seconds = Math.floor(Enrichment.getTimestamp() / 1000);
            return ('8'
                + Enrichment.zeroPad(seconds, 10)
                + Enrichment.zeroPad(Math.floor(Math.random() * Enrichment.MAX_RANDOM), 8));
        };
        Enrichment.prototype.setUserIdCookie = function (n, v, d) {
            if (n === void 0) { n = Parameter.SMART_PIXEL_COOKIE_NAME; }
            if (v === void 0) { v = ''; }
            if (d === void 0) { d = ''; }
            var value = v;
            if (!value) {
                value = this.everId;
            }
            var everIdCookie = new ServerCookie(n, value);
            if (d) {
                everIdCookie.setDomain(d);
            }
            everIdCookie.setMaxAge(Enrichment.MAX_COOKIE_AGE);
            everIdCookie.setPath('/');
            everIdCookie.setSecure(true);
            everIdCookie.setHttpOnly(true);
            return everIdCookie;
        };
        Enrichment.prototype.isOwnTrackDomain = function () {
            return !/^.+\.(wt-.*|webtrekk|webtrekk-.*)\.net$/.test(this.trackDomain);
        };
        Enrichment.prototype.getUserAgent = function () {
            return this.userAgent;
        };
        Enrichment.prototype.getUserIP = function () {
            return this.remoteAddress;
        };
        Enrichment.prototype.getRequestURI = function () {
            if (!this.requestURL) {
                return '';
            }
            return Enrichment.decode(this.requestURL.toString()).split('//')[1];
        };
        Enrichment.prototype.getQueryMap = function () {
            var map = {};
            if (!this.requestURL) {
                return map;
            }
            var queryString = Enrichment.decode(this.requestURL.search);
            if (queryString) {
                var params = queryString.split('?')[1].split('&');
                var param = void 0;
                for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                    param = params_1[_i];
                    var paramSplit = param.split('=');
                    map[paramSplit[0]] = paramSplit[1];
                }
            }
            return map;
        };
        Enrichment.prototype.getMandatoryQueryParameter = function (pageName) {
            return "600," + Enrichment.encode(pageName) + ",,,,," + Enrichment.getTimestamp() + "," + this.getReferrer() + ",,";
        };
        Enrichment.prototype.getDefaultPageName = function () {
            var plainUrl = this.getRequestURI().split('?')[0];
            var parameterList = [];
            var queryMap = this.getQueryMap();
            var parameterKey;
            for (var _i = 0, _a = this.useParamsForDefaultPageName; _i < _a.length; _i++) {
                parameterKey = _a[_i];
                var parameterValue = queryMap[parameterKey] ? queryMap[parameterKey] : '';
                if (parameterValue) {
                    parameterList.push(parameterKey + "=" + parameterValue);
                }
            }
            if (parameterList.length > 0) {
                plainUrl += '?' + parameterList.join('&');
            }
            if (!plainUrl) {
                plainUrl = '0';
            }
            return plainUrl.toLowerCase();
        };
        Enrichment.prototype.getEverId = function () {
            return this.everId;
        };
        Enrichment.prototype.getUserIdCookie = function (pixelVersion, context) {
            var c = null;
            if (!this.everId) {
                this.everId = Enrichment.generateUserId();
                if (context === ACore.SERVER_SIDE_COOKIE) {
                    if (this.isOwnTrackDomain()) {
                        var trackDomainSplit = this.trackDomain.split('.');
                        trackDomainSplit.shift();
                        var cookieDomain = trackDomainSplit.join('.');
                        c = this.setUserIdCookie(Parameter.SERVER_COOKIE_NAME_PREFIX + this.trackId, '', cookieDomain);
                    }
                }
                else {
                    if (pixelVersion === ACore.V4 || pixelVersion === ACore.V5) {
                        var cookieValue = this.getCookieValue(Parameter.PIXEL_COOKIE_NAME);
                        cookieValue += ";" + this.trackId + "|" + this.everId;
                        c = this.setUserIdCookie(Parameter.PIXEL_COOKIE_NAME, cookieValue);
                    }
                    if (pixelVersion === ACore.SMART) {
                        c = this.setUserIdCookie();
                    }
                }
            }
            return c;
        };
        Enrichment.MAX_COOKIE_AGE = 60 * 60 * 24 * 30 * 6;
        Enrichment.MAX_RANDOM = 100000000;
        return Enrichment;
    }());

    var AConsumer = (function () {
        function AConsumer(config) {
            this.forceSSL = ((typeof config['forceSSL'] === 'boolean') ? config['forceSSL'] : true);
            this.trackDomain = ((config['trackDomain']) ? config['trackDomain'] : '');
            this.trackId = ((config['trackId']) ? config['trackId'] : '');
            this.logger = new DebugLogger(config['logger']);
        }
        AConsumer.prototype.getPort = function () {
            var trackDomainSplit = this.trackDomain.split(':');
            if (typeof trackDomainSplit[1] !== 'undefined') {
                return parseInt(trackDomainSplit[1]);
            }
            return ((this.forceSSL) ? 443 : 80);
        };
        AConsumer.prototype.getUrl = function () {
            var url = ((this.forceSSL) ? "https://" : "http://");
            url += this.trackDomain + "/" + this.trackId + "/batch";
            return url;
        };
        AConsumer.prototype.getHTTPOptions = function () {
            return {
                hostname: this.trackDomain.split(':')[0],
                port: this.getPort(),
                path: "/" + this.trackId + "/batch",
                method: 'POST',
                timeout: AConsumer.DEFAULT_CONNECT_TIMEOUT,
                headers: {
                    'Content-Type': 'text/plain; utf-8'
                }
            };
        };
        AConsumer.prototype.getHTTPClient = function (options, callback) {
            return ((this.forceSSL) ? https.request(options, callback) : http.request(options, callback));
        };
        AConsumer.prototype.verifyPayload = function (batchContent) {
            var currentBatchSize = batchContent.length;
            if (currentBatchSize > AConsumer.MAX_BATCH_SIZE) {
                this.logger.log(Messages.TO_LARGE_BATCH_SIZE, AConsumer.MAX_BATCH_SIZE, currentBatchSize);
                return '';
            }
            var payload = batchContent.join(os.EOL);
            if (payload.length >= AConsumer.MAX_PAYLOAD_SIZE) {
                var length = payload.length;
                var div = length / AConsumer.INTEGER_1024 / AConsumer.INTEGER_1024 * AConsumer.DOUBLE_100;
                var currentPayloadSize = Math.round(div) / AConsumer.DOUBLE_100;
                this.logger.log(Messages.TO_LARGE_PAYLOAD_SIZE, currentPayloadSize);
                return '';
            }
            return payload;
        };
        AConsumer.MAX_PAYLOAD_SIZE = 24 * 1024 * 1024;
        AConsumer.MAX_BATCH_SIZE = 10 * 1000;
        AConsumer.DOUBLE_100 = 100;
        AConsumer.INTEGER_1024 = 1024;
        AConsumer.DEFAULT_MAX_FILE_LINES = 10 * 1000;
        AConsumer.DEFAULT_MAX_FILE_DURATION = 30 * 60 * 1000;
        AConsumer.DEFAULT_MAX_FILE_SIZE = 24 * 1024 * 1024;
        AConsumer.DEFAULT_CONNECT_TIMEOUT = 30 * 1000;
        return AConsumer;
    }());

    var ConsumerHttpClient = (function (_super) {
        __extends(ConsumerHttpClient, _super);
        function ConsumerHttpClient(config) {
            return _super.call(this, config) || this;
        }
        ConsumerHttpClient.prototype.sendBatch = function (batchContent) {
            var that = this;
            return new Promise(function (resolve) {
                var payload = that.verifyPayload(batchContent);
                if (!payload) {
                    return resolve(false);
                }
                var logger = that.logger;
                var httpOptions = that.getHTTPOptions();
                var currentBatchSize = batchContent.length;
                logger.log(Messages.SEND_BATCH_DATA, httpOptions['hostname'], currentBatchSize);
                var request = that.getHTTPClient(httpOptions, function (response) {
                    var httpStatus = response.statusCode;
                    logger.log(Messages.BATCH_REQUEST_STATUS, httpStatus);
                    if (httpStatus >= 400) {
                        return resolve(false);
                    }
                    return resolve(true);
                });
                request.on('timeout', function () {
                    request.destroy();
                });
                request.on('error', function (error) {
                    logger.log(Messages.GENERIC_ERROR, error.name, error.message);
                    resolve(false);
                });
                request.write(payload);
                request.end();
            });
        };
        return ConsumerHttpClient;
    }(AConsumer));

    var ConsumerFile = (function (_super) {
        __extends(ConsumerFile, _super);
        function ConsumerFile(config) {
            var _this = _super.call(this, config) || this;
            _this.fileName = '';
            _this.filePath = config['filePath'];
            _this.filePrefix = config['filePrefix'];
            _this.maxFileLines = config['maxFileLines'] ? config['maxFileLines'] : ConsumerFile.DEFAULT_MAX_FILE_LINES;
            _this.maxFileDuration = config['maxFileDuration'] ? config['maxFileDuration'] : ConsumerFile.DEFAULT_MAX_FILE_DURATION;
            _this.maxFileSize = config['maxFileSize'] ? config['maxFileSize'] : ConsumerFile.DEFAULT_MAX_FILE_SIZE;
            return _this;
        }
        ConsumerFile.getTimestamp = function () {
            return Date.now();
        };
        ConsumerFile.prototype.getNewTempFile = function () {
            return __awaiter(this, void 0, Promise, function () {
                var newTempFileName, newTempFilePath, message, e_1, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timestamp = ConsumerFile.getTimestamp();
                            newTempFileName = this.filePrefix + "-" + this.timestamp + ConsumerFile.TEMPORARY_FILE_EXTENSION;
                            newTempFilePath = this.filePath + "/" + newTempFileName;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            message = Messages.USE_EXISTING_LOG_FILE;
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, fs.promises.stat(newTempFilePath)];
                        case 3:
                            _a.sent();
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            message = Messages.CREATE_NEW_LOG_FILE;
                            return [3, 5];
                        case 5:
                            this.logger.log(message, this.filePrefix + "-" + this.timestamp + ConsumerFile.TEMPORARY_FILE_EXTENSION, this.filePath);
                            this.fileName = newTempFileName;
                            return [4, fs.promises.open(newTempFilePath, 'a+')];
                        case 6: return [2, _a.sent()];
                        case 7:
                            e_2 = _a.sent();
                            this.logger.log(Messages.GENERIC_ERROR, e_2.name, e_2.message);
                            return [3, 8];
                        case 8: return [2, null];
                    }
                });
            });
        };
        ConsumerFile.prototype.getCurrentFileContent = function (file) {
            return __awaiter(this, void 0, Promise, function () {
                var content, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            content = '';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, file.readFile()];
                        case 2:
                            content = (_a.sent()).toString();
                            return [3, 4];
                        case 3:
                            e_3 = _a.sent();
                            this.logger.log(Messages.GENERIC_ERROR, e_3.name, e_3.message);
                            return [3, 4];
                        case 4: return [2, content];
                    }
                });
            });
        };
        ConsumerFile.prototype.extractTimestamp = function () {
            var defaultTimestamp = 0;
            var readTimestamp = this.fileName.replace(/^.+-(\d{13})\..+$/, '$1');
            if (readTimestamp && !isNaN(parseInt(readTimestamp))) {
                defaultTimestamp = parseInt(readTimestamp);
            }
            return defaultTimestamp;
        };
        ConsumerFile.prototype.getWriteableFile = function () {
            return __awaiter(this, void 0, Promise, function () {
                var that, file, f, files, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            that = this;
                            file = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, , 9]);
                            return [4, fs.promises.stat(this.filePath)];
                        case 2:
                            _a.sent();
                            return [4, fs.promises.readdir(this.filePath)];
                        case 3:
                            f = _a.sent();
                            files = f.filter(function (value) {
                                var regex = new RegExp("^" + that.filePrefix + ".*" + ConsumerFile.TEMPORARY_FILE_EXTENSION + "$");
                                return regex.test(value);
                            });
                            if (!(!files || files.length <= 0)) return [3, 5];
                            return [4, this.getNewTempFile()];
                        case 4:
                            file = _a.sent();
                            return [3, 7];
                        case 5:
                            this.fileName = files[0];
                            return [4, fs.promises.open(this.filePath + "/" + this.fileName, 'a+')];
                        case 6:
                            file = _a.sent();
                            this.timestamp = this.extractTimestamp();
                            this.logger.log(Messages.USE_EXISTING_LOG_FILE, files[0], this.filePath);
                            _a.label = 7;
                        case 7: return [3, 9];
                        case 8:
                            e_4 = _a.sent();
                            this.logger.log(Messages.DIRECTORY_NOT_EXIST, this.filePath);
                            return [3, 9];
                        case 9: return [2, file];
                    }
                });
            });
        };
        ConsumerFile.prototype.renameAndCreateNewTempFile = function (file) {
            return __awaiter(this, void 0, Promise, function () {
                var i, name, fileHandle, oldFileName, newFileName, e_5, e_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = this.fileName.lastIndexOf('.');
                            name = this.fileName.substring(0, i);
                            oldFileName = this.filePath + "/" + this.fileName;
                            newFileName = this.filePath + "/" + name + ConsumerFile.LOG_FILE_EXTENSION;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4, this.close(file)];
                        case 2:
                            _a.sent();
                            return [4, fs.promises.rename(oldFileName, newFileName)];
                        case 3:
                            _a.sent();
                            return [3, 5];
                        case 4:
                            e_5 = _a.sent();
                            return [3, 5];
                        case 5:
                            _a.trys.push([5, 8, , 10]);
                            return [4, fs.promises.stat(oldFileName)];
                        case 6:
                            _a.sent();
                            this.logger.log(Messages.CANNOT_RENAME_TEMPORARY_FILE);
                            return [4, this.getNewTempFile()];
                        case 7:
                            fileHandle = _a.sent();
                            return [3, 10];
                        case 8:
                            e_6 = _a.sent();
                            return [4, this.getWriteableFile()];
                        case 9:
                            fileHandle = _a.sent();
                            return [3, 10];
                        case 10: return [2, fileHandle];
                    }
                });
            });
        };
        ConsumerFile.prototype.isFileLimitReached = function (file, batchContentSize) {
            return __awaiter(this, void 0, Promise, function () {
                var fileContent, fileLines, fileLinesReached, fileDurationReached, fileSizeReached;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getCurrentFileContent(file)];
                        case 1:
                            fileContent = _a.sent();
                            fileLines = fileContent.split(os.EOL).length;
                            fileLinesReached = fileLines + batchContentSize - 1 > this.maxFileLines;
                            fileDurationReached = ConsumerFile.getTimestamp() > this.timestamp + this.maxFileDuration;
                            fileSizeReached = fileContent.length > this.maxFileSize;
                            return [2, fileLinesReached || fileDurationReached || fileSizeReached];
                    }
                });
            });
        };
        ConsumerFile.prototype.close = function (file) {
            return __awaiter(this, void 0, Promise, function () {
                var e_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, file.close()];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            e_7 = _a.sent();
                            this.logger.log(Messages.GENERIC_ERROR, e_7.name, e_7.message);
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        ConsumerFile.prototype.sendBatch = function (batchContent) {
            var that = this;
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    var file, payload, bcs, currentBatchSize, e_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, that.getWriteableFile()];
                            case 1:
                                file = _a.sent();
                                if (!file) {
                                    return [2, resolve(false)];
                                }
                                payload = that.verifyPayload(batchContent);
                                if (!!payload) return [3, 3];
                                return [4, that.close(file)];
                            case 2:
                                _a.sent();
                                return [2, resolve(false)];
                            case 3:
                                payload += os.EOL;
                                bcs = batchContent.length;
                                return [4, that.isFileLimitReached(file, bcs)];
                            case 4:
                                if (!_a.sent()) return [3, 6];
                                return [4, that.renameAndCreateNewTempFile(file)];
                            case 5:
                                file = _a.sent();
                                _a.label = 6;
                            case 6:
                                _a.trys.push([6, 8, , 9]);
                                return [4, file.appendFile(payload)];
                            case 7:
                                _a.sent();
                                currentBatchSize = batchContent.length;
                                that.logger.log(Messages.WRITE_BATCH_DATA, that.fileName, currentBatchSize);
                                return [3, 9];
                            case 8:
                                e_8 = _a.sent();
                                that.logger.log(Messages.GENERIC_ERROR, e_8.name, e_8.message);
                                return [3, 9];
                            case 9: return [4, that.close(file)];
                            case 10:
                                _a.sent();
                                return [2, resolve(true)];
                        }
                    });
                });
            });
        };
        ConsumerFile.TEMPORARY_FILE_EXTENSION = '.tmp';
        ConsumerFile.LOG_FILE_EXTENSION = '.log';
        return ConsumerFile;
    }(AConsumer));

    var ConsumerForkCurl = (function (_super) {
        __extends(ConsumerForkCurl, _super);
        function ConsumerForkCurl(config) {
            return _super.call(this, config) || this;
        }
        ConsumerForkCurl.prototype.sendBatch = function (batchContent) {
            var that = this;
            return new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function () {
                    var payload, url, currentBatchSize, command;
                    return __generator(this, function (_a) {
                        payload = that.verifyPayload(batchContent);
                        if (!payload) {
                            return [2, resolve(false)];
                        }
                        url = that.getUrl();
                        currentBatchSize = batchContent.length;
                        that.logger.log(Messages.SEND_BATCH_DATA, url, currentBatchSize);
                        command = 'curl -X POST -H "Content-Type: text/plain"';
                        command += " -d \"" + payload + "\"";
                        command += " -m " + ConsumerForkCurl.DEFAULT_CONNECT_TIMEOUT / 1000;
                        command += ' -s -o /dev/null -w "%{http_code}"';
                        command += " \"" + url + "\"";
                        that.logger.log(Messages.EXECUTE_COMMAND, command);
                        child_process.exec(command, function (error, stdout, stderr) {
                            if (error) {
                                that.logger.log(Messages.GENERIC_ERROR, error.name, error.code);
                            }
                            var httpStatus = parseInt(stdout);
                            that.logger.log(Messages.BATCH_REQUEST_STATUS, httpStatus);
                            if (httpStatus !== 200) {
                                that.logger.log(Messages.BATCH_RESPONSE_TEXT, httpStatus, stderr);
                                return resolve(false);
                            }
                            return resolve(true);
                        });
                        return [2];
                    });
                });
            });
        };
        return ConsumerForkCurl;
    }(AConsumer));

    var Queue = (function (_super) {
        __extends(Queue, _super);
        function Queue(config) {
            var _this = _super.call(this, config) || this;
            _this.queue = [];
            var consumerType = config['consumerType'];
            _this.maxAttempt = config['maxAttempt'];
            _this.attemptTimeout = config['attemptTimeout'];
            _this.maxBatchSize = config['maxBatchSize'];
            _this.consumer = config['consumer'];
            if (!_this.consumer) {
                if (consumerType === ConsumerType.HTTP_CLIENT) {
                    _this.consumer = new ConsumerHttpClient(config);
                }
                else if (consumerType === ConsumerType.FILE) {
                    _this.consumer = new ConsumerFile(config);
                }
                else if (consumerType === ConsumerType.FORK_CURL) {
                    _this.consumer = new ConsumerForkCurl(config);
                }
            }
            return _this;
        }
        Queue.buildQueryString = function (data) {
            var queryString = [];
            for (var entry in data) {
                var encodedKey = Queue.encode(entry);
                if (encodedKey) {
                    queryString.push(Queue.encode(entry) + "=" + Queue.encode(data[entry]));
                }
            }
            return queryString.join('&');
        };
        Queue.prototype.sendBatch = function (batchContent) {
            var consumer = this.consumer;
            return new Promise(function (resolve, reject) {
                if (consumer) {
                    consumer.sendBatch(batchContent).then(function (value) {
                        return resolve(value);
                    }, function (reason) {
                        return resolve(reason);
                    }).catch(function (reason) {
                        return reject(reason);
                    });
                }
                else {
                    return reject(false);
                }
            });
        };
        Queue.prototype.flushQueue = function () {
            return __awaiter(this, void 0, Promise, function () {
                var currentQueueSize, wasRequestSuccessful, batchSize, batchContent;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            currentQueueSize = this.queue.length;
                            wasRequestSuccessful = true;
                            this.logger.log(Messages.SENT_BATCH_REQUESTS, currentQueueSize);
                            _b.label = 1;
                        case 1:
                            if (!(currentQueueSize > 0 && wasRequestSuccessful)) return [3, 3];
                            batchSize = Math.min(this.maxBatchSize, currentQueueSize);
                            batchContent = this.queue.slice(0, batchSize);
                            this.queue = this.queue.slice(batchSize, currentQueueSize);
                            return [4, this.sendBatch(batchContent)];
                        case 2:
                            wasRequestSuccessful = _b.sent();
                            if (!wasRequestSuccessful) {
                                this.logger.log(Messages.BATCH_REQUEST_FAILED);
                                (_a = this.queue).splice.apply(_a, __spreadArray([0, 0], batchContent));
                            }
                            currentQueueSize = this.queue.length;
                            this.logger.log(Messages.CURRENT_QUEUE_STATUS, batchSize, currentQueueSize);
                            return [3, 1];
                        case 3:
                            if (currentQueueSize === 0) {
                                this.logger.log(Messages.QUEUE_IS_EMPTY);
                            }
                            return [2, wasRequestSuccessful];
                    }
                });
            });
        };
        Queue.prototype.delay = function (ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        };
        Queue.prototype.getQueue = function () {
            return this.queue;
        };
        Queue.prototype.addRequestAsString = function (d) {
            var data = d;
            if (data) {
                var params = {};
                var addParam = false;
                if (data.indexOf(Parameter.USER_AGENT) === -1) {
                    var ua = this.getUserAgent();
                    if (ua) {
                        params[Parameter.USER_AGENT] = ua;
                        addParam = true;
                    }
                }
                if (data.indexOf(Parameter.USER_IP) === -1) {
                    var userIP = this.getUserIP();
                    if (userIP) {
                        params[Parameter.USER_IP] = userIP;
                        addParam = true;
                    }
                }
                data += ((addParam) ? '&' + Queue.buildQueryString(params) : '');
                this.queue.push(data);
                return data;
            }
        };
        Queue.prototype.addRequestAsObject = function (data) {
            var eid = this.getEverId();
            if (eid) {
                data[Parameter.EVER_ID] = eid;
            }
            var ua = this.getUserAgent();
            if (ua) {
                data[Parameter.USER_AGENT] = ua;
            }
            var userIP = this.getUserIP();
            if (userIP) {
                data[Parameter.USER_IP] = userIP;
            }
            var requestURI = this.getRequestURI();
            if (requestURI) {
                data[Parameter.PAGE_URL] = 'https://' + requestURI;
            }
            var pageName = data[Parameter.PAGE_NAME] ? data[Parameter.PAGE_NAME] : this.getDefaultPageName();
            delete data[Parameter.PAGE_NAME];
            var request = "wt?p=" + this.getMandatoryQueryParameter(pageName) + "&" + Queue.buildQueryString(data);
            this.queue.push(request);
            return request;
        };
        Queue.prototype.add = function (data) {
            return __awaiter(this, void 0, Promise, function () {
                var request, currentQueueSize;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            request = '';
                            if (typeof data === 'string') {
                                request = this.addRequestAsString(data);
                            }
                            else if (typeof data === 'object') {
                                request = this.addRequestAsObject(data);
                            }
                            if (!request) return [3, 2];
                            currentQueueSize = this.queue.length;
                            this.logger.log(Messages.ADD_THE_FOLLOWING_REQUEST_TO_QUEUE, currentQueueSize, request);
                            if (!(currentQueueSize >= this.maxBatchSize)) return [3, 2];
                            return [4, this.flush()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        Queue.prototype.flush = function () {
            return __awaiter(this, void 0, Promise, function () {
                var currentAttempt, wasRequestSuccessful, e_1, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentAttempt = 0;
                            wasRequestSuccessful = false;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 9, , 10]);
                            _a.label = 2;
                        case 2:
                            if (!(!wasRequestSuccessful && currentAttempt < this.maxAttempt)) return [3, 8];
                            return [4, this.flushQueue()];
                        case 3:
                            wasRequestSuccessful = _a.sent();
                            currentAttempt++;
                            if (!!wasRequestSuccessful) return [3, 7];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4, this.delay(this.attemptTimeout)];
                        case 5:
                            _a.sent();
                            return [3, 7];
                        case 6:
                            e_1 = _a.sent();
                            this.logger.log(Messages.GENERIC_ERROR, e_1.name, e_1.message);
                            return [3, 7];
                        case 7: return [3, 2];
                        case 8: return [3, 10];
                        case 9:
                            e_2 = _a.sent();
                            this.logger.log(Messages.GENERIC_ERROR, e_2.name, e_2.message);
                            return [3, 10];
                        case 10: return [2, wasRequestSuccessful];
                    }
                });
            });
        };
        return Queue;
    }(Enrichment));

    var ACleaner = (function () {
        function ACleaner() {
            if (ACleaner.cleanerJobs.length <= 0) {
                this.addHocks(ACleaner.EVENTS);
                this.addHocks(ACleaner.SIGNALS);
            }
            ACleaner.cleanerJobs.push(this);
        }
        ACleaner.startCleaner = function () {
            ACleaner.cleanerJobs.forEach(function (cleaner) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, cleaner.close()];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                });
            });
        };
        ACleaner.prototype.addHocks = function (hocks) {
            hocks.forEach(function (eType) {
                process.on(eType, function () {
                    ACleaner.startCleaner();
                });
            });
        };
        ACleaner.EVENTS = ['exit', 'uncaughtException'];
        ACleaner.SIGNALS = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];
        ACleaner.cleanerJobs = [];
        return ACleaner;
    }());

    var ACore = (function (_super) {
        __extends(ACore, _super);
        function ACore(config) {
            var _this = _super.call(this) || this;
            _this.config = config.build();
            _this.queue = new Queue(_this.config);
            var l = _this.config['logger'];
            _this.logger = new DebugLogger(l);
            _this.deactivate = _this.config['deactivate'];
            _this.deactivateByInAndExclude = _this.config['deactivateByInAndExclude'];
            _this.trackId = _this.config['trackId'];
            _this.trackDomain = _this.config['trackDomain'];
            return _this;
        }
        ACore.prototype.close = function () {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.queue.flush()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        ACore.prototype.getUserIdCookie = function (pixelVersion, context) {
            if (!this.trackId || !this.trackDomain) {
                this.logger.log(Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_COOKIE);
                return null;
            }
            return this.queue.getUserIdCookie(pixelVersion, context);
        };
        ACore.VERSION = '0.0.5';
        ACore.V4 = 'v4';
        ACore.V5 = 'v5';
        ACore.SMART = 'smart';
        ACore.CLIENT_SIDE_COOKIE = '1';
        ACore.SERVER_SIDE_COOKIE = '3';
        ACore.TRACKING_PLATFORM = 'Node';
        return ACore;
    }(ACleaner));

    var Hybrid = (function (_super) {
        __extends(Hybrid, _super);
        function Hybrid(config) {
            var _this = _super.call(this, config.build()['consumerType'] === ConsumerType.CUSTOM
                ? config
                : config.setConsumerType(ConsumerType.FILE)) || this;
            _this.requestURL = config.build()['requestURL'];
            return _this;
        }
        Hybrid.prototype.getResponseAsBase64 = function () {
            return Hybrid.PIXEL;
        };
        Hybrid.prototype.getResponseAsBuffer = function () {
            return Buffer.from(this.getResponseAsBase64(), 'base64');
        };
        Hybrid.prototype.track = function (rURL) {
            return __awaiter(this, void 0, Promise, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!rURL) return [3, 4];
                            r = this.requestURL;
                            if (!(!this.deactivate && r && r.search)) return [3, 3];
                            return [4, this.queue.add('wt' + r.search)];
                        case 1:
                            _a.sent();
                            return [4, this.queue.flush()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [3, 6];
                        case 4:
                            try {
                                this.requestURL = new URL(rURL);
                            }
                            catch (e) {
                            }
                            return [4, this.track()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2];
                    }
                });
            });
        };
        Hybrid.PIXEL = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        Hybrid.CONTENT_TYPE = 'Content-Type: image/gif';
        Hybrid.CONTENT_LENGTH = 'Content-Length: 43';
        return Hybrid;
    }(ACore));

    var ProductCollection = (function () {
        function ProductCollection() {
            this.data = [];
        }
        ProductCollection.prototype.add = function (value) {
            this.data.push(value);
            return this;
        };
        ProductCollection.prototype.build = function () {
            return this.data;
        };
        return ProductCollection;
    }());

    var ParameterMap = (function () {
        function ParameterMap() {
            this.data = {};
        }
        ParameterMap.prototype.add = function (key, value) {
            this.data[key] = value;
            return this;
        };
        ParameterMap.prototype.build = function () {
            return this.data;
        };
        return ParameterMap;
    }());

    var DataMap = (function () {
        function DataMap() {
            this.data = {};
        }
        DataMap.prototype.action = function (value) {
            this.data['action'] = value;
            return this;
        };
        DataMap.prototype.campaign = function (value) {
            this.data['campaign'] = value;
            return this;
        };
        DataMap.prototype.customer = function (value) {
            this.data['customer'] = value;
            return this;
        };
        DataMap.prototype.order = function (value) {
            this.data['order'] = value;
            return this;
        };
        DataMap.prototype.page = function (value) {
            this.data['page'] = value;
            return this;
        };
        DataMap.prototype.product = function (value) {
            this.data['product'] = value;
            return this;
        };
        DataMap.prototype.session = function (value) {
            this.data['session'] = value;
            return this;
        };
        DataMap.prototype.build = function () {
            return this.data;
        };
        return DataMap;
    }());

    var Tracking$1 = (function (_super) {
        __extends(Tracking, _super);
        function Tracking(config) {
            return _super.call(this, config) || this;
        }
        Tracking.simulateEmptyValues = function (maxLength) {
            var emptyArray = [];
            for (var i = 0; i < maxLength; i++) {
                emptyArray[i] = '';
            }
            return emptyArray;
        };
        Tracking.convertToString = function (value) {
            if (value === 'true') {
                return '1';
            }
            return ((value === 'false') ? '0' : value);
        };
        Tracking.isProductList = function (data) {
            return data instanceof ProductCollection;
        };
        Tracking.mergeProducts = function (productInformation) {
            var requestInformation = {};
            var returnValue = {};
            var length = productInformation.length;
            for (var i = 0; i < length; i++) {
                var pi = productInformation[i];
                for (var entry in pi) {
                    if (!requestInformation[entry]) {
                        requestInformation[entry] = Tracking.simulateEmptyValues(length);
                    }
                    requestInformation[entry][i] = Tracking.convertToString(pi[entry]);
                }
            }
            for (var entry in requestInformation) {
                var joinValue = requestInformation[entry];
                returnValue[entry] = joinValue.join(';');
            }
            return returnValue;
        };
        Tracking.getRequestData = function (data) {
            var requestData = {};
            var value;
            for (var entry in data) {
                value = data[entry];
                if (Tracking.isProductList(value)) {
                    var products = [];
                    var valueProductList = value.build();
                    var mappIntelligenceProduct = void 0;
                    for (var _i = 0, valueProductList_1 = valueProductList; _i < valueProductList_1.length; _i++) {
                        mappIntelligenceProduct = valueProductList_1[_i];
                        products.push(mappIntelligenceProduct.getQueryParameter());
                    }
                    Object.assign(requestData, Tracking.mergeProducts(products));
                }
                else {
                    if (value) {
                        Object.assign(requestData, value.getQueryParameter());
                    }
                }
            }
            return requestData;
        };
        Tracking.prototype.isTrackable = function () {
            if (this.deactivate) {
                this.logger.log(Messages.TRACKING_IS_DEACTIVATED);
                return false;
            }
            if (!this.trackId || !this.trackDomain) {
                this.logger.log(Messages.REQUIRED_TRACK_ID_AND_DOMAIN_FOR_TRACKING);
                return false;
            }
            if (this.deactivateByInAndExclude) {
                this.logger.log(Messages.TRACKING_IS_DEACTIVATED_BY_IN_AND_EXCLUDE);
                return false;
            }
            return true;
        };
        Tracking.prototype.addToRequestQueue = function (requestData) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestData[Parameter.PIXEL_FEATURES] = this.config['statistics'];
                            requestData[Parameter.VERSION] = Tracking.VERSION;
                            requestData[Parameter.TRACKING_PLATFORM] = Tracking.TRACKING_PLATFORM;
                            return [4, this.queue.add(requestData)];
                        case 1:
                            _a.sent();
                            return [2, true];
                    }
                });
            });
        };
        Tracking.prototype.trackData = function (data) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    return [2, this.track(new ParameterMap())];
                });
            });
        };
        Tracking.prototype.track = function (data) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    if (!data) {
                        return [2, this.trackData(new ParameterMap())];
                    }
                    if (this.isTrackable()) {
                        if (data instanceof ParameterMap) {
                            return [2, this.addToRequestQueue(data.build())];
                        }
                        else if (data instanceof DataMap) {
                            return [2, this.addToRequestQueue(Tracking.getRequestData(data.build()))];
                        }
                    }
                    return [2, false];
                });
            });
        };
        Tracking.prototype.flush = function () {
            return this.queue.flush();
        };
        return Tracking;
    }(ACore));

    var CLIArguments = (function () {
        function CLIArguments(args) {
            this.args = {};
            this.parseArgs(args);
        }
        CLIArguments.prototype.setArg = function (key, val) {
            if (key && val) {
                this.args[key] = val;
            }
        };
        CLIArguments.prototype.parseArgs = function (args) {
            var next;
            var key;
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (/^--.+=/.test(arg)) {
                    var match = arg.match(/^--([^=]+)=([\s\S]*)$/);
                    this.setArg(match[1], match[2]);
                }
                else if (/^--.+/.test(arg)) {
                    key = arg.match(/^--(.+)/)[1];
                    next = args[i + 1];
                    if ((next !== undefined && !/^-/.test(next)) || /^(true|false)$/.test(next)) {
                        this.setArg(key, next);
                        i++;
                    }
                    else {
                        this.setArg(key, 'true');
                    }
                }
                else if (/^-[^-]+/.test(arg)) {
                    var letters = arg.slice(1, -1).split('');
                    var broken = false;
                    for (var j = 0; j < letters.length; j++) {
                        next = arg.slice(j + 2);
                        if (next === '-') {
                            this.setArg(letters[j], next);
                            continue;
                        }
                        if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                            this.setArg(letters[j], next.split('=')[1]);
                            broken = true;
                            break;
                        }
                        if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                            this.setArg(letters[j], next);
                            broken = true;
                            break;
                        }
                        if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                            this.setArg(letters[j], arg.slice(j + 2));
                            broken = true;
                            break;
                        }
                        else {
                            this.setArg(letters[j], 'true');
                        }
                    }
                    key = arg.slice(-1)[0];
                    if (!broken && key !== '-') {
                        next = args[i + 1];
                        if (next && (!/^(-|--)[^-]/.test(next) || /^(true|false)$/.test(next))) {
                            this.setArg(key, next);
                            i++;
                        }
                        else {
                            this.setArg(key, 'true');
                        }
                    }
                }
            }
        };
        CLIArguments.prototype.getArgs = function () {
            return this.args;
        };
        return CLIArguments;
    }());

    var CLIException = (function (_super) {
        __extends(CLIException, _super);
        function CLIException(errorMessage) {
            return _super.call(this, errorMessage) || this;
        }
        return CLIException;
    }(Error));

    var CLITable = (function () {
        function CLITable(maxWidth) {
            if (maxWidth === void 0) { maxWidth = 90; }
            this.rows = [];
            this.maxWidth = maxWidth;
            this.cellWidth = Math.round(this.maxWidth / 18);
        }
        CLITable.wordwrap = function (txt, maxWidth) {
            var txtSplit = txt.trim().split(' ');
            var wordwrap = [];
            var wordwrapCounter = 0;
            for (var i = 0; i < txtSplit.length; i++) {
                var wordLength = txtSplit[i].length + 1;
                if (wordwrapCounter + wordLength >= maxWidth) {
                    txtSplit[i] = CLITable.LINE_BREAK + txtSplit[i];
                    wordwrapCounter = wordLength;
                }
                else {
                    wordwrapCounter += wordLength;
                }
                wordwrap.push(txtSplit[i]);
            }
            return wordwrap.join(' ').split(CLITable.LINE_BREAK);
        };
        CLITable.addBlankSpace = function (txt, count) {
            var str = '';
            for (var i = 0; i <= count; i++) {
                str += ' ';
            }
            var result = txt + str;
            return result.substring(0, Math.max(txt.length, count));
        };
        CLITable.prototype.addRow = function (cell1, width1, cell2, width2) {
            var cw1 = this.cellWidth * width1;
            var cw2 = this.cellWidth * width2;
            var txt = CLITable.wordwrap(cell2, cw2);
            for (var i = 0; i < txt.length; i++) {
                if (i === 0) {
                    this.rows.push(CLITable.addBlankSpace(cell1, cw1) + " " + CLITable.addBlankSpace(txt[i], cw2));
                }
                else {
                    this.rows.push(CLITable.addBlankSpace('', cw1) + " " + CLITable.addBlankSpace(txt[i], cw2));
                }
            }
        };
        CLITable.prototype.addEmptyRow = function () {
            this.rows.push('');
        };
        CLITable.prototype.build = function () {
            return this.rows.join(CLITable.LINE_BREAK);
        };
        CLITable.LINE_BREAK = os.EOL;
        return CLITable;
    }());

    var CLIOptions = (function () {
        function CLIOptions(args) {
            this.options = {};
            this.validOptions = {};
            this.args = (new CLIArguments(args)).getArgs();
        }
        CLIOptions.prototype.isOptionValid = function (short, long) {
            return typeof this.args[short] !== 'undefined' || typeof this.args[long] !== 'undefined';
        };
        CLIOptions.prototype.getUsage = function () {
            var usage = '';
            for (var key in this.options) {
                usage += " [--" + this.options[key].long + (this.options[key].withArg ? CLIOptions.ARG : '') + "]";
            }
            return usage;
        };
        CLIOptions.prototype.parse = function () {
            for (var key in this.args) {
                if (typeof this.validOptions[key] === 'undefined') {
                    var message = Messages.UNSUPPORTED_OPTION + " (" + key + "=" + this.args[key] + ")";
                    throw new CLIException(message + os.EOL);
                }
            }
        };
        CLIOptions.prototype.addOption = function (short, long, withArg, description) {
            this.options[long] = {
                short: short,
                long: long,
                withArg: withArg,
                description: description
            };
            this.validOptions[long] = true;
            if (short !== '') {
                this.validOptions[short] = true;
            }
            return this;
        };
        CLIOptions.prototype.hasOption = function (name) {
            return typeof this.options[name] !== 'undefined' && this.isOptionValid(this.options[name].short, name);
        };
        CLIOptions.prototype.getOptionValue = function (name) {
            var short = this.options[name]['short'];
            return typeof this.args[short] !== 'undefined' ? this.args[short] : this.args[name];
        };
        CLIOptions.prototype.printCLI = function (message, withExit) {
            if (withExit === void 0) { withExit = true; }
            (new DefaultLogger()).log(message);
            if (withExit) {
                process.exit();
            }
        };
        CLIOptions.prototype.printHelp = function () {
            var table = new CLITable();
            table.addRow('Usage:', 2, '', 16);
            table.addRow('', 1, Messages.HELP_SYNTAX + '' + this.getUsage(), 17);
            table.addEmptyRow();
            table.addRow('', 1, Messages.HELP_HEADER, 17);
            table.addEmptyRow();
            table.addRow('Options:', 2, '', 16);
            for (var key in this.options) {
                var option = this.options[key];
                var line = ' ';
                if (option.short) {
                    line += "-" + option.short + ", ";
                }
                else {
                    line += '    ';
                }
                line += "--" + option.long;
                if (option.withArg) {
                    line += CLIOptions.ARG;
                }
                table.addRow(line, 7, option.description, 11);
            }
            table.addRow('', 2, Messages.HELP_FOOTER, 16);
            this.printCLI(table.build());
        };
        CLIOptions.TRACK_ID = "trackId";
        CLIOptions.TRACK_DOMAIN = "trackDomain";
        CLIOptions.CONSUMER_TYPE = "consumerType";
        CLIOptions.CONFIG = "config";
        CLIOptions.FILE_PATH = "filePath";
        CLIOptions.FILE_PREFIX = "filePrefix";
        CLIOptions.DEACTIVATE = "deactivate";
        CLIOptions.LOGGER = "logger";
        CLIOptions.HELP = "help";
        CLIOptions.DEBUG = "debug";
        CLIOptions.VERSION = "version";
        CLIOptions.ARG = " <arg>";
        return CLIOptions;
    }());

    var CLIFile = (function () {
        function CLIFile() {
        }
        CLIFile.getTimestamp = function () {
            return Date.now();
        };
        CLIFile.extractTimestamp = function (fileName) {
            var defaultTimestamp = 0;
            var readTimestamp = fileName.replace(/^.+-(\d{13})\..+$/, '$1');
            if (readTimestamp && !isNaN(parseInt(readTimestamp))) {
                defaultTimestamp = parseInt(readTimestamp);
            }
            return defaultTimestamp;
        };
        CLIFile.renameFile = function (fileName, filePath) {
            return __awaiter(this, void 0, Promise, function () {
                var i, name, oldFileName, newFileName, e_1, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = fileName.lastIndexOf('.');
                            name = fileName.substring(0, i);
                            oldFileName = filePath + "/" + fileName;
                            newFileName = filePath + "/" + name + CLIFile.LOG_FILE_EXTENSION;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, fs.promises.rename(oldFileName, newFileName)];
                        case 2:
                            _a.sent();
                            return [3, 4];
                        case 3:
                            e_1 = _a.sent();
                            return [3, 4];
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4, fs.promises.stat(oldFileName)];
                        case 5:
                            _a.sent();
                            return [2, false];
                        case 6:
                            e_2 = _a.sent();
                            return [3, 7];
                        case 7: return [2, true];
                    }
                });
            });
        };
        CLIFile.getFiles = function (filePath, filePrefix, ext) {
            return __awaiter(this, void 0, Promise, function () {
                var f, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, fs.promises.stat(filePath)];
                        case 1:
                            _a.sent();
                            return [4, fs.promises.readdir(filePath)];
                        case 2:
                            f = _a.sent();
                            return [2, f.filter(function (value) {
                                    var regex = new RegExp("^" + filePrefix + ".*" + ext + "$");
                                    return regex.test(value);
                                })];
                        case 3:
                            e_3 = _a.sent();
                            return [2, []];
                        case 4: return [2];
                    }
                });
            });
        };
        CLIFile.checkTemporaryFiles = function (filePath, filePrefix) {
            return __awaiter(this, void 0, Promise, function () {
                var renameStatus, tmpFiles, _i, tmpFiles_1, tmpFile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            renameStatus = false;
                            return [4, CLIFile.getFiles(filePath, filePrefix, CLIFile.TEMPORARY_FILE_EXTENSION)];
                        case 1:
                            tmpFiles = _a.sent();
                            if (!(tmpFiles && tmpFiles.length > 0)) return [3, 5];
                            _i = 0, tmpFiles_1 = tmpFiles;
                            _a.label = 2;
                        case 2:
                            if (!(_i < tmpFiles_1.length)) return [3, 5];
                            tmpFile = tmpFiles_1[_i];
                            if (!(CLIFile.getTimestamp() > CLIFile.extractTimestamp(tmpFile) + CLIFile.DEFAULT_MAX_FILE_DURATION)) return [3, 4];
                            return [4, CLIFile.renameFile(tmpFile, filePath)];
                        case 3:
                            renameStatus = _a.sent();
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3, 2];
                        case 5: return [2, renameStatus];
                    }
                });
            });
        };
        CLIFile.getLogFiles = function (filePath, filePrefix) {
            return __awaiter(this, void 0, Promise, function () {
                var files, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, CLIFile.getFiles(filePath, filePrefix, CLIFile.LOG_FILE_EXTENSION)];
                        case 1:
                            files = _a.sent();
                            if (!files || files.length === 0) {
                                msg = Messages.REQUEST_LOG_FILES_NOT_FOUND.replace(/\$\{0}/, filePath);
                                throw new CLIException(msg);
                            }
                            else {
                                files.sort();
                            }
                            return [2, files];
                    }
                });
            });
        };
        CLIFile.getFileContent = function (file) {
            return __awaiter(this, void 0, Promise, function () {
                var content, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            content = '';
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, fs.promises.readFile(file)];
                        case 2:
                            content = (_a.sent()).toString();
                            return [3, 4];
                        case 3:
                            e_4 = _a.sent();
                            return [3, 4];
                        case 4: return [2, content.split(os.EOL)];
                    }
                });
            });
        };
        CLIFile.deleteFile = function (filename) {
            return __awaiter(this, void 0, Promise, function () {
                var e_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, fs.promises.unlink(filename)];
                        case 1:
                            _a.sent();
                            return [3, 3];
                        case 2:
                            e_5 = _a.sent();
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            });
        };
        CLIFile.TEMPORARY_FILE_EXTENSION = ".tmp";
        CLIFile.LOG_FILE_EXTENSION = ".log";
        CLIFile.DEFAULT_MAX_FILE_DURATION = 30 * 60 * 1000;
        return CLIFile;
    }());

    var CLIFileRotationTransmitter = (function () {
        function CLIFileRotationTransmitter(config) {
            this.mic = config;
            this.filePath = this.mic[CLIOptions.FILE_PATH];
            this.filePrefix = this.mic[CLIOptions.FILE_PREFIX];
            this.logger = this.mic[CLIOptions.LOGGER];
        }
        CLIFileRotationTransmitter.prototype.sendRequests = function (files) {
            return __awaiter(this, void 0, Promise, function () {
                var _i, files_1, file, fileLines, requestQueue, _a, fileLines_1, fileLine;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _i = 0, files_1 = files;
                            _b.label = 1;
                        case 1:
                            if (!(_i < files_1.length)) return [3, 10];
                            file = files_1[_i];
                            return [4, CLIFile.getFileContent(this.filePath + '/' + file)];
                        case 2:
                            fileLines = _b.sent();
                            requestQueue = new Queue(this.mic);
                            _a = 0, fileLines_1 = fileLines;
                            _b.label = 3;
                        case 3:
                            if (!(_a < fileLines_1.length)) return [3, 6];
                            fileLine = fileLines_1[_a];
                            if (!fileLine.trim()) {
                                return [3, 5];
                            }
                            return [4, requestQueue.add(fileLine)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _a++;
                            return [3, 3];
                        case 6: return [4, requestQueue.flush()];
                        case 7:
                            if (!(_b.sent())) {
                                return [2, CLIFileRotationTransmitter.EXIT_STATUS_FAIL];
                            }
                            return [4, CLIFile.deleteFile(this.filePath + '/' + file)];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9:
                            _i++;
                            return [3, 1];
                        case 10: return [2, CLIFileRotationTransmitter.EXIT_STATUS_SUCCESS];
                    }
                });
            });
        };
        CLIFileRotationTransmitter.prototype.send = function () {
            return __awaiter(this, void 0, Promise, function () {
                var files, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, CLIFile.checkTemporaryFiles(this.filePath, this.filePrefix)];
                        case 1:
                            if (_a.sent()) {
                                this.logger.log(Messages.RENAME_EXPIRED_TEMPORARY_FILE);
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4, CLIFile.getLogFiles(this.filePath, this.filePrefix)];
                        case 3:
                            files = _a.sent();
                            return [3, 5];
                        case 4:
                            e_1 = _a.sent();
                            this.logger.log(e_1.message);
                            return [2, CLIFileRotationTransmitter.EXIT_STATUS_FAIL];
                        case 5: return [2, this.sendRequests(files)];
                    }
                });
            });
        };
        CLIFileRotationTransmitter.EXIT_STATUS_SUCCESS = 0;
        CLIFileRotationTransmitter.EXIT_STATUS_FAIL = 1;
        return CLIFileRotationTransmitter;
    }());

    var CLICronjob = (function () {
        function CLICronjob(config) {
            if (config && typeof config.build === 'function') {
                this.initWithConfig(config.build());
            }
            else if (config instanceof Array) {
                this.initWithConfig(CLICronjob.getMappIntelligenceConfig(config));
            }
            else {
                throw new CLIException(Messages.UNSUPPORTED_OPTION);
            }
        }
        CLICronjob.prototype.initWithConfig = function (config) {
            this.mic = config;
            this.validateOptions();
            this.filePath = this.mic[CLIOptions.FILE_PATH];
            this.filePrefix = this.mic[CLIOptions.FILE_PREFIX];
            this.deactivate = this.mic[CLIOptions.DEACTIVATE];
            var l = this.mic[CLIOptions.LOGGER];
            this.logger = new DebugLogger(l);
            this.mic[CLIOptions.CONSUMER_TYPE] = ConsumerType.HTTP_CLIENT;
            this.mic[CLIOptions.LOGGER] = this.logger;
            this.mic[CLIOptions.DEACTIVATE] = this.deactivate;
            this.mic['maxBatchSize'] = 1000;
            this.mic['maxQueueSize'] = 100000;
        };
        CLICronjob.getOptions = function (args) {
            var options = new CLIOptions(args);
            options.addOption('i', CLIOptions.TRACK_ID, true, Messages.OPTION_TRACK_ID)
                .addOption('d', CLIOptions.TRACK_DOMAIN, true, Messages.OPTION_TRACK_DOMAIN)
                .addOption('c', CLIOptions.CONFIG, true, Messages.OPTION_CONFIG)
                .addOption('f', CLIOptions.FILE_PATH, true, Messages.OPTION_FILE_PATH)
                .addOption('p', CLIOptions.FILE_PREFIX, true, Messages.OPTION_FILE_PREFIX)
                .addOption('', CLIOptions.DEACTIVATE, false, Messages.OPTION_DEACTIVATE)
                .addOption('', CLIOptions.HELP, false, Messages.OPTION_HELP)
                .addOption('', CLIOptions.DEBUG, false, Messages.OPTION_DEBUG)
                .addOption('', CLIOptions.VERSION, false, Messages.OPTION_VERSION);
            return options;
        };
        CLICronjob.getMappIntelligenceConfig = function (args) {
            var mappConfig = new Config();
            var options = CLICronjob.getOptions(args);
            try {
                options.parse();
            }
            catch (e) {
                options.printCLI(e.message, false);
                options.printHelp();
            }
            try {
                if (options.hasOption(CLIOptions.HELP)) {
                    options.printHelp();
                }
                if (options.hasOption(CLIOptions.VERSION)) {
                    options.printCLI('v' + Tracking$1.VERSION);
                }
                if (options.hasOption(CLIOptions.CONFIG)) {
                    mappConfig = new Config(options.getOptionValue(CLIOptions.CONFIG));
                }
                if (options.hasOption(CLIOptions.DEBUG)) {
                    mappConfig.setDebug(true);
                }
                if (options.hasOption(CLIOptions.DEACTIVATE)) {
                    mappConfig.setDeactivate(true);
                }
                if (options.hasOption(CLIOptions.TRACK_ID)) {
                    mappConfig.setTrackId(options.getOptionValue(CLIOptions.TRACK_ID));
                }
                if (options.hasOption(CLIOptions.TRACK_DOMAIN)) {
                    mappConfig.setTrackDomain(options.getOptionValue(CLIOptions.TRACK_DOMAIN));
                }
                if (options.hasOption(CLIOptions.FILE_PATH)) {
                    mappConfig.setFilePath(options.getOptionValue(CLIOptions.FILE_PATH));
                }
                if (options.hasOption(CLIOptions.FILE_PREFIX)) {
                    mappConfig.setFilePrefix(options.getOptionValue(CLIOptions.FILE_PREFIX));
                }
            }
            catch (e) {
                throw new CLIException(e.message);
            }
            return mappConfig.build();
        };
        CLICronjob.isOptionInvalid = function (o) {
            return o === '' || o === null;
        };
        CLICronjob.prototype.validateOptions = function () {
            if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.TRACK_ID])) {
                throw new CLIException(Messages.REQUIRED_TRACK_ID);
            }
            if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.TRACK_DOMAIN])) {
                throw new CLIException(Messages.REQUIRED_TRACK_DOMAIN);
            }
            if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.FILE_PATH])) {
                this.mic[CLIOptions.FILE_PATH] = os.tmpdir();
            }
            if (CLICronjob.isOptionInvalid(this.mic[CLIOptions.FILE_PREFIX])) {
                this.mic[CLIOptions.FILE_PREFIX] = 'MappIntelligenceRequests';
            }
        };
        CLICronjob.prototype.run = function () {
            return __awaiter(this, void 0, Promise, function () {
                var fileTransmitter;
                return __generator(this, function (_a) {
                    if (this.deactivate) {
                        this.logger.log(Messages.TRACKING_IS_DEACTIVATED);
                        return [2, CLICronjob.EXIT_STATUS_SUCCESS];
                    }
                    fileTransmitter = new CLIFileRotationTransmitter(this.mic);
                    return [2, fileTransmitter.send()];
                });
            });
        };
        CLICronjob.EXIT_STATUS_SUCCESS = 0;
        return CLICronjob;
    }());

    var AData = (function () {
        function AData() {
            this.filterQueryParameter = true;
        }
        AData.removeEmptyQueryParameter = function (queryParameters) {
            var data = {};
            for (var entry in queryParameters) {
                var paramValue = queryParameters[entry];
                if (paramValue && paramValue !== 'false' && paramValue !== '0' && paramValue !== '0.0') {
                    data[entry] = paramValue;
                }
            }
            return data;
        };
        AData.prototype.getParameterList = function (params, key) {
            var data = {};
            for (var entry in params) {
                data[key + entry] = params[entry];
            }
            return data;
        };
        AData.prototype.getData = function () {
            return this.toMap();
        };
        AData.prototype.getQueryParameter = function () {
            var queryList = this.getQueryList();
            var data = this.getData();
            var queryParameters = {};
            var property;
            var queryParameter;
            for (var entry in queryList) {
                property = entry;
                queryParameter = queryList[entry];
                if (typeof data[property] !== 'undefined' && data[property] !== null) {
                    if (typeof data[property] === 'object') {
                        var dataMerge = data[property];
                        Object.assign(queryParameters, this.getParameterList(dataMerge, queryParameter));
                    }
                    else {
                        queryParameters[queryParameter] = data[property].toString();
                    }
                }
            }
            if (this.filterQueryParameter) {
                queryParameters = AData.removeEmptyQueryParameter(queryParameters);
            }
            return queryParameters;
        };
        return AData;
    }());

    var Action = (function (_super) {
        __extends(Action, _super);
        function Action(n) {
            var _this = _super.call(this) || this;
            _this.name = '';
            _this.parameter = {};
            _this.goal = {};
            if (n) {
                _this.name = n;
            }
            return _this;
        }
        Action.prototype.getQueryList = function () {
            var queryList = {};
            queryList['name'] = Parameter.ACTION_NAME;
            queryList['parameter'] = Parameter.CUSTOM_ACTION_PARAMETER;
            queryList['goal'] = Parameter.CUSTOM_PRODUCT_PARAMETER;
            return queryList;
        };
        Action.prototype.toMap = function () {
            var data = {};
            data['name'] = this.name;
            data['parameter'] = this.parameter;
            data['goal'] = this.goal;
            return data;
        };
        Action.prototype.setName = function (n) {
            this.name = n;
            return this;
        };
        Action.prototype.setParameter = function (id, value) {
            this.parameter[id] = value;
            return this;
        };
        Action.prototype.setGoal = function (id, value) {
            this.goal[id] = value;
            return this;
        };
        return Action;
    }(AData));

    var Campaign = (function (_super) {
        __extends(Campaign, _super);
        function Campaign(i) {
            var _this = _super.call(this) || this;
            _this.id = '';
            _this.mediaCode = ['mc', 'wt_mc'];
            _this.oncePerSession = false;
            _this.parameter = {};
            if (i) {
                _this.id = i;
            }
            return _this;
        }
        Campaign.prototype.getQueryList = function () {
            var queryList = {};
            queryList['id'] = Parameter.CAMPAIGN_ID;
            queryList['action'] = Parameter.CAMPAIGN_ACTION;
            queryList['parameter'] = Parameter.CUSTOM_CAMPAIGN_PARAMETER;
            return queryList;
        };
        Campaign.prototype.toMap = function () {
            var data = {};
            data['id'] = this.id;
            data['action'] = Campaign.ACTION;
            data['mediaCode'] = this.mediaCode;
            data['oncePerSession'] = this.oncePerSession;
            data['parameter'] = this.parameter;
            return data;
        };
        Campaign.prototype.setId = function (i) {
            this.id = i;
            return this;
        };
        Campaign.prototype.setMediaCode = function (mc) {
            this.mediaCode = mc;
            return this;
        };
        Campaign.prototype.setOncePerSession = function (ops) {
            this.oncePerSession = ops;
            return this;
        };
        Campaign.prototype.setParameter = function (i, value) {
            this.parameter[i] = value;
            return this;
        };
        Campaign.ACTION = 'c';
        return Campaign;
    }(AData));

    var Customer = (function (_super) {
        __extends(Customer, _super);
        function Customer(i) {
            var _this = _super.call(this) || this;
            _this.id = '';
            _this.customIdentifier = '';
            _this.email = '';
            _this.emailRID = '';
            _this.emailOptin = false;
            _this.firstName = '';
            _this.lastName = '';
            _this.telephone = '';
            _this.gender = 0;
            _this.birthday = '';
            _this.country = '';
            _this.city = '';
            _this.postalCode = '';
            _this.street = '';
            _this.streetNumber = '';
            _this.validation = false;
            _this.category = {};
            if (i) {
                _this.id = i;
            }
            return _this;
        }
        Customer.prototype.getQueryList = function () {
            var queryList = {};
            queryList['id'] = Parameter.CUSTOMER_ID;
            queryList['customIdentifier'] = Parameter.CUSTOM_EVER_ID;
            queryList['email'] = Parameter.EMAIL;
            queryList['emailRID'] = Parameter.EMAIL_RID;
            queryList['emailOptin'] = Parameter.EMAIL_OPTIN;
            queryList['firstName'] = Parameter.FIRST_NAME;
            queryList['lastName'] = Parameter.LAST_NAME;
            queryList['telephone'] = Parameter.TELEPHONE;
            queryList['gender'] = Parameter.GENDER;
            queryList['birthday'] = Parameter.BIRTHDAY;
            queryList['country'] = Parameter.COUNTRY;
            queryList['city'] = Parameter.CITY;
            queryList['postalCode'] = Parameter.POSTAL_CODE;
            queryList['street'] = Parameter.STREET;
            queryList['streetNumber'] = Parameter.STREET_NUMBER;
            queryList['validation'] = Parameter.CUSTOMER_VALIDATION;
            queryList['category'] = Parameter.CUSTOM_URM_CATEGORY;
            return queryList;
        };
        Customer.prototype.toMap = function () {
            var data = {};
            data['id'] = this.id;
            data['customIdentifier'] = this.customIdentifier;
            data['email'] = this.email;
            data['emailRID'] = this.emailRID;
            data['emailOptin'] = this.emailOptin;
            data['firstName'] = this.firstName;
            data['lastName'] = this.lastName;
            data['telephone'] = this.telephone;
            data['gender'] = this.gender;
            data['birthday'] = this.birthday;
            data['country'] = this.country;
            data['city'] = this.city;
            data['postalCode'] = this.postalCode;
            data['street'] = this.street;
            data['streetNumber'] = this.streetNumber;
            data['validation'] = this.validation;
            data['category'] = this.category;
            return data;
        };
        Customer.prototype.setId = function (i) {
            this.id = i;
            return this;
        };
        Customer.prototype.setCustomIdentifier = function (c) {
            this.customIdentifier = c;
            return this;
        };
        Customer.prototype.setEmail = function (e) {
            this.email = e;
            return this;
        };
        Customer.prototype.setEmailRID = function (eRID) {
            this.emailRID = eRID;
            return this;
        };
        Customer.prototype.setEmailOptin = function (eOptin) {
            this.emailOptin = eOptin;
            return this;
        };
        Customer.prototype.setFirstName = function (fName) {
            this.firstName = fName;
            return this;
        };
        Customer.prototype.setLastName = function (lName) {
            this.lastName = lName;
            return this;
        };
        Customer.prototype.setTelephone = function (t) {
            this.telephone = t;
            return this;
        };
        Customer.prototype.setGender = function (g) {
            this.gender = g;
            return this;
        };
        Customer.prototype.setBirthday = function (b) {
            this.birthday = b;
            return this;
        };
        Customer.prototype.setCountry = function (c) {
            this.country = c;
            return this;
        };
        Customer.prototype.setCity = function (c) {
            this.city = c;
            return this;
        };
        Customer.prototype.setPostalCode = function (pCode) {
            this.postalCode = pCode;
            return this;
        };
        Customer.prototype.setStreet = function (s) {
            this.street = s;
            return this;
        };
        Customer.prototype.setStreetNumber = function (sNumber) {
            this.streetNumber = sNumber;
            return this;
        };
        Customer.prototype.setValidation = function (v) {
            this.validation = v;
            return this;
        };
        Customer.prototype.setCategory = function (i, value) {
            this.category[i] = value;
            return this;
        };
        return Customer;
    }(AData));

    var Order = (function (_super) {
        __extends(Order, _super);
        function Order(v) {
            var _this = _super.call(this) || this;
            _this.value = 0;
            _this.id = '';
            _this.currency = '';
            _this.couponValue = 0;
            _this.paymentMethod = '';
            _this.shippingService = '';
            _this.shippingSpeed = '';
            _this.shippingCosts = 0;
            _this.grossMargin = 0;
            _this.orderStatus = '';
            _this.parameter = {};
            if (v) {
                _this.value = v;
            }
            return _this;
        }
        Order.prototype.getQueryList = function () {
            var queryList = {};
            queryList['value'] = Parameter.ORDER_VALUE;
            queryList['id'] = Parameter.ORDER_ID;
            queryList['currency'] = Parameter.CURRENCY;
            queryList['couponValue'] = Parameter.COUPON_VALUE;
            queryList['paymentMethod'] = Parameter.PAYMENT_METHOD;
            queryList['shippingService'] = Parameter.SHIPPING_SERVICE;
            queryList['shippingSpeed'] = Parameter.SHIPPING_SPEED;
            queryList['shippingCosts'] = Parameter.SHIPPING_COSTS;
            queryList['grossMargin'] = Parameter.GROSS_MARGIN;
            queryList['orderStatus'] = Parameter.ORDER_STATUS;
            queryList['parameter'] = Parameter.CUSTOM_PRODUCT_PARAMETER;
            return queryList;
        };
        Order.prototype.toMap = function () {
            var data = {};
            data['value'] = this.value;
            data['id'] = this.id;
            data['currency'] = this.currency;
            data['couponValue'] = this.couponValue;
            data['paymentMethod'] = this.paymentMethod;
            data['shippingService'] = this.shippingService;
            data['shippingSpeed'] = this.shippingSpeed;
            data['shippingCosts'] = this.shippingCosts;
            data['grossMargin'] = this.grossMargin;
            data['orderStatus'] = this.orderStatus;
            data['parameter'] = this.parameter;
            return data;
        };
        Order.prototype.setValue = function (v) {
            this.value = v;
            return this;
        };
        Order.prototype.setId = function (i) {
            this.id = i;
            return this;
        };
        Order.prototype.setCurrency = function (c) {
            this.currency = c;
            return this;
        };
        Order.prototype.setCouponValue = function (cValue) {
            this.couponValue = cValue;
            return this;
        };
        Order.prototype.setPaymentMethod = function (pMethod) {
            this.paymentMethod = pMethod;
            return this;
        };
        Order.prototype.setShippingService = function (sService) {
            this.shippingService = sService;
            return this;
        };
        Order.prototype.setShippingSpeed = function (sSpeed) {
            this.shippingSpeed = sSpeed;
            return this;
        };
        Order.prototype.setShippingCosts = function (sCosts) {
            this.shippingCosts = sCosts;
            return this;
        };
        Order.prototype.setGrossMargin = function (gMargin) {
            this.grossMargin = gMargin;
            return this;
        };
        Order.prototype.setOrderStatus = function (oStatus) {
            this.orderStatus = oStatus;
            return this;
        };
        Order.prototype.setParameter = function (i, v) {
            this.parameter[i] = v;
            return this;
        };
        return Order;
    }(AData));

    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(n) {
            var _this = _super.call(this) || this;
            _this.name = '';
            _this.search = '';
            _this.numberSearchResults = 0;
            _this.errorMessages = '';
            _this.paywall = false;
            _this.articleTitle = '';
            _this.contentTags = '';
            _this.title = '';
            _this.type = '';
            _this.length = '';
            _this.daysSincePublication = 0;
            _this.testVariant = '';
            _this.testExperiment = '';
            _this.parameter = {};
            _this.category = {};
            _this.goal = {};
            if (n) {
                _this.name = n;
            }
            return _this;
        }
        Page.prototype.getQueryList = function () {
            var queryList = {};
            queryList['name'] = Parameter.PAGE_NAME;
            queryList['search'] = Parameter.SEARCH;
            queryList['numberSearchResults'] = Parameter.NUMBER_SEARCH_RESULTS;
            queryList['errorMessages'] = Parameter.ERROR_MESSAGES;
            queryList['paywall'] = Parameter.PAYWALL;
            queryList['articleTitle'] = Parameter.ARTICLE_TITLE;
            queryList['contentTags'] = Parameter.CONTENT_TAGS;
            queryList['title'] = Parameter.PAGE_TITLE;
            queryList['type'] = Parameter.PAGE_TYPE;
            queryList['length'] = Parameter.PAGE_LENGTH;
            queryList['daysSincePublication'] = Parameter.DAYS_SINCE_PUBLICATION;
            queryList['testVariant'] = Parameter.TEST_VARIANT;
            queryList['testExperiment'] = Parameter.TEST_EXPERIMENT;
            queryList['parameter'] = Parameter.CUSTOM_PAGE_PARAMETER;
            queryList['category'] = Parameter.CUSTOM_PAGE_CATEGORY;
            queryList['goal'] = Parameter.CUSTOM_PRODUCT_PARAMETER;
            return queryList;
        };
        Page.prototype.toMap = function () {
            var data = {};
            data['name'] = this.name;
            data['search'] = this.search;
            data['numberSearchResults'] = this.numberSearchResults;
            data['errorMessages'] = this.errorMessages;
            data['paywall'] = this.paywall;
            data['articleTitle'] = this.articleTitle;
            data['contentTags'] = this.contentTags;
            data['title'] = this.title;
            data['type'] = this.type;
            data['length'] = this.length;
            data['daysSincePublication'] = this.daysSincePublication;
            data['testVariant'] = this.testVariant;
            data['testExperiment'] = this.testExperiment;
            data['parameter'] = this.parameter;
            data['category'] = this.category;
            data['goal'] = this.goal;
            return data;
        };
        Page.prototype.setName = function (n) {
            this.name = n;
            return this;
        };
        Page.prototype.setSearch = function (s) {
            this.search = s;
            return this;
        };
        Page.prototype.setNumberSearchResults = function (nSearchResults) {
            this.numberSearchResults = nSearchResults;
            return this;
        };
        Page.prototype.setErrorMessages = function (eMessages) {
            this.errorMessages = eMessages;
            return this;
        };
        Page.prototype.setPaywall = function (p) {
            this.paywall = p;
            return this;
        };
        Page.prototype.setArticleTitle = function (aTitle) {
            this.articleTitle = aTitle;
            return this;
        };
        Page.prototype.setContentTags = function (cTags) {
            this.contentTags = cTags;
            return this;
        };
        Page.prototype.setTitle = function (t) {
            this.title = t;
            return this;
        };
        Page.prototype.setType = function (t) {
            this.type = t;
            return this;
        };
        Page.prototype.setLength = function (l) {
            this.length = l;
            return this;
        };
        Page.prototype.setDaysSincePublication = function (dSincePublication) {
            this.daysSincePublication = dSincePublication;
            return this;
        };
        Page.prototype.setTestExperiment = function (tExperiment) {
            this.testExperiment = tExperiment;
            return this;
        };
        Page.prototype.setTestVariant = function (tVariant) {
            this.testVariant = tVariant;
            return this;
        };
        Page.prototype.setParameter = function (id, value) {
            this.parameter[id] = value;
            return this;
        };
        Page.prototype.setCategory = function (id, value) {
            this.category[id] = value;
            return this;
        };
        Page.prototype.setGoal = function (id, value) {
            this.goal[id] = value;
            return this;
        };
        return Page;
    }(AData));

    var Product = (function (_super) {
        __extends(Product, _super);
        function Product(i) {
            var _this = _super.call(this) || this;
            _this.id = '';
            _this.cost = 0;
            _this.quantity = 0;
            _this.status = Product.VIEW;
            _this.variant = '';
            _this.soldOut = false;
            _this.parameter = {};
            _this.category = {};
            _this.filterQueryParameter = false;
            if (i) {
                _this.id = i;
            }
            return _this;
        }
        Product.prototype.getQueryList = function () {
            var queryList = {};
            queryList['id'] = Parameter.PRODUCT_ID;
            queryList['cost'] = Parameter.PRODUCT_COST;
            queryList['quantity'] = Parameter.PRODUCT_QUANTITY;
            queryList['status'] = Parameter.PRODUCT_STATUS;
            queryList['variant'] = Parameter.PRODUCT_VARIANT;
            queryList['soldOut'] = Parameter.PRODUCT_SOLD_OUT;
            queryList['parameter'] = Parameter.CUSTOM_PRODUCT_PARAMETER;
            queryList['category'] = Parameter.CUSTOM_PRODUCT_CATEGORY;
            return queryList;
        };
        Product.prototype.toMap = function () {
            var data = {};
            data['id'] = this.id;
            data['cost'] = this.cost;
            data['quantity'] = this.quantity;
            data['status'] = this.status;
            data['variant'] = this.variant;
            data['soldOut'] = this.soldOut;
            data['parameter'] = this.parameter;
            data['category'] = this.category;
            return data;
        };
        Product.prototype.setId = function (i) {
            this.id = i;
            return this;
        };
        Product.prototype.setCost = function (c) {
            this.cost = c;
            return this;
        };
        Product.prototype.setQuantity = function (q) {
            this.quantity = q;
            return this;
        };
        Product.prototype.setStatus = function (s) {
            if (s === Product.VIEW || s === Product.BASKET || s === Product.CONFIRMATION) {
                this.status = s;
            }
            return this;
        };
        Product.prototype.setVariant = function (v) {
            this.variant = v;
            return this;
        };
        Product.prototype.setSoldOut = function (sOut) {
            this.soldOut = sOut;
            return this;
        };
        Product.prototype.setParameter = function (i, v) {
            this.parameter[i] = v;
            return this;
        };
        Product.prototype.setCategory = function (i, v) {
            this.category[i] = v;
            return this;
        };
        Product.VIEW = 'view';
        Product.BASKET = 'add';
        Product.CONFIRMATION = 'conf';
        return Product;
    }(AData));

    var Session = (function (_super) {
        __extends(Session, _super);
        function Session() {
            var _this = _super.call(this) || this;
            _this.loginStatus = '';
            _this.parameter = {};
            return _this;
        }
        Session.prototype.getQueryList = function () {
            var queryList = {};
            queryList['loginStatus'] = Parameter.LOGIN_STATUS;
            queryList['parameter'] = Parameter.CUSTOM_SESSION_PARAMETER;
            return queryList;
        };
        Session.prototype.toMap = function () {
            var data = {};
            data['loginStatus'] = this.loginStatus;
            data['parameter'] = this.parameter;
            return data;
        };
        Session.prototype.setLoginStatus = function (lStatus) {
            this.loginStatus = lStatus;
            return this;
        };
        Session.prototype.setParameter = function (i, v) {
            this.parameter[i] = v;
            return this;
        };
        return Session;
    }(AData));

    exports.MappIntelligenceAction = Action;
    exports.MappIntelligenceCampaign = Campaign;
    exports.MappIntelligenceConfig = Config;
    exports.MappIntelligenceConsumerType = ConsumerType;
    exports.MappIntelligenceCronjob = CLICronjob;
    exports.MappIntelligenceCustomParameter = CustomParameter;
    exports.MappIntelligenceCustomer = Customer;
    exports.MappIntelligenceDataMap = DataMap;
    exports.MappIntelligenceHybrid = Hybrid;
    exports.MappIntelligenceOrder = Order;
    exports.MappIntelligencePage = Page;
    exports.MappIntelligenceParameter = Parameter;
    exports.MappIntelligenceParameterMap = ParameterMap;
    exports.MappIntelligenceProduct = Product;
    exports.MappIntelligenceProductCollection = ProductCollection;
    exports.MappIntelligenceQueue = Queue;
    exports.MappIntelligenceSession = Session;
    exports.MappIntelligenceTracking = Tracking$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
