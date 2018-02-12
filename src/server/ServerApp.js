"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http = require("http");
var https = require("https");
var Koa = require("koa");
var KoaCompress = require("koa-compress");
var KoaConvert = require("koa-convert");
var KoaBodyparser = require("koa-bodyparser");
var KoaJson = require("koa-json");
var KoaLogger = require("koa-logger");
var KoaSend = require("koa-send");
var KoaStatic = require("koa-static");
var KoaStaticCache = require("koa-static-cache");
var KoaSession = require("koa-session");
var mongoose = require("mongoose");
var ServerApp = (function () {
    function ServerApp(config, env) {
        if (env === void 0) { env = process['NODE_ENV'] || 'development'; }
        this.config = config;
        this._app = new Koa();
        this._servers = [];
        this.env = env;
    }
    Object.defineProperty(ServerApp.prototype, "name", {
        get: function () {
            return this.config.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerApp.prototype, "dbConn", {
        get: function () {
            return this._dbConn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerApp.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerApp.prototype, "servers", {
        get: function () {
            return this._servers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerApp.prototype, "env", {
        get: function () {
            return this.app.env;
        },
        set: function (environment) {
            this.app.env = environment;
        },
        enumerable: true,
        configurable: true
    });
    ServerApp.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var err_1, err_2, enabledTypes, _a, _b, dir, _c, _d, m, _e, _f, r, _loop_1, this_1, _g, _h, s, _loop_2, this_2, _j, _k, s, _l, _m, socket, _o, _p, server, e_1, _q, e_2, _r, e_3, _s, e_4, _t, e_5, _u, e_6, _v, e_7, _w;
            return tslib_1.__generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        _x.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3, 5];
                        _x.label = 1;
                    case 1:
                        _x.trys.push([1, 3, , 4]);
                        return [4, mongoose.connect(this.config.mongoUris)];
                    case 2:
                        _x.sent();
                        this._dbConn = mongoose.connection;
                        console.log("Database connected to " + this.config.mongoUris + ".");
                        return [3, 4];
                    case 3:
                        err_1 = _x.sent();
                        err_1.message = "Database connection error: " + err_1.message;
                        return [2, Promise.reject(err_1)];
                    case 4: return [3, 6];
                    case 5:
                        if (this.config.models) {
                            return [2, Promise.reject(new Error('No MongoDB URI to load the provided models on.'))];
                        }
                        _x.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        err_2 = _x.sent();
                        err_2.message = "Mongoose setup error: " + err_2.message;
                        return [2, Promise.reject(err_2)];
                    case 8:
                        try {
                            if (this.config.keys)
                                this.app.keys = this.config.keys;
                            if (this.config.log !== false) {
                                this.app.use(KoaLogger());
                            }
                            if (this.config.session !== false && Array.isArray(this.app.keys) && this.app.keys.length) {
                                this.app.use(KoaSession({
                                    key: this.config.sessionCookieKey || this.config.name.trim().toLowerCase().replace(/ /g, '_'),
                                    httpOnly: this.config.sessionHttpOnly || true,
                                    maxAge: this.config.sessionMaxAge || 86400000,
                                    overwrite: this.config.sessionOverwrite || true,
                                    renew: this.config.sessionRenew || false,
                                    rolling: this.config.sessionRolling || false,
                                    signed: this.config.sessionSigned || true
                                }, this.app));
                            }
                            if (this.config.compress !== false) {
                                this.app.use(KoaCompress({ level: 9, memLevel: 9, threshold: 0 }));
                            }
                            if (this.config.bodyParser !== false) {
                                enabledTypes = [];
                                if (this.config.bodyParserEnableForm !== false)
                                    enabledTypes.push('form');
                                if (this.config.bodyParserEnableJson !== false)
                                    enabledTypes.push('json');
                                if (this.config.bodyParserEnableText !== false)
                                    enabledTypes.push('text');
                                this.app.use(KoaBodyparser({
                                    enableTypes: enabledTypes,
                                    encode: this.config.bodyParserEncoding || 'utf-8',
                                    extendTypes: this.config.bodyParserExtendTypes || undefined,
                                    formLimit: this.config.bodyParserFormLimit || '56kb',
                                    jsonLimit: this.config.bodyParserJsonLimit || '1mb',
                                    textLimit: this.config.bodyParserTextLimit || '1mb'
                                }));
                            }
                            if (this.config.json !== false) {
                                this.app.use(KoaJson({
                                    pretty: this.config.jsonPretty || this.env === 'development',
                                    param: this.config.jsonPrettyParam || undefined,
                                    spaces: this.config.jsonSpaces || 2
                                }));
                            }
                            if (this.config.publicDirs) {
                                try {
                                    for (_a = tslib_1.__values(this.config.publicDirs), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        dir = _b.value;
                                        this.app.use(KoaStaticCache(dir, { cacheControl: this.config.cacheControl || 'private' }));
                                        this.app.use(KoaStatic(dir, {
                                            gzip: this.config.compress === true || this.config.compress === false ? this.config.compress : true
                                        }));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_q = _a.return)) _q.call(_a);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            }
                            if (this.config.middleware)
                                try {
                                    for (_c = tslib_1.__values(this.config.middleware), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        m = _d.value;
                                        this.app.use(KoaConvert.compose(m));
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_r = _c.return)) _r.call(_c);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            if (this.config.routers)
                                try {
                                    for (_e = tslib_1.__values(this.config.routers), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        r = _f.value;
                                        this.app.use(r.routes()).use(r.allowedMethods());
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_s = _e.return)) _s.call(_e);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            if (this.config.spaFileRelativePath) {
                                this.app.use(function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(ctx.status === 404)) return [3, 2];
                                                return [4, KoaSend(ctx, this.config.spaFileRelativePath)
                                                        .catch(function (err) { return console.error("Error sending the specified SPA file: " + err); })];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                            }
                            if (this.config.httpsServers) {
                                _loop_1 = function (s) {
                                    var server = https.createServer(s.opts, this_1.app.callback()).listen(s.port, s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTPS server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at https://" + address.address + ":" + address.port + "/ in " + _this.app.env + " mode.");
                                    });
                                    this_1.servers.push(server);
                                };
                                this_1 = this;
                                try {
                                    for (_g = tslib_1.__values(this.config.httpsServers), _h = _g.next(); !_h.done; _h = _g.next()) {
                                        s = _h.value;
                                        _loop_1(s);
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (_h && !_h.done && (_t = _g.return)) _t.call(_g);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                            }
                            if (this.config.httpServers) {
                                _loop_2 = function (s) {
                                    var server = http.createServer(this_2.app.callback()).listen(s.port, s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTP server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at http://" + address.address + ":" + address.port + "/ in " + _this.app.env + " mode.");
                                    });
                                    this_2.servers.push(server);
                                };
                                this_2 = this;
                                try {
                                    for (_j = tslib_1.__values(this.config.httpServers), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        s = _k.value;
                                        _loop_2(s);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_u = _j.return)) _u.call(_j);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                            if (this.config.sockets) {
                                try {
                                    for (_l = tslib_1.__values(this.config.sockets), _m = _l.next(); !_m.done; _m = _l.next()) {
                                        socket = _m.value;
                                        try {
                                            for (_o = tslib_1.__values(this.servers), _p = _o.next(); !_p.done; _p = _o.next()) {
                                                server = _p.value;
                                                socket.attach(server);
                                            }
                                        }
                                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                        finally {
                                            try {
                                                if (_p && !_p.done && (_w = _o.return)) _w.call(_o);
                                            }
                                            finally { if (e_7) throw e_7.error; }
                                        }
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (_m && !_m.done && (_v = _l.return)) _v.call(_l);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                            }
                            return [2, Promise.resolve()];
                        }
                        catch (err) {
                            err.message = "Koa setup error: " + err.message;
                            return [2, Promise.reject(err)];
                        }
                        return [2];
                }
            });
        });
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsic2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBNEI7QUFDNUIsNkJBQThCO0FBQzlCLHlCQUEwQjtBQUMxQiwwQ0FBMkM7QUFDM0Msd0NBQXlDO0FBQ3pDLDhDQUErQztBQUMvQyxrQ0FBbUM7QUFDbkMsc0NBQXVDO0FBQ3ZDLGtDQUFtQztBQUNuQyxzQ0FBdUM7QUFDdkMsaURBQWtEO0FBQ2xELHdDQUF5QztBQUN6QyxtQ0FBb0M7QUFLcEM7SUFLRSxtQkFBNkIsTUFBd0IsRUFBRSxHQUEwQztRQUExQyxvQkFBQSxFQUFBLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQWE7UUFBcEUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFIN0MsU0FBSSxHQUFRLElBQUksR0FBRyxFQUFFLENBQUE7UUFDckIsYUFBUSxHQUFpQixFQUFFLENBQUE7UUFHakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztJQUVELHNCQUFJLDJCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw4QkFBTzthQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMs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