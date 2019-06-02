class Log {
    public print(...args: any[]): void {
        // tslint:disable-next-line:no-console
        console.log(...args);
    }
}

export default new Log();
