import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import "reflect-metadata";
import config from "./configuration";
import log from "./lib/logger";
import subscriber from "./routes/subscriber";
import crypto from "./util/crypto";

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
            log.print(this.startupMessage);
        });
    }

    private init(): void {
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(bodyParser.json(config.bodyParser.json));
        this.app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
        subscriber.subscribe(this.app); // subscribe to application routes
    }
}

export default new App();
