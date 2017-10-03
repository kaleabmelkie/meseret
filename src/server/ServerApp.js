"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const Koa = require("koa");
const KoaCompress = require("koa-compress");
const KoaLogger = require("koa-logger");
const KoaBodyparser = require("koa-bodyparser");
const KoaJson = require("koa-json");
const KoaStatic = require("koa-static");
const KoaStaticCache = require("koa-static-cache");
const mongoose = require("mongoose");
class ServerApp {
    constructor(config) {
        this.config = config;
        this._servers = [];
    }
    get dbConn() {
        return this._dbConn;
    }
    get app() {
        return this._app;
    }
    get servers() {
        return this._servers;
    }
    async start() {
        /* MONGOOSE */
        try {
            // mongoose models are automatically created at the origins of this.config.model
            if (this.config.mongoUris) {
                // set mongoose's promise library
                mongoose.Promise = global.Promise;
                // connect to db
                try {
                    await mongoose.connect(this.config.mongoUris, { useMongoClient: true }).then();
                    // todo: feature request: auth (user & pass) for connecting to db
                    this._dbConn = mongoose.connection;
                    console.log(`\nDatabase connected to ${this.config.mongoUris}.`);
                }
                catch (err) {
                    err.message = `Database connection error: ${err.message}`;
                    return Promise.reject(err);
                }
            }
            else if (this.config.models) {
                return Promise.reject(new Error('No MongoDB URI to load the provided models on.'));
            }
        }
        catch (err) {
            err.message = `Mongoose setup error: ${err.message}`;
            return Promise.reject(err);
        }
        /* KOA */
        try {
            // construct koa app
            this._app = new Koa();
            // use the essential koa middleware
            this._app.use(KoaLogger());
            this._app.use(KoaCompress({ level: 9, memLevel: 9, threshold: 0 }));
            this._app.use(KoaBodyparser({ enableTypes: ['json', 'form', 'text'] }));
            this._app.use(KoaJson({ pretty: this._app.env === 'development' }));
            // use provided public directories (with static cache)
            if (this.config.publicDirs) {
                for (const dir of this.config.publicDirs) {
                    this._app.use(KoaStaticCache(dir, { cacheControl: 'private' }));
                    this._app.use(KoaStatic(dir, { gzip: true }));
                }
            }
            // use provided middleware
            if (this.config.middleware)
                for (const m of this.config.middleware)
                    this._app.use(m);
            // use provided routes
            if (this.config.routes)
                for (const r of this.config.routes)
                    this._app.use(r);
            // create and listen on all https _servers
            if (this.config.httpsServers) {
                for (const s of this.config.httpsServers) {
                    const server = https.createServer(s.opts, this._app.callback()).listen(s.port, s.path, (err) => {
                        if (err) {
                            err.message = `HTTPS server creation error: ${err.message}`;
                            return Promise.reject(err);
                        }
                        const address = server.address();
                        console.log(`\nListening at https://${address.address}:${address.port}/ in ${this._app.env} mode.`);
                    });
                    this._servers.push(server);
                }
            }
            // create and listen on all http _servers
            if (this.config.httpServers) {
                for (const s of this.config.httpServers) {
                    const server = http.createServer(this._app.callback()).listen(s.port, s.path, (err) => {
                        if (err) {
                            err.message = `HTTP server creation error: ${err.message}`;
                            return Promise.reject(err);
                        }
                        const address = server.address();
                        console.log(`\nListening at http://${address.address}:${address.port}/ in ${this._app.env} mode.`);
                    });
                    this._servers.push(server);
                }
            }
            return Promise.resolve();
        }
        catch (err) {
            err.message = `Koa setup error: ${err.message}`;
            return Promise.reject(err);
        }
    }
}
exports.ServerApp = ServerApp;
