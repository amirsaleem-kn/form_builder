import express from "express";
import publicAuthentication from "../../controller/authentication/public";
import Routes from "../../routes";
import v1Routes from "./v1";

class PublicRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        this.router.use(publicAuthentication.authenticate);
        v1Routes.subscribe("/v1", this.router);
        router.use(path, this.router);
        this.router.use(this.errorMiddleware);

    }
}

export default new PublicRoutes();
