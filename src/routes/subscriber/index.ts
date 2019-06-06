import express from "express";
import openSubscriber from "./open";
import optionsSubscriber from "./options";
import privateSubscriber from "./private";
import protectedSubscriber from "./protected";
import publicSubscriber from "./public";

/**
 * Subscriber class to subscribe for
 * application routes at open, public, and
 * private levels
 */

class Subscriber {
    public subscribe(app: express.Application) {
        optionsSubscriber.subscribe(app);
        publicSubscriber.subscribe(app);
        privateSubscriber.subscribe(app);
        openSubscriber.subscribe(app);
        protectedSubscriber.subscribe(app);
    }
}

export default new Subscriber();
