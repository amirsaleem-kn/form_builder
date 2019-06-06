import { Response } from "express";
import * as types from "../../types";

class HttpResponse implements types.HttpResponse {
    public success(res: Response, data: any): void {
        res.status(200).json({
            data,
            status: "success",
        });
    }
    public created(res: Response, data: any): void {
        res.status(201).json({
            data,
            status: "success"
        });
    }
    public conflict(res: Response, data: any): void {
        res.status(409).json({
            data,
            status: "success"
        });
    }
    public notFound(res: Response): void {
        res.status(404).json({
            error: "not found"
        });
    }
    public badRequest(res: Response, error: any): void {
        res.status(400).json({
            error
        });
    }
    public serviceError(res: Response): void {
        res.status(503).json({
            error: { message: "some error occurred" }
        });
    }
    public unauthorised(res: Response): void {
        res.status(401).json({
            error: "expired token"
        });
    }
    public forbidden(res: Response): void {
        res.status(403).json({
            error: "forbidden"
        });
    }
}

export default new HttpResponse();
