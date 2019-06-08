import express from "express";
import * as types from "../../types";

class Response implements types.Response {
    public success(res: express.Response, data: any): void {
        res.status(200).json({
            data,
            status: "success",
        });
    }
    public created(res: express.Response, data: any): void {
        res.status(201).json({
            data,
            status: "success"
        });
    }
    public conflict(res: express.Response, data: any): void {
        res.status(409).json({
            data,
            status: "success"
        });
    }
    public notFound(res: express.Response): void {
        res.status(404).json({
            error: "not found"
        });
    }
    public badRequest(res: express.Response, error: any): void {
        res.status(400).json({
            error
        });
    }
    public serviceError(res: express.Response): void {
        res.status(503).json({
            error: { message: "some error occurred" }
        });
    }
    public unauthorised(res: express.Response): void {
        res.status(401).json({
            error: "expired token"
        });
    }
    public forbidden(res: express.Response): void {
        res.status(403).json({
            error: "forbidden"
        });
    }
}

export default Response;
