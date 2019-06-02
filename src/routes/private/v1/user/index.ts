import express from "express";
import UserController from "../../../../controller/user/controller";
import Routes from "../../../../routes";
import UserValidator from "../../../../validator/user";

class UserRoutes extends Routes {
    constructor() {
        super();
    }
    public subscribe(path: string, router: express.Router) {
        const userController = new UserController();
        const userValidator = new UserValidator();
        this.router
        .get("/:userId", userValidator.findById, userController.findById)
        .delete("/:userId", userValidator.delete, userController.delete);
        this.router.post("/register", userValidator.register, userController.register);
        this.router.get("/", userValidator.listAll, userController.listAll);
        router.use(path, this.router);
    }
}

export default new UserRoutes();
