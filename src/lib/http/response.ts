/**
 * @fileoverview implementation of Response
 * @public
 */

import express from "express";
import * as types from "../../types";

/**
 * Class to handle API Response
 * @implements console.log
 */

class Response implements types.Response {

    private api = {
        status: "OK",
        version: "1.1.0"
    };

    /**
     * To send 200 "OK" response
     * @public
     * @param {express.Response} res express response object
     * @param {any} data response data
     */

    public success(res: express.Response, data: any): void {
        res.status(200).json({
            api: this.api,
            data,
            status: "success",
        });
    }

    /**
     * To send 201 "CREATED" response
     * @public
     * @param {express.Response} res express response object
     * @param {any} data response data
     */

    public created(res: express.Response, data: any): void {
        res.status(201).json({
            api: this.api,
            data,
            status: "success"
        });
    }

    /**
     * To send 409 "CONFLICT" response
     * @public
     * @param {express.Response} res express response object
     * @param {any} data response data
     */

    public conflict(res: express.Response, data: any): void {
        res.status(409).json({
            api: this.api,
            data,
            status: "success"
        });
    }

    /**
     * To send 404 "NOT FOUND" response
     * @public
     * @param {express.Response} res express response object
     */

    public notFound(res: express.Response): void {
        res.status(404).json({
            api: this.api,
            error: "not found"
        });
    }

    /**
     * To send 400 "BAD REQUEST" response
     * @public
     * @param {express.Response} res express response object
     * @param {any} error data to be sent with response
     */

    public badRequest(res: express.Response, error: any): void {
        res.status(400).json({
            api: this.api,
            error
        });
    }

    /**
     * To send 503 "INTERNAL SERVER ERROR" response
     * @public
     * @param {express.Response} res express response object
     */

    public serviceError(res: express.Response): void {
        res.status(503).json({
            api: this.api,
            error: { message: "some error occurred" }
        });
    }

    /**
     * To send 401 "UNAUTHORIZED" response
     * @public
     * @param {express.Response} res express response object
     */

    public unauthorised(res: express.Response): void {
        res.status(401).json({
            api: this.api,
            error: "expired token"
        });
    }

    /**
     * To send 403 "FORBIDDENT" response
     * @public
     * @param {express.Response} res express response object
     */

    public forbidden(res: express.Response): void {
        res.status(403).json({
            api: this.api,
            error: "forbidden"
        });
    }
}

export default Response;
