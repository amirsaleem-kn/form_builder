import { NextFunction, Request, Response } from "express";
import * as userModel from "../../model/user";
import Validator from "../index";

class UserValidator {
    constructor() {
        this.findById = this.findById.bind(this);
        this.listAll = this.listAll.bind(this);
        this.register = this.register.bind(this);
    }
    public findById(req: Request, res: Response, next: NextFunction) {
        const getUserValidator = new Validator(userModel.getUser);
        getUserValidator.validate(req, res, next);
    }
    public listAll(req: Request, res: Response, next: NextFunction) {
        const getUsersValidator = new Validator(userModel.getUsers);
        getUsersValidator.validate(req, res, next);
    }
    public register(req: Request, res: Response, next: NextFunction) {
        const registeruserValidator = new Validator(userModel.registerUser);
        registeruserValidator.validate(req, res, next);
    }
    public delete(req: Request, res: Response, next: NextFunction) {
        const deleteUserValidator = new Validator(userModel.deleteUser);
        deleteUserValidator.validate(req, res, next);
    }
}

export default UserValidator;
