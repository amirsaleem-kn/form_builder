import express from "express";

/**
 * Subscriber class to subscribe for
 * application routes at open, public, and
 * private levels
 */

abstract class Subscriber {
    public abstract subscribe(app: express.Application): void;
}

export default Subscriber;
