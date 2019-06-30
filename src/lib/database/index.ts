import config from "../../configuration";
import Database from "./database";

export default new Database(config.mongoDBConf.connectionUrl, config.mongoDBConf.connectionOptions);
