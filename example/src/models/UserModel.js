const fs = require('fs');

const User = require('../entities/User');
const staticUsers = require('../../resources/users');

const UserModel = function() {
    /**
     * @param {User} user
     *
     * @returns {User}
     */
    const save = (user) => {
        staticUsers[user.getEmail()] = {
            FirstName: user.getFirstName(),
            LastName: user.getLastName(),
            Password: user.getPassword(),
            Email: user.getEmail(),
            Telephone: user.getTelephone()
        };

        try {
            fs.writeFileSync('./resources/users.js', 'module.exports = ' + JSON.stringify(staticUsers, null, 4) + ';');
        }
        catch (e) {
            console.log(e.stack);
        }

        return user;
    };

    /**
     * @param {string} mail
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} telephone
     *
     * @returns {null|User}
     */
    this.register = (mail, password, firstName, lastName, telephone) => {
        const user = new User(mail, password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setTelephone(telephone);

        if (this.find(mail) === null) {
            return save(user);
        }

        return null;
    };

    /**
     * @param {string} mail
     * @param {string} password
     *
     * @returns {null|User}
     */
    this.login = (mail, password) => {
        const user = this.find(mail);
        if (user && user.getPassword() === password) {
            return user;
        }

        return null;
    };

    /**
     * @param {string} mail
     *
     * @returns {null|User}
     */
    this.find = (mail) => {
        const registeredUser = staticUsers[mail];
        let user = null;

        if (registeredUser) {
            user = new User();
            user.setFirstName(registeredUser['FirstName']);
            user.setLastName(registeredUser['LastName']);
            user.setPassword(registeredUser['Password']);
            user.setEmail(registeredUser['Email']);
            user.setTelephone(registeredUser['Telephone']);
        }

        return user;
    };
};

module.exports = UserModel;
