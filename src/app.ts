import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import config from "./configuration";
import Log from "./lib/logger";
import subscriber from "./routes/subscriber";

/**
 * class to contain Express Application Server
 */

class App {
    public app: express.Application = null;
    private port: number = process.env.PORT || config.app.port || 8080;
    private startupMessage: string = config.app.startupMessage;

    constructor() {
        this.init();
    }

    public async start(): Promise<void> {
        this.app.listen(this.port, () => {
            Log.print(this.startupMessage);
        });
    }

    private init(): void {
        this.app = express();
        this.app.use(bodyParser.json(config.bodyParser.json));
        this.app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
        subscriber.subscribe(this.app); // subscribe to application routes
    }
}

export default new App();
