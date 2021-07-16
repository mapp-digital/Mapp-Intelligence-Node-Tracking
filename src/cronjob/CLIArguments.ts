export class CLIArguments {
    private readonly args: {[key: string]: string} = {};

    /**
     * @param args Command line arguments
     */
    public constructor(args: Array<string>) {
        this.parseArgs(args);
    }

    /**
     * @param {string} key
     * @param {string} val
     */
    private setArg(key: string, val: string): void {
        if (key && val) {
            this.args[key] = val;
        }
    }

    /**
     * @param args Command line arguments
     */
    private parseArgs(args: Array<string>): void {
        let next;
        let key;
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (/^--.+=/.test(arg)) {
                const match = arg.match(/^--([^=]+)=([\s\S]*)$/);
                this.setArg(match[1], match[2]);
            }
            else if (/^--.+/.test(arg)) {
                key = arg.match(/^--(.+)/)[1];
                next = args[i + 1];
                if ((next !== undefined && !/^-/.test(next)) || /^(true|false)$/.test(next)) {
                    this.setArg(key, next);
                    i++;
                }
                else {
                    this.setArg(key, 'true');
                }
            }
            else if (/^-[^-]+/.test(arg)) {
                const letters = arg.slice(1, -1).split('');
                let broken = false;

                for (let j = 0; j < letters.length; j++) {
                    next = arg.slice(j + 2);

                    if (next === '-') {
                        this.setArg(letters[j], next);
                        continue;
                    }

                    if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                        this.setArg(letters[j], next.split('=')[1]);
                        broken = true;
                        break;
                    }

                    if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                        this.setArg(letters[j], next);
                        broken = true;
                        break;
                    }

                    if (letters[j+1] && letters[j+1].match(/\W/)) {
                        this.setArg(letters[j], arg.slice(j+2));
                        broken = true;
                        break;
                    }
                    else {
                        this.setArg(letters[j], 'true');
                    }
                }

                key = arg.slice(-1)[0];
                if (!broken && key !== '-') {
                    next = args[i + 1];
                    if (next && (!/^(-|--)[^-]/.test(next) || /^(true|false)$/.test(next))) {
                        this.setArg(key, next);
                        i++;
                    }
                    else {
                        this.setArg(key, 'true');
                    }
                }
            }
        }
    }

    /**
     * @return {[key: string]: string}
     */
    public getArgs(): {[key: string]: string} {
        return this.args;
    }
}
