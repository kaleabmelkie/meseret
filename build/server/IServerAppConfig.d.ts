/// <reference types="mongoose" />
/// <reference types="node" />
/// <reference types="koa-router" />
/// <reference types="socket.io" />
/// <reference types="koa" />
import * as https from 'https';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as mongoose from 'mongoose';
import * as SocketIO from 'socket.io';
export interface IServerAppConfig {
    name: string;
    models?: mongoose.Model<mongoose.Document>[];
    mongoUris?: string;
    httpServers?: {
        hostname?: string;
        port: number;
        /**
         * @deprecated Use <code>hostname<code> instead. This will be removed in version 2.
         */
        path?: string;
    }[];
    httpsServers?: {
        opts: https.ServerOptions;
        hostname?: string;
        port: number;
        /**
         * @deprecated Use <code>hostname<code> instead. This will be removed in version 2.
         */
        path?: string;
    }[];
    publicDirs?: string[];
    routers?: KoaRouter[];
    sockets?: SocketIO.Server[];
    spaFileRelativePath?: string;
    bodyParser?: boolean;
    bodyParserEnableForm?: boolean;
    bodyParserEnableJson?: boolean;
    bodyParserEnableText?: boolean;
    bodyParserEncoding?: string;
    bodyParserFormLimit?: string;
    bodyParserJsonLimit?: string;
    bodyParserMultipart?: boolean;
    bodyParserTextLimit?: string;
    cacheControl?: string;
    compress?: boolean;
    keys?: string[];
    json?: boolean;
    jsonPretty?: boolean;
    jsonPrettyParam?: string;
    jsonSpaces?: number;
    log?: boolean;
    session?: boolean;
    sessionCookieKey?: string;
    sessionHttpOnly?: boolean;
    sessionMaxAge?: number | 'session';
    sessionOverwrite?: boolean;
    sessionRenew?: boolean;
    sessionRolling?: boolean;
    sessionSigned?: boolean;
    middleware?: Koa.Middleware[];
}
