import Log from "../../lib/logger";
import { registerUser } from "../../model/user";
import * as types from "../../types";
import crypto from "../../util/crypto";
import * as helper from "../../util/helper";
import Entity from "../index";

const UserSchema = {
    firstName: { required: true, protected: false },
    hash: { required: true, protected: true },
    lastName: { required: true, protected: false },
    salt: { required: true, protected: true },
    userId: { required: true, protected: false, primary: true },
    username: { required: true, protected: false }
};

class User extends Entity {
    constructor(conn: types.Database) {
        super(conn, "user", UserSchema);
    }
    public async register(user: types.User) {
        const { password } = user;
        user.salt = crypto.randomBytes();
        user.hash = crypto.md5(password, user.salt);
        const result = await this.save(user);
        return result;
    }
    public async delete(userId: number) {
        const result = await this.connection.query("DELETE FROM user where userId = ?", [userId]);
        return result;
    }
}

export default User;
