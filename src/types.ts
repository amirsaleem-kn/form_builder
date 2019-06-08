import { NextFunction, Request, Response } from "express";

export interface Configuration {
    app: Application;
    bodyParser: BodyParser;
    crypto: Crypto;
    database: MySQLDatabase;
    jwt: JWT;
}

export interface MySQLDatabase {
    connectTimeout: number;
    connectionLimit: number;
    database: string;
    debug: boolean;
    host: string;
    multipleStatements: boolean;
    password: string;
    timeout: number;
    user: string;
}

/* @internal */
interface Application {
    authenticate: boolean;
    port: number;
    startupMessage: string;
    key: string;
}

/* @internal */
interface BodyParser {
    json: BodyParserJSON;
    urlencoded: BodyParserUrlEncoded;
}

/* @internal */
interface Crypto {
    algorithm: string;
}

/* @internal */
interface BodyParserJSON {
    limit: string;
}

/* @internal */
interface BodyParserUrlEncoded {
    extended: boolean;
    limit: string;
    parameterLimit: number;
}

/* @internal */
interface JWT {
    algorithm: string;
    expiry: string;
    issuer: string;
}

export interface Database {
    getConn: () => Promise<Database>;
    close: () => void;
    query: (query: string, queryArray: any[]) => Promise<any>;
    beginTransaction: () => Promise<null | undefined>;
    commitTransaction: () => Promise<null | undefined>;
    rollbackTransaction: () => Promise<null | undefined>;
    insertInto: (tableName: string, values: any) => Promise<any>;
    isDatabase: (instance: any) => boolean;
}

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

export interface User {
    userId: number;
    levelId: number;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
    salt: string;
    hash: string;
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
