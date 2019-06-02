import express from "express";
import userRoutes from "./user";

class V1Routes {
    public router: express.Router = null;
    constructor() {
        this.router = express.Router();
        this.router.use("/user", userRoutes.router);
    }
    public subscribe(path: string, router: express.Router) {
        userRoutes.subscribe("/user", this.router);
        router.use(path, this.router);

    }
}

export default new V1Routes();
