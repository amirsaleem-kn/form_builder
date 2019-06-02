import { NextFunction, Request, Response } from "express";
import log from "../../../lib/logger";

class PublicAuthentication {
    public authenticate(req: Request, res: Response, next: NextFunction): void {
        if (req.method === "OPTIONS") {
            return next();
        }
        log.print("--- PUBLIC AUTHENTICATION ---");
        next();
    }
}

export default new PublicAuthentication();
