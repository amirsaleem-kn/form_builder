import mongoose from "mongoose";

/**
 * @fileoverview Type declarations for MongoDB database class
 */

/** declaration for mongodb connection options types */

export interface MongoConnectOptions {
    autoIndex?: boolean; // default:true
    bufferCommands?: boolean; // default:true
    dbName?: string;
    pass?: string;
    useFindAndModify?: boolean; // default:true
    useCreateIndex?: boolean; // default:true
    useNewUrlParser?: boolean; // default:false
    user?: string;
}

/** declaration for MongoDb connection url type  */

export declare type MongoDbUrl = string;

/** declaration for Database class interface  */

export interface Database {
    mongoose: typeof mongoose;
    connect: () => Promise<void>;
    // new (mongoDbUrl: MongoDbUrl, options: MongoConnectOptions);
}
