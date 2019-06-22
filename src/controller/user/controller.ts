/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Amir Saleem. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NextFunction, Request, Response } from "express";
import UserEntity from "../../entity/user/user";
import Database from "../../lib/database/database";
import Http from "../../lib/http/http";
import * as types from "../../types";
import BaseController from "../base";

/**
 * @author Amir Saleem
 */

class UserController extends BaseController implements types.ControllerConstraints<UserController> {

    constructor() {
        super();
    }

    public async find(req: Request, res: Response, next: NextFunction) {
        const db: Database = new Database();
        try {
            const conn: Database = await db.getConn();
            const user = new UserEntity(conn);
            const { username, first_name, level_id } = req.query;
            const searchParams = { username: { $like: username }, first_name, level_id };
            const columns = { first_name: 1 , user_id: 1 };
            const result = await user.includes(user.level, user.clients).find(searchParams, columns);
            Http.Response.success(res, result);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }

}

export default UserController;
