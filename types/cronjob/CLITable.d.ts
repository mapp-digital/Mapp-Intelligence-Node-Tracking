export declare class CLITable {
    private static readonly LINE_BREAK;
    private readonly maxWidth;
    private readonly cellWidth;
    private rows;
    constructor(maxWidth?: number);
    private static wordwrap;
    private static addBlankSpace;
    addRow(cell1: string, width1: number, cell2: string, width2: number): void;
    addEmptyRow(): void;
    build(): string;
}
