"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http = require("http");
var https = require("https");
var Koa = require("koa");
var KoaCompress = require("koa-compress");
var KoaLogger = require("koa-logger");
var KoaBodyparser = require("koa-bodyparser");
var KoaJson = require("koa-json");
var KoaStatic = require("koa-static");
var KoaStaticCache = require("koa-static-cache");
var mongoose = require("mongoose");
var ServerApp = (function () {
    function ServerApp(config) {
        this.config = config;
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
            var err_1, err_2, _a, _b, dir, _c, _d, m, _e, _f, r, _loop_1, this_1, _g, _h, s, _loop_2, this_2, _j, _k, s, e_1, _l, e_2, _m, e_3, _o, e_4, _p, e_5, _q;
            return tslib_1.__generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _r.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3, 5];
                        mongoose.Promise = global.Promise;
                        _r.label = 1;
                    case 1:
                        _r.trys.push([1, 3, , 4]);
                        return [4, mongoose.connect(this.config.mongoUris, { useMongoClient: true }).then()];
                    case 2:
                        _r.sent();
                        this._dbConn = mongoose.connection;
                        console.log("Database connected to " + this.config.mongoUris + ".");
                        return [3, 4];
                    case 3:
                        err_1 = _r.sent();
                        err_1.message = "Database connection error: " + err_1.message;
                        return [2, Promise.reject(err_1)];
                    case 4: return [3, 6];
                    case 5:
                        if (this.config.models) {
                            return [2, Promise.reject(new Error('No MongoDB URI to load the provided models on.'))];
                        }
                        _r.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        err_2 = _r.sent();
                        err_2.message = "Mongoose setup error: " + err_2.message;
                        return [2, Promise.reject(err_2)];
                    case 8:
                        try {
                            this._app = new Koa();
                            this._app.use(KoaLogger());
                            this._app.use(KoaCompress({ level: 9, memLevel: 9, threshold: 0 }));
                            this._app.use(KoaBodyparser({ enableTypes: ['json', 'form', 'text'] }));
                            this._app.use(KoaJson({ pretty: this._app.env === 'development' }));
                            if (this.config.publicDirs) {
                                try {
                                    for (_a = tslib_1.__values(this.config.publicDirs), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        dir = _b.value;
                                        this._app.use(KoaStaticCache(dir, { cacheControl: this.config.cacheControl || 'private' }));
                                        this._app.use(KoaStatic(dir, { gzip: true }));
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_b && !_b.done && (_l = _a.return)) _l.call(_a);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                            }
                            if (this.config.middleware)
                                try {
                                    for (_c = tslib_1.__values(this.config.middleware), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        m = _d.value;
                                        this._app.use(m);
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_m = _c.return)) _m.call(_c);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            if (this.config.routes) {
                                try {
                                    for (_e = tslib_1.__values(this.config.routes), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        r = _f.value;
                                        this._app.use(r.routes());
                                        this._app.use(r.allowedMethods());
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_o = _e.return)) _o.call(_e);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                            if (this.config.httpsServers) {
                                _loop_1 = function (s) {
                                    var server = https.createServer(s.opts, this_1._app.callback()).listen(s.port, s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTPS server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at https://" + address.address + ":" + address.port + "/ in " + _this._app.env + " mode.");
                                    });
                                    this_1._servers.push(server);
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
                                        if (_h && !_h.done && (_p = _g.return)) _p.call(_g);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                            }
                            if (this.config.httpServers) {
                                _loop_2 = function (s) {
                                    var server = http.createServer(this_2._app.callback()).listen(s.port, s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTP server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at http://" + address.address + ":" + address.port + "/ in " + _this._app.env + " mode.");
                                    });
                                    this_2._servers.push(server);
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
                                        if (_k && !_k.done && (_q = _j.return)) _q.call(_j);
                                    }
                                    finally { if (e_5) throw e_5.error; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJzcmMvc2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBNEI7QUFDNUIsNkJBQThCO0FBQzlCLHlCQUEwQjtBQUMxQiwwQ0FBMkM7QUFDM0Msc0NBQXVDO0FBQ3ZDLDhDQUErQztBQUMvQyxrQ0FBbUM7QUFDbkMsc0NBQXVDO0FBQ3ZDLGlEQUFrRDtBQUNsRCxtQ0FBb0M7QUFLcEM7SUFpQkUsbUJBQTZCLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBZDdDLGFBQVEsR0FBaUIsRUFBRSxDQUFBO0lBY3NCLENBQUM7SUFaMUQsc0JBQUksNkJBQU07YUFBVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMEJBQUc7YUFBUDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ2xCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOEJBQU87YUFBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3RCLENBQUM7OztPQUFBO0lBSUsseUJBQUssR0FBWDs7Ozs7Ozs7NkJBT1EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQXJCLGNBQXFCO3dCQUV0QixRQUFnQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFBOzs7O3dCQUl4QyxXQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQyxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQXlCLEVBQUE7O3dCQUFuRyxTQUFtRyxDQUFBO3dCQUVuRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7d0JBQ2xDLE9BQU8sQ0FB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