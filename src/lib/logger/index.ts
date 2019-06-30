/**
 * @fileoverview implementation of logger
 * @public
 * @package environment from ./util/env file
 */

/**
 * Logger for logging logs during development and/or production
 * @implements console.log
 */

class Log {

    /**
     * prints the log using console.log in any environment
     * @param {any} args any argument that needs to be logged
     */

    public print(...args: any[]): void {
        // tslint:disable-next-line:no-console
        console.log(...args);
    }

    /**
     * prints the log using console.error in any environment
     * @param {any} args any argument that needs to be logged
     */

    public error(args: any): void {
        console.error(args);
    }

    /**
     * prints the log using console.log in envrionemnt other than production
     * @param {any} args any argument that needs to be logged
     */

    public debug(args: any) {
        if (process.env.NODE_ENV !== "production") {
            this.print(args);
        }
    }

    /**
     * prints the log using console.warn in any environment
     * @param {any} args any argument that needs to be logged
     */

    public warning(args: any) {
        console.warn(args);
    }
}

export default new Log();
