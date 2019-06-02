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
        res.status(204).json({
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
            error: "some error occurred"
        });
    }
}

export default new HttpResponse();
