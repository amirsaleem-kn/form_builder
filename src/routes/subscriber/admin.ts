import express from "express";
import Routes from "..";
import adminRoutes from "../admin";

class PublicSubscriber extends Routes {
    public subscribe(app: express.Application) {
        adminRoutes.subscribe("/api/admin", this.router);
        app.use(this.router);
    }
}

export default new PublicSubscriber();
