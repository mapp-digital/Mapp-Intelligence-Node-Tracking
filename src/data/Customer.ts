import {AData} from './AData';
import {Parameter} from '../Parameter';

export class Customer extends AData {
    /**
     * Use this to transmit an unique identifier of the user.
     */
    private id: string = '';
    /**
     * Use this to transmit an unique custom identifier of the user.
     */
    private customIdentifier: string = '';
    /**
     * Use this to transmit the e-mail address of the user.
     */
    private email: string = '';
    /**
     * Use this to transmit the e-mail receiver ID of the user.
     */
    private emailRID: string = '';
    /**
     * Use this to transmit the e-mail opt-in status of the user.
     */
    private emailOptin: boolean = false;
    /**
     * Use this to transmit the first name of the user.
     */
    private firstName: string = '';
    /**
     * Use this to transmit the last name of the user.
     */
    private lastName: string = '';
    /**
     * Use this to transmit the telephone number of the user.
     */
    private telephone: string = '';
    /**
     * Use this to transmit the gender of the user (1 = male | 2 = female).
     */
    private gender: number = 0;
    /**
     * Use this to transmit the user's date of birth (YYYYMMDD).
     */
    private birthday: string = '';
    /**
     * Use this to transmit the country of the user.
     */
    private country: string = '';
    /**
     * Use this to transmit the city of the user.
     */
    private city: string = '';
    /**
     * Use this to transmit the postal code of the user.
     */
    private postalCode: string = '';
    /**
     * Use this to transmit the street of the user.
     */
    private street: string = '';
    /**
     * Use this to transmit the street number of the user.
     */
    private streetNumber: string = '';
    /**
     * Overwrites existing URM categorise.
     */
    private validation: boolean = false;
    /**
     * The optional category (User Relation Management) can be used to categorise a customer. URM categories must
     * be created in the tool first of all.
     */
    private category: {[key: number]: string} = {};

    /**
     * @param i Use this to transmit an unique identifier of the user
     */
    public constructor(i?: string) {
        super();

        if (i) {
            this.id = i;
        }
    }

    /**
     * @return List of query strings
     */
    protected getQueryList(): {[key: string]: string} {
        const queryList: {[key: string]: string} = {};
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
    }

    /**
     * @return Data as object
     */
    protected toMap(): {[key: string]: any} {
        const data: {[key: string]: any} = {};
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
    }

    /**
     * @param i Use this to transmit an unique identifier of the user
     *
     * @return this
     */
    public setId(i: string): Customer {
        this.id = i;

        return this;
    }

    /**
     * @param c Use this to transmit an unique custom identifier of the user
     *
     * @return this
     */
    public setCustomIdentifier(c: string): Customer {
        this.customIdentifier = c;

        return this;
    }

    /**
     * @param e Use this to transmit the e-mail address of the user
     *
     * @return this
     */
    public setEmail(e: string): Customer {
        this.email = e;

        return this;
    }

    /**
     * @param eRID Use this to transmit the e-mail receiver ID of the user
     *
     * @return this
     */
    public setEmailRID(eRID: string): Customer {
        this.emailRID = eRID;

        return this;
    }

    /**
     * @param eOptin Use this to transmit the e-mail opt-in status of the user
     *
     * @return this
     */
    public setEmailOptin(eOptin: boolean): Customer {
        this.emailOptin = eOptin;

        return this;
    }

    /**
     * @param fName Use this to transmit the first name of the user
     *
     * @return this
     */
    public setFirstName(fName: string): Customer {
        this.firstName = fName;

        return this;
    }

    /**
     * @param lName Use this to transmit the last name of the user
     * @return this
     */
    public setLastName(lName: string): Customer {
        this.lastName = lName;

        return this;
    }

    /**
     * @param t Use this to transmit the telephone number of the user
     *
     * @return this
     */
    public setTelephone(t: string): Customer {
        this.telephone = t;

        return this;
    }

    /**
     * @param g Use this to transmit the gender of the user (1 = male | 2 = female)
     *
     * @return this
     */
    public setGender(g: number): Customer {
        this.gender = g;

        return this;
    }

    /**
     * @param b Use this to transmit the user's date of birth (YYYYMMDD)
     *
     * @return this
     */
    public setBirthday(b: string): Customer {
        this.birthday = b;

        return this;
    }

    /**
     * @param c Use this to transmit the country of the user
     *
     * @return this
     */
    public setCountry(c: string): Customer {
        this.country = c;

        return this;
    }

    /**
     * @param c Use this to transmit the city of the user
     *
     * @return this
     */
    public setCity(c: string): Customer {
        this.city = c;

        return this;
    }

    /**
     * @param pCode Use this to transmit the postal code of the user
     *
     * @return this
     */
    public setPostalCode(pCode: string): Customer {
        this.postalCode = pCode;

        return this;
    }

    /**
     * @param s Use this to transmit the street of the user
     *
     * @return this
     */
    public setStreet(s: string): Customer {
        this.street = s;

        return this;
    }

    /**
     * @param sNumber Use this to transmit the street number of the user
     *
     * @return this
     */
    public setStreetNumber(sNumber: string): Customer {
        this.streetNumber = sNumber;

        return this;
    }

    /**
     * @param v Overwrites existing URM categorise
     *
     * @return this
     */
    public setValidation(v: boolean): Customer {
        this.validation = v;

        return this;
    }

    /**
     * The optional category (User Relation Management) can be used to categorise a customer. URM categories must be
     * created in the tool first of all.
     *
     * @param i     ID of the parameter
     * @param value Value of the parameter
     *
     * @return this
     */
    public setCategory(i: number, value: string): Customer {
        this.category[i] = value;

        return this;
    }
}
