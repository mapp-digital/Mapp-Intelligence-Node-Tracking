export interface ICookie {
    setDomain: (domain: string) => void;
    getDomain: () => string;
    setMaxAge: (expiry: number) => void;
    getMaxAge: () => number;
    setPath: (uri: string) => void;
    getPath: () => string;
    setSecure: (flag: boolean) => void;
    isSecure: () => boolean;
    getName: () => string;
    getValue: () => string;
    setHttpOnly: (isHttpOnly: boolean) => void;
    isHttpOnly: () => boolean;
}
