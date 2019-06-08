import { NextFunction, Request, Response } from "express";
import Log from "../../../lib/Logger";

class PublicAuthentication {
    public authenticate(req: Request, res: Response, next: NextFunction): void {
        if (req.method === "OPTIONS") {
            return next();
        }
        Log.print("--- PUBLIC AUTHENTICATION ---");
        next();
    }
}

export default new PublicAuthentication();
