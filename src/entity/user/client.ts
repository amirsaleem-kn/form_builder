import * as types from "../../types";
import BaseEntity from "../base";

class UserClient extends BaseEntity {

    constructor(conn: types.Database) {
        super(conn, "userClient");
    }

    public async create(userId: number, clientId: number): Promise<any> {
        const clientQuery: string = `INSERT INTO userClient(userId, clientId) VALUES(?, ?)`;
        const result = await this.connection.query(clientQuery, [userId, clientId]);
        return result;
    }

}

export default UserClient;
