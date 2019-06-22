import * as types from "../../types";
import BaseEntity from "../base";

class UserClient extends BaseEntity {

    constructor(conn: types.Database) {
        const configuration: any = {
            fk: "user_id",
            name: "user_client",
            pk: "client_id",
        };
        super(conn, configuration);
    }

}

export default UserClient;
