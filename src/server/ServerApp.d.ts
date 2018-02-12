/// <reference types="mongoose" />
/// <reference types="koa" />
/// <reference types="koa-bodyparser" />
/// <reference types="koa-session" />
/// <reference types="koa-router" />
/// <reference types="node" />
import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as net from 'net';
import { IServerAppConfig } from './IServerAppConfig';
export declare class ServerApp {
    readonly config: IServerAppConfig;
    private _dbConn?;
    private _app;
    private _servers;
    constructor(config: IServerAppConfig);
    readonly name: string;
    readonly dbConn: mongoose.Connection | undefined;
    readonly app: Koa;
    readonly servers: net.Server[];
    start(): Promise<void>;
}
