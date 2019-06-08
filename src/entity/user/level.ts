import * as types from "../../types";
import BaseEntity from "../base";

class UserLevel extends BaseEntity {

    constructor(conn: types.Database) {
        super(conn, "userLevel");
    }

    public async create(userId: number, levelId: number): Promise<any> {
        const levelQuery: string = `INSERT INTO userLevel(userId, levelId) VALUES(?, ?)`;
        const result = await this.connection.query(levelQuery, [userId, levelId]);
        return result;
    }

}

export default UserLevel;
