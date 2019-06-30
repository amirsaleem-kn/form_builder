/**
 * All the project settings comes from here
 */

import fs from "fs";
import path from "path";
import keys from "../protected";
import * as types from "./types";

const PRIVATE_KEY = fs.readFileSync(path.resolve("./src/protected/private.key"), "utf-8");
const PUBLIC_KEY = fs.readFileSync(path.resolve("./src/protected/public.key"), "utf-8");

const PORT: string = process.env.PORT || keys.PORT || 8080;

const configuration: types.Configuration = {
    app: {
        authenticate: true,
        key: PRIVATE_KEY,
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
    jwt: {
        algorithm: "RS256",
        expiry: "2m",
        issuer: "my_organisation_name"
    },
    mongoDBConf: {
        connectionOptions: { useNewUrlParser: true },
        connectionUrl: "mongodb://localhost/test",
    }
};

export default configuration;
