import {ICookie} from '../ICookie';

export class ServerCookie implements ICookie {
    /**
     * Name of the cookie.
     */
    private readonly name: string;
    /**
     * Value of the cookie.
     */
    private readonly value: string;
    /**
     * The domain within which this cookie should be presented.
     */
    private domain: string = '';
    /**
     * The maximum age in seconds for this cookie.
     */
    private expiry: number;
    /**
     * The path on the server to which the browser returns this cookie.
     */
    private path: string = '';
    /**
     * true if the browser is sending cookies only over a secure protocol, or false if the browser can send
     * cookies using any protocol.
     */
    private secure: boolean;
    /**
     * Marks or unmarks this cookie as HttpOnly.
     */
    private httpOnly: boolean;

    /**
     * @param n Name of the cookie.
     * @param v Value of this cookie.
     */
    public constructor(n: string, v: string) {
        this.name = n;
        this.value = v;
    }

    /**
     * @param d Specifies the domain within which this cookie should be presented.
     */
    public setDomain(d: string): void {
        this.domain = d;
    }

    /**
     * @return Gets the domain name of this cookie.
     */
    public getDomain(): string {
        return this.domain;
    }

    /**
     * Sets the maximum age in seconds for this cookie.
     *
     * @param e Sets the maximum age in seconds for this cookie.
     */
    public setMaxAge(e: number): void {
        this.expiry = e;
    }

    /**
     * Gets the maximum age in seconds of this cookie.
     *
     * @return Gets the maximum age in seconds of this cookie.
     */
    public getMaxAge(): number {
        return this.expiry;
    }

    /**
     * @param p Specifies a path for the cookie to which the client should return the cookie.
     */
    public setPath(p: string): void {
        this.path = p;
    }

    /**
     * @return Returns the path on the server to which the browser returns this cookie.
     */
    public getPath(): string {
        return this.path;
    }

    /**
     * @param s Indicates to the browser whether the cookie should only be sent using a secure protocol,
     *          such as HTTPS or SSL.
     */
    public setSecure(s: boolean): void {
        this.secure = s;
    }

    /**
     * @return  Returns true if the browser is sending cookies only over a secure protocol, or false if the browser
     *          can send cookies using any protocol.
     */
    public isSecure(): boolean {
        return this.secure;
    }

    /**
     * @return Returns the name of the cookie.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @return Gets the current value of this cookie.
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * @param isHttpOnly Marks or unmarks this cookie as HttpOnly.
     */
    public setHttpOnly(isHttpOnly: boolean): void {
        this.httpOnly = isHttpOnly;
    }

    /**
     * @return Checks whether this cookie has been marked as HttpOnly.
     */
    public isHttpOnly(): boolean {
        return this.httpOnly;
    }
}
