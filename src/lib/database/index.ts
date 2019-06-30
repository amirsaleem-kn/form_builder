/**
 * @fileoverview exposes MongoDb connection instance to the rest of the application
 */

/** -- local imports --  */

import config from "../../configuration";
import Database from "./database";

/** mongodb configuration  */

const { connectionUrl, connectionOptions } = config.mongoDBConf;

/** make mongodb accessible to the rest of the application  */

export default new Database(connectionUrl, connectionOptions);
