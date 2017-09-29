/// <reference types="mongoose" />
/// <reference types="koa" />
/// <reference types="koa-bodyparser" />
/// <reference types="koa-router" />
/// <reference types="node" />
import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as net from 'net';
import { ServerAppConfig } from './ServerAppConfig';
export declare class ServerApp {
    readonly config: ServerAppConfig;
    private _dbConn;
    private _app;
    private _servers;
    readonly dbConn: mongoose.Connection;
    readonly app: Koa;
    readonly servers: net.Server[];
    constructor(config: ServerAppConfig);
    start(): Promise<void>;
}
