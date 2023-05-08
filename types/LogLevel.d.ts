export declare class LogLevel {
    static readonly NONE: number;
    static readonly FATAL: number;
    static readonly ERROR: number;
    static readonly WARN: number;
    static readonly INFO: number;
    static readonly DEBUG: number;
    static getName(ll: number): string;
    static getValue(ll: string): number;
}
