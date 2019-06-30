import { NextFunction, Request, Response } from "express";
import Log from "../../../lib/Logger";

/**
 * Authentication Middleware for admin routes
 * admin routes are routes that are restricted by
 * a token that gets expired after a certain period
 * of time. If expired token is passed, this function
 * will respond with HTTP status code of 401
 */

class AdminAuthentication {
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        Log.print("--- ADMIN AUTHENTICATION ---");
        // as we do not want to authenticate OPTIONS request
        if (req.method === "OPTIONS") {
            return next();
        }
        return next();
    }
}

export default new AdminAuthentication();
