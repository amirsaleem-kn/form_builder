import { Response } from "express";

export interface HttpResponse {
    res: Response;
    raw: () => void;
    send: (data: any) => void;
    error: (error: any) => void;
}

export interface ResponseErrors {
    msg: string;
}
