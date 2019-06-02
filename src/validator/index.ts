import { NextFunction, Request, Response } from "express";
import { check } from "express-validator/check";
import Log from "../lib/logger";

class Validator {
    private model: any = null;
    constructor(mod: any) {
        this.model = mod;
        this.validate = this.validate.bind(this);
    }
    public async validate(req: Request, res: Response, next: NextFunction) {
        Object.keys(this.model).forEach((item) => {
            if (this.model[item].required) {
                req.check(item, "error").exists();
                req.sanitizeBody(item).trim();
            }
        });
        const errors = await req.getValidationResult();
        const errArray = errors.array();
        if (errArray.length) {
            const error: any = new Error("Invalid Request Payload");
            error.errors = errArray;
            res.locals.status = 422;
            return next(error);
        }
        next();
    }
}

export default Validator;
