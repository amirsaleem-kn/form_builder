import Log from "../lib/logger";
import * as types from "../types";
import * as helper from "../util/helper";

class Entity {

    protected connection: types.Database = null;
    protected entityName: string = null;

    constructor(conn: types.Database, entity: string) {
        this.connection = conn;
        this.entityName = entity;
    }

    public async find(params: any, projection?: any) {
        const { data, constraints } = helper.prepareStmtFromObject(params);
        let columns: string[] = ["*"];
        if (projection) {
            columns = Object.keys(projection).map((item) => {
                if (projection[item]) {
                    return item;
                }
            });
        }
        const query: string = `SELECT ${columns.join(",")} from ${this.entityName} where ${constraints.join(" and ")}`;
        const result = await this.connection.query(query, data);
        return result;
    }

}

export default Entity;
