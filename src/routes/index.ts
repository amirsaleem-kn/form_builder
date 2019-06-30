import express, { NextFunction, Request, Response } from "express";
import expressValidator from "express-validator";
import HttpResponse from "../lib/http/response";

class Routes {

    public router: express.Router = null;
    constructor() {
        this.router = express.Router();
        this.router.use(expressValidator({
            customValidators: {
                equals: () => {
                   return true;
                },
                gte: (param, num) => {
                    return param >= num;
                },
                isArray: (value) => {
                    return Array.isArray(value);
                },
                notEmpty: (array) => {
                    return array.length > 0;
                },
            }
        }));
    }

    protected errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
        const response = new HttpResponse(res);
        response.status = +res.locals.status || 503;
        response.error([{ msg: err.toString() }]);
    }

}

export default Routes;
