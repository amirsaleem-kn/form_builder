/**
 * All the project settings comes from here
 */

import keys from "../protected";
import * as types from "../types";

const PORT: number = process.env.PORT || keys.PORT || 8080;

const configuration: types.Configuration = {
    app: {
        authenticate: true,
        port: PORT,
        startupMessage: `SERVER LISTENING TO PORT: ${PORT}`,
    },
    bodyParser: {
        json: {
            limit: "50mb"
        },
        urlencoded: {
            extended: true,
            limit: "50mb",
            parameterLimit: 10000
        }
    },
    crypto: {
        algorithm: "aes-256-ctr"
    },
    database: {
        connectTimeout: 120000,
        connectionLimit: 20,
        database: "form_builder",
        debug: false,
        host: "localhost",
        multipleStatements: true,
        password: "amirsaleem96",
        timeout: 600000,
        user: "root",
    },
};

export default configuration;
