/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Amir Saleem. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { NextFunction, Request, Response } from "express";
import HttpResponse from "../../lib/http/response";
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
       const response = new HttpResponse(res);
       response.status = 422;
       response.error([ { msg: "some text" } ]);
    }

}

export default UserController;
