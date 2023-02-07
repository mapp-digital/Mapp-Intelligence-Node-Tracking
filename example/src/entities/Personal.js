const Personal = function(user) {
    this.user = user;
    this.address1 = '';
    this.address2 = '';
    this.country = '';
    this.city = '';
    this.postCode = '';

    this.getUser = () => {
        return this.user;
    };

    this.setUser = (user) => {
        this.user = user;
    };

    this.getAddress1 = () => {
        return this.address1;
    };

    this.setAddress1 = (address1) => {
        this.address1 = address1;
    };

    this.getAddress2 = () => {
        return this.address2;
    };

    this.setAddress2 = (address2) => {
        this.address2 = address2;
    };

    this.getCountry = () => {
        return this.country;
    };

    this.setCountry = (country) => {
        this.country = country;
    };

    this.getCity = () => {
        return this.city;
    };

    this.setCity = (city) => {
        this.city = city;
    };

    this.getPostCode = () => {
        return this.postCode;
    };

    this.setPostCode = (postCode) => {
        this.postCode = postCode;
    };
};

module.exports = Personal;
