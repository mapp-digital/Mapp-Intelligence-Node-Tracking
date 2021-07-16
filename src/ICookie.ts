export interface ICookie {
    /**
     * @param domain Specifies the domain within which this cookie should be presented.
     */
    setDomain: (domain: string) => void;

    /**
     * @return Gets the domain name of this cookie.
     */
    getDomain: () => string;

    /**
     * Sets the maximum age in seconds for this cookie.
     *
     * @param expiry Sets the maximum age in seconds for this cookie.
     */
    setMaxAge: (expiry: number) => void;

    /**
     * Gets the maximum age in seconds of this cookie.
     *
     * @return Gets the maximum age in seconds of this cookie.
     */
    getMaxAge: () => number;

    /**
     * @param uri Specifies a path for the cookie to which the client should return the cookie.
     */
    setPath: (uri: string) => void;

    /**
     * @return Returns the path on the server to which the browser returns this cookie.
     */
    getPath: () => string;

    /**
     * @param flag Indicates to the browser whether the cookie should only be sent using a secure protocol, such as
     *             HTTPS or SSL.
     */
    setSecure: (flag: boolean) => void;

    /**
     * @return  Returns true if the browser is sending cookies only over a secure protocol, or false if the browser
     *          can send cookies using any protocol.
     */
    isSecure: () => boolean;

    /**
     * @return Returns the name of the cookie.
     */
    getName: () => string;

    /**
     * @return Gets the current value of this cookie.
     */
    getValue: () => string;

    /**
     * @param isHttpOnly Marks or unmarks this cookie as HttpOnly.
     */
    setHttpOnly: (isHttpOnly: boolean) => void;

    /**
     * @return Checks whether this cookie has been marked as HttpOnly.
     */
    isHttpOnly: () => boolean;
}
