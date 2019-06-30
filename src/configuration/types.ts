import * as MongoDbTypes from "../lib/database/types";

export interface Configuration {
    app: Application;
    bodyParser: BodyParser;
    crypto: Crypto;
    jwt: JWT;
    mongoDBConf: MongoDBConf;
}

interface MongoDBConf {
    connectionUrl: MongoDbTypes.MongoDbUrl;
    connectionOptions: MongoDbTypes.MongoConnectOptions;
}

/* @internal */
interface Application {
    authenticate: boolean;
    port: string;
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
