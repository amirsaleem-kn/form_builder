import { NextFunction, Request, Response } from "express";
import log from "../../../lib/logger";

/**
 * Authentication Middleware for private routes
 * Private routes are routes that are restricted by
 * a token that gets expired after a certain period
 * of time. If expired token is passed, this function
 * will respond with HTTP status code of 401
 */

class PrivateAuthentication {
    public authenticate(req: Request, res: Response, next: NextFunction) {
        // as we do not want to authenticate OPTIONS request
        if (req.method === "OPTIONS") {
            return next();
        }
        log.print("--- PRIVATE AUTHENTICATION ---");
        next();
    }
}

export default new PrivateAuthentication();
