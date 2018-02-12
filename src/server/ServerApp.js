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
    function ServerApp(config) {
        this.config = config;
        this._app = new Koa();
        this._servers = [];
    }
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
                                    httpOnly: this.config.sessionHttpOnly,
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
                                    extendTypes: this.config.bodyParserExtendTypes,
                                    formLimit: this.config.bodyParserFormLimit,
                                    jsonLimit: this.config.bodyParserJsonLimit,
                                    textLimit: this.config.bodyParserTextLimit
                                }));
                            }
                            if (this.config.json !== false) {
                                this.app.use(KoaJson({ pretty: this.app.env === 'development' }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsic2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBNEI7QUFDNUIsNkJBQThCO0FBQzlCLHlCQUEwQjtBQUMxQiwwQ0FBMkM7QUFDM0Msd0NBQXlDO0FBQ3pDLDhDQUErQztBQUMvQyxrQ0FBbUM7QUFDbkMsc0NBQXVDO0FBQ3ZDLGtDQUFtQztBQUNuQyxzQ0FBdUM7QUFDdkMsaURBQWtEO0FBQ2xELHdDQUF5QztBQUN6QyxtQ0FBb0M7QUFLcEM7SUFpQkUsbUJBQTZCLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBZjdDLFNBQUksR0FBUSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLGFBQVEsR0FBaUIsRUFBRSxDQUFBO0lBY3NCLENBQUM7SUFaMUQsc0JBQUksNkJBQU07YUFBVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMEJBQUc7YUFBUDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ2xCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOEJBQU87YUFBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3RCLENBQUM7OztPQUFBO0lBSUsseUJBQUssR0FBWDs7Ozs7Ozs7NkJBT1EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQXJCLGNBQXFCOzs7O3dCQUdyQixXQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQTdDLFNBQTZDLENBQUE7d0JBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTt3QkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBeUIsSUFB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