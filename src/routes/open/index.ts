import express from "express";
import Routes from "../index";

class OpenRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        this.router.use(this.errorMiddleware);
        router.use(path, this.router);
    }
}

export default new OpenRoutes();
