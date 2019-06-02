import express from "express";
import UserController from "../../../../controller/user/controller";
import Routes from "../../../../routes";

class UserRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        const userController = new UserController();
        this.router.get("/", userController.findById);
        router.use(path, this.router);
    }
}

export default new UserRoutes();
