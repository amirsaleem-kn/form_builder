/**
 * @fileoverview implementation of Response Class
 * @public
 */

import { Response } from "express";
import * as types from "./types";

/**
 * Class to handle API Response
 */

class HttpResponse implements types.HttpResponse {

    /** @public  Express Response Object */
    public res: Response = null;

    /** @private flag to decide weather response type js JSON or not  */
    private json: boolean = true;

    /** @private Http Response Status Code  */
    private _status: number = 200;

    private respObj: any = {
        health: "OK",
        version: "1.0.0"
    };

    /**
     * @param {express.Response} response
     */

    constructor(response: Response) {
        this.res = response;
    }

    /**
     * To disable json response content type
     * @public
     * @return {instance} instanceof HttpResponse
     */

    public raw() {
        this.json = false;
        return this;
    }

    /**
     * Setter to set the http status code
     * @param {number} status Http Status Code
     * @public
     */

    public set status(status: number) {
        this._status = status;
    }

    /**
     * Getter to get the http status code
     */

    public get status(): number {
        return this._status;
    }

    /**
     * to send the http success response to the client
     * @param {any} data data to be sent to the client
     */

    public send(data?: any) {
        if (!this.json) {
            this.res.status(this._status).send(data);
            return;
        }
        this.respObj.data = data;
        this.res.status(this._status).json(this.respObj);
    }

    /**
     * to send http error response to the client
     * @param {types.ResponseErrors[]} error an array containing errors to be sent to the client
     */

    public error(error: types.ResponseErrors[]) {
        if (!this.json) {
            this.res.status(this._status).send(error);
        }
        this.respObj.errors = error;
        this.res.status(this._status).json(this.respObj);
    }

}

export default HttpResponse;
