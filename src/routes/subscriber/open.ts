import express from "express";
import Routes from "../../routes";
import openRoutes from "../../routes/open";

class OpenSubscriber extends Routes {
    public subscribe(app: express.Application) {
        openRoutes.subscribe("/", this.router);
        app.use(this.router);
    }
}

export default new OpenSubscriber();
