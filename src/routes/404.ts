import { NextFunction, Request, Response } from "express";
import express from "express";
import Http from "../lib/http/http";
import Router from "../routes";

class ResourceNotFoundHandler extends Router {
    constructor() {
        super();
    }
    public subscribe(router: express.Router) {
        router.use(this.notFoundHandler);
    }
    private notFoundHandler(req: Request, res: Response, next: NextFunction) {
        res.status(404);
        Http.Response.notFound(res);
    }
}

export default new ResourceNotFoundHandler();
