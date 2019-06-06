import { NextFunction, Request, Response } from "express";
import User from "../../entity/user/user";
import Database from "../../lib/database/database";
import httpResponse from "../../lib/http/response";
import Log from "../../lib/logger";
import * as types from "../../types";
import * as util from "../../util/helper";

class UserController {

    constructor() {
        this.login = this.login.bind(this);
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            httpResponse.success(res, []);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const clientSecret = req.get("clientSecret");
            let credentials: any = req.get("Authorization");
            if (!clientSecret || !credentials) {
                httpResponse.forbidden(res); // 403
                return;
            }
            credentials = util.base64_decode(credentials.slice(6, credentials.length));
            credentials = credentials.split(":");
            const token = await user.login(credentials[0], credentials[1], clientSecret);
            if (token) {
                httpResponse.success(res, { token }); // successfully logged in
                return;
            }
            httpResponse.forbidden(res); // 403
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    public async signup(req: Request, res: Response, next: NextFunction) {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const newUser: any = await user.singup(req.body);
            if (newUser) {
                httpResponse.success(res, newUser);
                return;
            }
            httpResponse.badRequest(res, { msg: "username already exists" });
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

}

export default UserController;
