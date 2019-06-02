import express, { NextFunction, Request, Response } from "express";
import Routes from "../../routes";

/**
 * Defining response headers for OPTIONS request
 * as required by the CORS policy. You can read
 * more about CORS from https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */

class OptionsSubscriber extends Routes {
    public subscribe(app: express.Application) {
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*"); // allow these origins to make requests
            res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,DELETE"); // allow these HTTP methods
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type"); // allow these headers
            next();
        });
    }
}

export default new OptionsSubscriber();
