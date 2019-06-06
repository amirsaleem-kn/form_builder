import { NextFunction, Request, Response } from "express";
import config from "../../../configuration";
import { Database } from "../../../lib/database";
import httpResponse from "../../../lib/http/response";
import jwt from "../../../lib/jwt";
import log from "../../../lib/logger";
import * as types from "../../../types";

/**
 * Authentication Middleware for protected routes
 * protected routes are routes that are restricted by
 * a token that gets expired after a certain period
 * of time. If expired token is passed, this function
 * will respond with HTTP status code of 401
 */

class ProtectedAuthentication {
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        log.print("--- PROTECTED AUTHENTICATION ---");
        // as we do not want to authenticate OPTIONS request
        if (req.method === "OPTIONS") {
            return next();
        }
        let token: string = req.get("Authorization"); // get token from Authorization header
        const username: string = req.get("username");
        const clientID: string = req.get("clientID");
        if (!token) {
            httpResponse.unauthorised(res);
            return;
        }
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            token = token.slice(7, token.length); // strip the token string to remove Bearer from it
            return next();
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }
}

export default new ProtectedAuthentication();
