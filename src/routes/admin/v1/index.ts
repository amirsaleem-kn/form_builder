import express from "express";
import Routes from "../..";
import userRoutes from "./user";

class V1Routes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        userRoutes.subscribe("/user", this.router);
        router.use(path, this.router);
    }
}

export default new V1Routes();
