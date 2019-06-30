/**
 * @fileoveriew this file exposes Database class to interact with mongoDb
 */

/** -- package imports  */
import bluebird from "bluebird";
import mongoose from "mongoose";

/** -- local imports  */
import * as types from "./types";

/**
 * @public
 * @description Database class to interact with MongoDb
 */

class Database implements types.Database {
    /** @public mongoose instance  */
    public mongoose = mongoose;

    /** @private mongo db connection url */
    private _mongoDbUrl: types.MongoDbUrl = null;

    /** @private mongo db connection options  */
    private _options: types.MongoConnectOptions = null;

    constructor(mongoDbUrl: types.MongoDbUrl, options?: types.MongoConnectOptions) {
        this._mongoDbUrl = mongoDbUrl;
        this._options = options;
        this.mongoose.Promise = bluebird;
    }

    /**
     * @public
     * @description to establish a connection with mongoDb database server
     * @return void
     */

    public async connect(): Promise<void> {
        await this.mongoose.connect(this._mongoDbUrl, this._options);
    }
}

export default Database;
