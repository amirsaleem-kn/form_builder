import express from "express";
import priavateAuthentication from "../../controller/authentication/private";
import Router from "../../routes";
import v1Routes from "./v1";

class PrivateRoutes extends Router {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router): void {
        this.router.use(priavateAuthentication.authenticate);
        v1Routes.subscribe("/v1", this.router); // subscribe to v1 routes
        router.use(path, this.router); // let others subscribe to v1 routes
        this.router.use(this.errorMiddleware);
    }
}

export default new PrivateRoutes();
