import express from "express";
import adminSubscriber from "./admin";
import Subscriber from "./index";
import optionsSubscriber from "./options";
import privateSubscriber from "./private";
import publicSubscriber from "./public";

/**
 * Subscriber class to subscribe for
 * application routes at open, public, and
 * private levels
 */

class MainSubscriber extends Subscriber {
    public subscribe(app: express.Application) {
        optionsSubscriber.subscribe(app);
        publicSubscriber.subscribe(app);
        privateSubscriber.subscribe(app);
        adminSubscriber.subscribe(app);
    }
}

export default new MainSubscriber();
