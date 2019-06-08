import * as types from "../../types";
import Response from "./response";

class Http {
    public Response: types.Response;
    constructor() {
        this.Response = new Response();
    }
}

export default new Http();
