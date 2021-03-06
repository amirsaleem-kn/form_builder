import express from "express";
import UserController from "../../../../controller/user";
import Routes from "../../../../routes";
import Validator from "../../../../validator";

class UserRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        const userController = new UserController();
        const validator = new Validator();
        router.use(path, this.router);
    }
}

export default new UserRoutes();
