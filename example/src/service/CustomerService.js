const User = require('../entities/User');
const Personal = require('../entities/Personal');
const UserModel = require('../models/UserModel');

const CustomerService = function(req) {
    const request = req;
    const userModel = new UserModel();

    const __constructor = () => {
        request.globalStoreData.user = null;
        request.globalStoreData.personal = null;
        request.globalStoreData.info = null;
        request.globalStoreData.error = null;

        init();
    };

    const decode = (txt) => {
        return decodeURIComponent(txt || '');
    };

    const info = (msg) => {
        request.globalStoreData.info = msg;
    };

    const error = (msg) => {
        request.globalStoreData.error = msg;
    };

    const login = (session) => {
        const email = decode(request.body['email']);
        const password = decode(request.body['password']);

        if (email && password) {
            const user = userModel.login(email, password);

            session.user = user;
            request.globalStoreData.user = user;

            if (!user) {
                error('Invalid login or password.');
            }
            else {
                info('The login was successful.');
            }
        }
    };

    const logout = (session) => {
        info('The logout was successful.');

        session.destroy();
        session.user = null;
        request.globalStoreData.user = null;
    };

    const register = (session) => {
        const user = userModel.register(
            decode(request.body['email']),
            decode(request.body['password']),
            decode(request.body['firstname']),
            decode(request.body['lastname']),
            decode(request.body['tel'])
        );

        if (user) {
            session.user = user;
            request.globalStoreData.user = user;

            info('The registration was successful.');
        }
        else {
            error('There is already an account with this email address.');
        }
    };

    const personal = (session) => {
        let user = session.user;

        if (user) {
            user = new User();

            user.setFirstName(decode(request.body['firstname']));
            user.setLastName(decode(request.body['lastname']));
            user.setEmail(decode(request.body['email']));
            user.setTelephone(decode(request.body['tel']));

            request.globalStoreData.user = user;
        }

        const personal = new Personal(user);
        personal.setAddress1(decode(request.body['address1']));
        personal.setAddress2(decode(request.body['address2']));
        personal.setCountry(decode(request.body['country']));
        personal.setCity(decode(request.body['city']));
        personal.setPostCode(decode(request.body['postcode']));

        request.globalStoreData.personal = personal;
    };

    const contact = () => {
        info('Your inquiry was submitted and will be responded to as soon as possible. Thank you for contacting us.');
    };

    const init = () => {
        const session = request.session;
        const action = request.body.action;

        if (action) {
            switch (action) {
                case 'login':
                    login(session);
                    break;
                case 'logout':
                    logout(session);
                    break;
                case 'register':
                    register(session);
                    break;
                case 'personal':
                    personal(session);
                    break;
                case 'contact':
                    contact();
                    break;
                default: break;
            }
        }

        const user = session.user;
        if (user) {
            request.globalStoreData.user = user;

            const tracking = request.globalStoreData.ts;
            tracking.customer(user, request.globalStoreData.personal);
        }
    };

    __constructor();
};

module.exports = CustomerService;
