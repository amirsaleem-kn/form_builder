import { NextFunction, Request, Response } from "express";

export interface Response {
    success: (res: Response, data: any) => void;
    badRequest: (res: Response, data: any) => void;
    conflict: (res: Response, data: any) => void;
    created: (res: Response, data: any) => void;
    unauthorised: (res: Response) => void;
    forbidden: (res: Response) => void;
    notFound: (res: Response) => void;
    serviceError: (res: Response) => void;
}

export interface JWTSignOptions {
    issuer: string;
    subject: string;
    audience: string;
}

type ParamsLength<F extends (...args: any) => any> = Parameters<F>["length"];

type AcceptableMethod = (req: Request, res: Response, next: NextFunction) => Promise<void>;

type Invalid<T> = T & Error;

export type ControllerConstraints<T> = { [K in keyof T]:
    T[K] extends (...args: any) => any ? (
        ParamsLength<T[K]> extends ParamsLength<AcceptableMethod> ? AcceptableMethod :
        T[K] extends AcceptableMethod ? Invalid <
            ["Expected", ParamsLength<AcceptableMethod>, "parameters, got", ParamsLength<T[K]>]
        > : AcceptableMethod
    ) : T[K]
};
