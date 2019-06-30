import { NextFunction, Request, Response } from "express";
import config from "../../../configuration";
import jwt from "../../../lib/jwt";
import Log from "../../../lib/Logger";
import * as types from "../../../types";

/**
 * Authentication Middleware for private routes
 * Private routes are routes that have access to applications
 * core funcionality. Users registered as administrators have
 * access to private routes, all application clients and super
 * priviledges. There can only be atmost two administrators
 */

class PrivateAuthentication {
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            return next();
        } catch (e) {
            next(e);
        }
    }
}

export default new PrivateAuthentication();
