import * as util from "../util";
import dev_config from "./dev";
import prod_config from "./prod";
let config: any = null;

if (util.env.environment === "production") {
    config = prod_config;
} else {
    config = dev_config;
}

export default config;
