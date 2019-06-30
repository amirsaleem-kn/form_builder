/**
 * @fileoverview contains Application class to deal with express.Application
 *
 * -- external dependencies --
 * @package bodyParser used to parse the incoming requests
 * @package cookieParser used to parse the cookies data
 * @package express framework to create a server in NodeJS application
 * @package mongoose MongoDB Object Resource Model (ORM)
 *
 * -- internal dependencies --
 * @package config application configuration
 * @package Log logger class instance
 * @package subscriber routes subscriber
 */

/** Package Imports  */

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import "reflect-metadata";

/** Local Imports  */

import config from "./configuration";
import database from "./lib/database";
import Log from "./lib/Logger";
import subscriber from "./routes/subscriber/main";

/**
 * class to contain Express Application Server
 * @private
 */

class App {

    /** @public express application instance  */
    public app: express.Application = null;

    /** @private application port number */
    private port: string = process.env.PORT || config.app.port;

    /** @private message to be displayed on startup of the application */
    private startupMessage: string = config.app.startupMessage;

    constructor() {
        this.init();
    }

    /** @public to start the application server  */

    public async start(): Promise<void> {
        this.app.listen(this.port, () => {
            Log.print(this.startupMessage);
        });
    }

    /** @private to initialize the application configuration and subscribe to routes */

    private init(): void {
        try {
            this.app = express();
            this.app.use(cookieParser());
            this.app.use(bodyParser.json(config.bodyParser.json));
            this.app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));
            database.connect().catch((err: Error) => Log.error(err));
            subscriber.subscribe(this.app); // subscribe to application routes
        } catch (e) {
            Log.error(e);
        }
    }
}

/** export an instance of the App to make sure only single application is available
 * throughout the project
 */

export default new App();
