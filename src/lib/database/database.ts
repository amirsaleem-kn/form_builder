import mysql, { MysqlError, Pool, PoolConnection, Query, queryCallback } from "mysql";
import config from "../../configuration";
import * as types from "../../types";
import * as util from "../../util/helper";
import Log from "../Logger";

const pool: Pool = mysql.createPool(config.database);

class Database implements types.Database {

    private connection: PoolConnection = null;
    private inTransaction: boolean = false;

    public async getConn(): Promise<Database> {
        return new Promise((resolve, reject) => {
            pool.getConnection((err: MysqlError, conn: PoolConnection) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.connection = conn;
                resolve(this);
            });
        });
    }

    public close(): void {
        if (this.connection) {
            this.connection.release();
            this.connection = null;
        }
    }

    public async query(query: string, queryArray: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.connection) {
                this.connection.query(query, queryArray, function(err: MysqlError, result: any) {
                    Log.print(this.sql);
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } else {
                reject("Connection does not exists");
            }
        });
    }

    public async beginTransaction(): Promise<undefined | null> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject("Connection does not exists");
                return;
            }
            this.connection.beginTransaction((err: MysqlError) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.inTransaction = true;
                resolve();
            });
        });
    }

    public commitTransaction(): Promise<null | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.connection || !this.inTransaction) {
                reject("Connection does not exists or not in transaction");
                return;
            }
            this.connection.commit((err: MysqlError) => {
                if (err) {
                    this.rollbackTransaction().then(() => {
                        reject(err);
                    }).catch(() => {
                        reject(err);
                    });
                    return;
                }
                this.inTransaction = false;
                resolve();
            });
        });
    }

    public rollbackTransaction(): Promise<null | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.connection || !this.inTransaction) {
                reject("Connection does not exists or not in transaction");
                return;
            }
            this.connection.rollback((err: MysqlError) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.inTransaction = false;
                resolve();
            });
        });
    }

    public isDatabase(instance: any) {
        return this === instance;
    }

    public async insertInto(tableName: string, values: any[]|object) {
        const [ columns, vars ] = util.getQueryVariables(values);
        const escaped: string[] = columns.map(() => "?");
        let query: string = `INSERT INTO ${tableName} (${columns})`;
        if (Array.isArray(values)) {
            query += ` VALUES ?`;
        } else {
            query += ` VALUES (${escaped.join(",")})`;
        }
        const result: any = await this.query(query, vars);
        return result;
    }

}

export default Database;
