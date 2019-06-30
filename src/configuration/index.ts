import * as util from "../util";
import dev_config from "./dev";
import prod_config from "./prod";
import * as types from "./types";

let config: types.Configuration = null;

if (util.env.environment === "production") {
    config = prod_config;
} else {
    config = dev_config;
}

export default config;
