import { NextFunction, Request, Response } from "express";
import User from "../../entity/user/user";
import Database from "../../lib/database/database";
import Http from "../../lib/http/http";
import * as types from "../../types";
import * as util from "../../util/helper";
import BaseController from "../base";

/**
 * @author Amir Saleem
 */

class UserController extends BaseController implements types.ControllerConstraints<UserController> {

    constructor() {
        super();
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    /**
     * @author Amir Saleem
     * @param req
     * @param res
     * @param next
     */

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const clientSecret = req.get("clientSecret");
            let credentials: any = req.get("Authorization");
            if (!clientSecret || !credentials) {
                Http.Response.forbidden(res); // 403
                return;
            }
            credentials = util.base64_decode(credentials.slice(6, credentials.length));
            credentials = credentials.split(":");
            const token = await user.login(credentials[0], credentials[1], clientSecret);
            if (token) {
                Http.Response.success(res, { token }); // successfully Logged in
                return;
            }
            Http.Response.forbidden(res); // 403
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

    /**
     * @author Amir Saleem
     * @param req
     * @param res
     * @param next
     */

    public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            const user: User = new User(conn);
            const newUser: any = await user.singup(req.body);
            if (newUser) {
                Http.Response.success(res, newUser);
                return;
            }
            Http.Response.badRequest(res, { msg: "username already exists" });
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

}

export default UserController;
