/**
 * @fileoveriew Development configuration for the application
 */

/** -- package imports  */

import fs from "fs";
import path from "path";

/** -- local imports  */

import keys from "../protected";
import * as types from "./types";

const PRIVATE_KEY = fs.readFileSync(path.resolve("./src/protected/private.key"), "utf-8");
// const PUBLIC_KEY = fs.readFileSync(path.resolve("./src/protected/public.key"), "utf-8");

/** application port number
 * try to get from environment variable, if not found
 * try to get from keys directory (this allows different developers to user
 * different ports as keys are not pushed in version control system)
 * if port is not found in keys, set it to 8080
 */
const PORT: string = process.env.PORT || keys.PORT || 8080;

const configuration: types.Configuration = {
    /** express application configuration  */
    app: {
        /** boolean to decide weather to enable authentication on API requests or not  */
        authenticate: true,
        key: PRIVATE_KEY,
        /** application port number  */
        port: PORT,
        /** message to be displayed on terminal at startup  */
        startupMessage: `SERVER LISTENING TO PORT: ${PORT}`,
    },
    /** body parser settings  */
    bodyParser: {
        json: {
            /** 50mb limit for JSON payloads  */
            limit: "50mb"
        },
        urlencoded: {
            extended: true,
            limit: "50mb",
            parameterLimit: 10000
        }
    },
    /** cryptography configuration  */
    crypto: {
        /** cryptography algorithm  */
        algorithm: "aes-256-ctr"
    },
    /** jwt configuration  */
    jwt: {
        /** encryption algorithm  */
        algorithm: "RS256",
        /** token expiry  */
        expiry: "2m",
        /** issuer name  */
        issuer: "my_organisation_name"
    },
    /** mongoDb configuration  */
    mongoDBConf: {
        /** connection options */
        connectionOptions: { useNewUrlParser: true, dbName: "test" },
        connectionUrl: "mongodb://localhost/test",
    }
};

export default configuration;
