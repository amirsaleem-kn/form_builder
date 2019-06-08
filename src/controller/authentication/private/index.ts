import { NextFunction, Request, Response } from "express";
import config from "../../../configuration";
import { Database } from "../../../lib/database";
import Http from "../../../lib/http/http";
import jwt from "../../../lib/jwt";
import Log from "../../../lib/Logger";
import * as types from "../../../types";

/**
 * Authentication Middleware for private routes
 * Private routes are routes that have access to applications
 * core funcionality. Users registered as administrators have
 * access to private routes, all application clients and super
 * priviledges. There can only be atmost two administrators
 */

class PrivateAuthentication {
    public async authenticate(req: Request, res: Response, next: NextFunction) {
        Log.print("--- PRIVATE AUTHENTICATION ---");
        // as we do not want to authenticate OPTIONS request
        if (req.method === "OPTIONS") {
            return next();
        }
        let tokenId: string = req.get("Authorization"); // get token from Authorization header
        const username: string = req.get("username");
        const clientSecret: string = req.get("clientSecret");
        if (!tokenId) {
            Http.Response.notFound(res);
            return;
        }
        const db: types.Database = new Database();
        try {
            const conn: types.Database = await db.getConn();
            tokenId = tokenId.slice(7, tokenId.length); // strip the token string to remove Bearer from it
            const jwts: any = await conn.query("SELECT token, userId FROM userToken WHERE tokenId = ? and valid = ?", [tokenId, 1]);
            if (jwts.length === 0) {
                Http.Response.unauthorised(res);
                return;
            }
            const clientJWT = jwts[0].token;
            const verify = jwt.verify(clientJWT, { issuer: config.jwt.issuer, audience: clientSecret, subject: username }); // verfy the jwt
            if (verify) {
                const payload: any = jwt.decode(clientJWT);
                const clientQuery: string = `select c.clientId from client c inner join userClient uc on c.clientId = uc.clientId where c.secret = ? and uc.userId = ?`;
                const userId: number = payload.payload.userId;
                const clientResult: any = await conn.query(clientQuery, [clientSecret, userId]);
                // if user is not admin, or clientSecret is incorrect send 403
                if (+payload.payload.levelId !== 1 || clientResult.length === 0) {
                    Http.Response.forbidden(res);
                    return;
                }
                return next(); // authentication is successful
            }
            Http.Response.unauthorised(res);
        } catch (e) {
            next(e);
        } finally {
            db.close();
        }
    }
}

export default new PrivateAuthentication();
