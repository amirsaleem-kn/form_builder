import Log from "../lib/logger";
import * as types from "../types";
import * as helper from "../util/helper";

class Entity {

    protected connection: types.Database = null;
    protected entityName: string = null;
    protected entitySchema: any = null;

    constructor(conn: types.Database, entity: string, schema: any) {
        this.connection = conn;
        this.entityName = entity;
        this.entitySchema = schema;
    }

    public async find(params: any) {
        const { data, constraints } = helper.prepareStmtFromObject(params);
        const columns = Object.keys(this.entitySchema).filter((item: any) => this.entitySchema[item].protected === false);
        const query: string = `SELECT ${columns.join(",")} FROM ${this.entityName} where ${constraints.join(" and ")}`;
        const result = await this.connection.query(query, data);
        return result;
    }

    public async list() {
        const columns = Object.keys(this.entitySchema).filter((item: any) => this.entitySchema[item].protected === false);
        const result: any = await this.connection.query(`SELECT ${columns.join(",")} FROM ${this.entityName}`, []);
        return result;
    }

    protected async save(params: any) {
        this._verifyBeforeSave(params);
        const columns: string[] = Object.keys(params);
        const escapedChars: string[] = columns.map(() => "?");
        const values: any[] = Object.keys(params).map((item) =>  params[item]);
        const query: string = `INSERT INTO ${this.entityName} (${columns.join(",")}) VALUES(${escapedChars.join(",")})`;
        const result = await this.connection.query(query, values);
        return result;
    }

    private _verifyBeforeSave(params: any) {
        Object.keys(this.entitySchema).forEach((item) => {
            if (this.entitySchema[item].required) {
                if (!params[item]) {
                    throw new Error(`${item} is required`);
                }
            }
        });
    }

}

export default Entity;