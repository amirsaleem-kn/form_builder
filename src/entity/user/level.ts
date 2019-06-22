import * as types from "../../types";
import BaseEntity from "../base";

class UserLevel extends BaseEntity {

    constructor(conn: types.Database) {
        const configuration: any = {
            fk: "user_id",
            name: "user_level",
            pk: "level_id",
        };
        super(conn, configuration);
    }

}

export default UserLevel;
