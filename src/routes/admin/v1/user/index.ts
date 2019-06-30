import express from "express";
import Routes from "../../..";
import UserController from "../../../../controller/user/controller";
import * as userModel from "../../../../model/user";
import Validator from "../../../../validator";

class UserRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        const userController = new UserController();
        const validator = new Validator();
        this.router.get("/search", userController.find);
        router.use(path, this.router);
    }
}

export default new UserRoutes();
