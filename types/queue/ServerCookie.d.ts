import { ICookie } from '../ICookie';
export declare class ServerCookie implements ICookie {
    private readonly name;
    private readonly value;
    private domain;
    private expiry;
    private path;
    private secure;
    private httpOnly;
    constructor(n: string, v: string);
    setDomain(d: string): void;
    getDomain(): string;
    setMaxAge(e: number): void;
    getMaxAge(): number;
    setPath(p: string): void;
    getPath(): string;
    setSecure(s: boolean): void;
    isSecure(): boolean;
    getName(): string;
    getValue(): string;
    setHttpOnly(isHttpOnly: boolean): void;
    isHttpOnly(): boolean;
}
