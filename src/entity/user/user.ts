import * as types from "../../types";
import BaseEntity from "../base";
import UserClient from "./client";
import UserLevel from "./level";

interface IUserEntity {
    clients?: UserClient;
    level?: UserLevel;
}

class UserEntity extends BaseEntity {

    public clients: UserClient;
    public level: UserLevel;

    constructor(conn: types.Database) {
        const configuration: any = {
            name: "user",
            pk: "user_id",
        };
        super(conn, configuration);
        this.clients = new UserClient(conn);
        this.level = new UserLevel(conn);
    }

}

export default UserEntity;
