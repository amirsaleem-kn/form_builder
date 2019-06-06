import { Response } from "express";

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

export interface HttpResponse {
    success: (res: Response, data: any) => void;
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