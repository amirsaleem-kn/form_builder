import express from "express";
import Routes from "../../routes";
import privateRoutes from "../../routes/private";

class PublicSubscriber extends Routes {
    public subscribe(app: express.Application) {
        privateRoutes.subscribe("/api/private", this.router);
        app.use(this.router);
    }
}

export default new PublicSubscriber();
