import { AData } from './AData';
export declare class Customer extends AData {
    private id;
    private customIdentifier;
    private email;
    private emailRID;
    private emailOptin;
    private firstName;
    private lastName;
    private telephone;
    private gender;
    private birthday;
    private country;
    private city;
    private postalCode;
    private street;
    private streetNumber;
    private validation;
    private category;
    constructor(i?: string);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setId(i: string): Customer;
    setCustomIdentifier(c: string): Customer;
    setEmail(e: string): Customer;
    setEmailRID(eRID: string): Customer;
    setEmailOptin(eOptin: boolean): Customer;
    setFirstName(fName: string): Customer;
    setLastName(lName: string): Customer;
    setTelephone(t: string): Customer;
    setGender(g: number): Customer;
    setBirthday(b: string): Customer;
    setCountry(c: string): Customer;
    setCity(c: string): Customer;
    setPostalCode(pCode: string): Customer;
    setStreet(s: string): Customer;
    setStreetNumber(sNumber: string): Customer;
    setValidation(v: boolean): Customer;
    setCategory(i: number, value: string): Customer;
}
