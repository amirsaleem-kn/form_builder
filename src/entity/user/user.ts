import config from "../../configuration";
import jwt from "../../lib/jwt";
import * as types from "../../types";
import crypto from "../../util/crypto";
import BaseEntity from "../base";
import UserClient from "./client";
import UserLevel from "./level";

class User extends BaseEntity {

    public client: UserClient;
    public level: UserLevel;

    constructor(conn: types.Database, userId?: number) {
        super(conn, "user");
        this.client = new UserClient(conn);
        this.level = new UserLevel(conn);
    }

    /**
     * @author Amir Saleem
     * @param username username of the user
     * @param password password of the user
     * @param clientID identification no of client (provided by the admin)
     * @return returns token (type: string) is Login is successful otherwise false
     * @general client can use the token to make API requests until the token expires
     * @public
     */

    public async login(username: string, password: string, clientSecret: string): Promise<any> {
        const users = await this.find({ username }, { userId: 1, hash: 1, salt: 1 });
        if (users.length === 0) {
            // no user found with the username provided
            return false;
        }
        const user: types.User = users[0];
        const userId: number = user.userId;
        const level: any = await this.connection.query("SELECT levelId FROM userLevel WHERE userId = ?", [userId]);
        user.levelId = level[0].levelId;
        const payload = { ...user }; // JWT payload
        // create a md5 hash from the password
        const hash = crypto.md5(password, user.salt);
        // verify if password provided is correct
        if (hash === user.hash) {
            // create a jwt token
            const jwtToken: string = jwt.sign(payload, { issuer: config.jwt.issuer, audience: clientSecret, subject: username });
            // create a random token from randomBytes
            const token: string = crypto.randomBytes(32);
            // insert new token data into userToken table
            await this.connection.query("INSERT INTO userToken(tokenId, userId, token) VALUES(?, ?, ?)", [token, userId, jwtToken]);
            return token;
        }
        // password does not match
        return false;
    }

    /**
     * @author Amir Saleem
     * @param options
     */

    public async singup(options: any): Promise<any> {
        const { firstName, lastName, username, password, levelId, clientId } = options;
        const users: types.User[] = await this.find({ username }, { username: 1 });
        if (users.length !== 0) {
            return false;
        }
        const salt: string = crypto.randomBytes(32);
        const hash: string = crypto.md5(password, salt);
        const userQuery: string = `INSERT INTO user(firstName, lastName, username, salt, hash) VALUES(?, ?, ?, ?, ?)`;
        const user = await this.connection.query(userQuery, [firstName, lastName, username, salt, hash]);
        const userId: number = user.insertId;
        await this.level.create(userId, levelId);
        await this.client.create(userId, clientId);
        return userId;
    }

}

export default User;
