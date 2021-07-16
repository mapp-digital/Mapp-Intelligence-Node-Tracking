import {EOL} from 'os';

export class CLITable {
    private static readonly LINE_BREAK: string = EOL;
    private readonly maxWidth: number;
    private readonly cellWidth: number;
    private rows: Array<string> = [];

    /**
     * @param maxWidth
     */
    public constructor(maxWidth: number = 90) {
        this.maxWidth = maxWidth;
        this.cellWidth = Math.round(this.maxWidth / 18);
    }

    /**
     * @param txt
     * @param maxWidth
     */
    private static wordwrap(txt: string, maxWidth: number): Array<string> {
        const txtSplit: Array<string> = txt.trim().split(' ');
        const wordwrap: Array<string> = [];
        let wordwrapCounter = 0;
        for (let i = 0; i < txtSplit.length; i++) {
            const wordLength = txtSplit[i].length + 1;
            if (wordwrapCounter + wordLength >= maxWidth) {
                txtSplit[i] = CLITable.LINE_BREAK + txtSplit[i];
                wordwrapCounter = wordLength;
            }
            else {
                wordwrapCounter += wordLength;
            }

            wordwrap.push(txtSplit[i]);
        }

        return wordwrap.join(' ').split(CLITable.LINE_BREAK);
    }

    /**
     * @param txt
     * @param count
     * @return string
     */
    private static addBlankSpace(txt: string, count: number): string {
        let str = '';
        for (let i = 0; i <= count; i++) {
            str += ' ';
        }

        const result = txt + str;
        return result.substring(0, Math.max(txt.length, count));
    }

    /**
     * @param cell1
     * @param width1
     * @param cell2
     * @param width2
     */
    public addRow(cell1: string, width1: number, cell2: string, width2: number): void {
        const cw1 = this.cellWidth * width1;
        const cw2 = this.cellWidth * width2;

        const txt = CLITable.wordwrap(cell2, cw2);
        for (let i = 0; i < txt.length; i++) {
            if (i === 0) {
                this.rows.push(`${CLITable.addBlankSpace(cell1, cw1)} ${CLITable.addBlankSpace(txt[i], cw2)}`);
            }
            else {
                this.rows.push(`${CLITable.addBlankSpace('', cw1)} ${CLITable.addBlankSpace(txt[i], cw2)}`);
            }
        }
    }

    /**
     *
     */
    public addEmptyRow(): void {
        this.rows.push('');
    }

    /**
     * @return string
     */
    public build(): string {
        return this.rows.join(CLITable.LINE_BREAK);
    }
}
