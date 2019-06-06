import { NextFunction, Request, Response } from "express";
import { check } from "express-validator/check";
import Log from "../lib/logger";

class Validator {
    public validate(model: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            Log.print(req.body);
            Object.keys(model).forEach((key) => {
                const item = model[key];
                if (item.required) {
                    req.check(key).exists({ checkNull: true, checkFalsy: true });
                }
                if (item.in) {
                    req.check(key).isIn(item.in);
                }
                if (item.notIn) {
                    req.check(key).not().isIn(item.notIn);
                }
                if (item.type) {
                    switch (item.type) {
                        case "string": req.check(key).optional().isString(); break;
                        case "number": req.check(key).optional().isNumeric(); break;
                        case "array": req.check(key).optional().isArray().notEmpty(); break;
                        case "email": req.check(key).optional().isEmail(); break;
                    }
                }
                if (item.maxLen) {
                    req.check(key).isLength({ max: item.maxLen });
                }
                if (item.minLen) {
                    req.check(key).isLength({ max: item.minLen });
                }
                if (item.regex) {
                    req.check(key).matches(item.regex);
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
        };
    }
}

export default Validator;
