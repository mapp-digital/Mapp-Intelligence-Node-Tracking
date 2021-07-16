import { AData } from './AData';
export declare class Action extends AData {
    private name;
    private readonly parameter;
    private readonly goal;
    constructor(n?: string);
    protected getQueryList(): {
        [key: string]: string;
    };
    protected toMap(): {
        [key: string]: any;
    };
    setName(n: string): Action;
    setParameter(id: number, value: string): Action;
    setGoal(id: number, value: string): Action;
}
