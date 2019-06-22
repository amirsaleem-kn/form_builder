import * as types from "../../types";
import * as helper from "../../util/helper";

class BaseEntity {

    protected connection: types.Database = null;
    protected config: any = null;
    private entitityReference: any = null;

    constructor(conn: types.Database, entityConfiguration: any) {
        this.connection = conn;
        this.config = entityConfiguration;
    }

    public includes(...entities: any) {
        this.entitityReference = entities;
        return this;
    }

    public async find(params: any, projection?: any): Promise<any[]> {
        const { data, constraints } = helper.prepareStmtFromObject(params);
        let columns: string[] = ["*"];
        if (projection) {
            columns = Object.keys(projection).map((item) => {
                if (projection[item]) {
                    if (item === this.config.pk) {
                        item = `${this.config.name}.${item}`;
                    }
                    return item;
                }
            });
        }
        let joins: string[];
        let query: string = `SELECT ${columns.join(", ")} from ${this.config.name} where ${constraints.join(" and ")}`;
        if (this.entitityReference) {
            joins = this.entitityReference.map((item: any) => {
                return ` INNER JOIN ${item.config.name} ON ${item.config.name}.${item.config.fk} = ${this.config.name}.${this.config.pk}`;
            });
            query = `SELECT ${columns.join(", ")} from ${this.config.name} ${joins.join("  ")} where ${constraints.join(" and ")}`;
        }
        const result = await this.connection.query(query, data);
        this.entitityReference = null;
        return result;
    }

}

export default BaseEntity;
