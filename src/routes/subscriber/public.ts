import express from "express";
import Routes from "../../routes";
import publicRoutes from "../../routes/public";

class PrivateSubscriber extends Routes {
    public subscribe(app: express.Application) {
        publicRoutes.subscribe("/api/public", this.router);
        app.use(this.router);
    }
}

export default new PrivateSubscriber();
