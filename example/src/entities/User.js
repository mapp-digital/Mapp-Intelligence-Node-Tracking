const User = function(email = '', password = '') {
    this.firstName;
    this.lastName;
    this.fullName;
    this.telephone;
    this.email = email;
    this.password = password;

    this.getEmail = () => {
        return this.email;
    };

    this.setEmail = (email) => {
        this.email = email;
    };

    this.getPassword = () => {
        return this.password;
    };

    this.setPassword = (password) => {
        this.password = password;
    };

    this.getFirstName = () => {
        return this.firstName;
    };

    this.setFirstName = (firstName) => {
        this.firstName = firstName;
        this.setFullName();
    };

    this.getLastName = () => {
        return this.lastName;
    };

    this.setLastName = (lastName) => {
        this.lastName = lastName;
        this.setFullName();
    };

    this.getFullName = () => {
        return this.fullName;
    };

    this.setFullName = () => {
        this.fullName = this.firstName + " " + this.lastName;
    };

    this.getTelephone = () => {
        return this.telephone;
    };

    this.setTelephone = (telephone) => {
        this.telephone = telephone;
    };
};

module.exports = User;