/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Amir Saleem. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NextFunction, Request, Response } from "express";
import HttpResponse from "../../lib/http/response";
import log from "../../lib/logger";
import { User } from "../../model";
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
        try {
            const result = await User.findOne(req.query, { firstName: 1 });
            const response = new HttpResponse(res);
            response.status = 422;
            log.debug(result);
            response.send(result);
        } catch (err) {
            next(err);
        }
    }

}

export default UserController;
