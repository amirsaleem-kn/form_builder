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

export declare type MongoDbUrl = string;
