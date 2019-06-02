import { NextFunction, Request, Response } from "express";
import User from "../../entity/user/user";
import Database from "../../lib/database/database";
import httpResponse from "../../lib/http/response";
import Log from "../../lib/logger";
import * as types from "../../types";
import crypto from "../../util/crypto";

class UserController {

    constructor() {
        this.findById = this.findById.bind(this);
        this.register = this.register.bind(this);
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user = new User(conn);
            const userId: number = req.params.userId;
            const result: any = await user.find({ userId });
            httpResponse.success(res, result);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    public async listAll(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user = new User(conn);
            const users: Promise<any> = await user.list();
            httpResponse.success(res, users);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const { username } = req.body;
            const existingUser: any = await user.find({ username });
            if (existingUser.length > 0) {
                httpResponse.badRequest(res, { message: "username already exists" });
                return;
            }
            const result: any = await user.register(req.body);
            httpResponse.success(res, result);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const { userId } = req.params;
            const result = await user.delete(userId);
            httpResponse.success(res, result);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

}

export default UserController;
