import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import config from "../../configuration";
import Log from "../../lib/Logger";
import * as types from "../../types";

const PRIVATE_KEY = fs.readFileSync(path.resolve("./src/protected/private.key"), "utf-8");
const PUBLIC_KEY = fs.readFileSync(path.resolve("./src/protected/public.key"), "utf-8");

class JWT {

    public sign(payload: any, options: types.JWTSignOptions) {
        const signOptions = {
            algorithm: config.jwt.algorithm,
            audience: options.audience,
            expiresIn: config.jwt.expiry,
            issuer: options.issuer,
            subject: options.subject,
        };
        return jwt.sign(payload, PRIVATE_KEY, signOptions);
    }

    public verify(token: string, options: types.JWTSignOptions) {
        const verifyOptions = {
            algorithm: config.jwt.algorithm,
            audience: options.audience,
            expiresIn: config.jwt.expiry,
            issuer: options.issuer,
            subject: options.subject,
        };
        try {
            return jwt.verify(token, PUBLIC_KEY, verifyOptions);
        } catch (err) {
            Log.print(err);
            return false;
        }
    }

    public decode(token: string) {
        return jwt.decode(token, {complete: true});
    }

}

export default new JWT();
