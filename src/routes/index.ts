import express, { NextFunction, Request, Response } from "express";
import expressValidator from "express-validator";
import Http from "../lib/http/http";
import Log from "../lib/Logger";

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
        Log.print("INSIDE ERROR MIDDLEWARE");
        Log.print(err);
        switch (+res.locals.status) {
            case 422: Http.Response.badRequest(res, err); break;
            default: Http.Response.serviceError(res);
        }
    }

}

export default Routes;
