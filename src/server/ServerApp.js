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
            var err_1, err_2, _a, _b, dir, _c, _d, m, _e, _f, r, _loop_1, this_1, _g, _h, s, _loop_2, this_2, _j, _k, s, _l, _m, socket, _o, _p, server, e_1, _q, e_2, _r, e_3, _s, e_4, _t, e_5, _u, e_6, _v, e_7, _w;
            return tslib_1.__generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        _x.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3, 5];
                        mongoose.Promise = global.Promise;
                        _x.label = 1;
                    case 1:
                        _x.trys.push([1, 3, , 4]);
                        return [4, mongoose.connect(this.config.mongoUris, { useMongoClient: true }).then()];
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
                                this._app.keys = this.config.keys;
                            if (this.config.log !== false)
                                this._app.use(KoaLogger());
                            if (this.config.session !== false && Array.isArray(this._app.keys) && this._app.keys.length)
                                this._app.use(KoaSession(this.app));
                            if (this.config.compress !== false)
                                this._app.use(KoaCompress({ level: 9, memLevel: 9, threshold: 0 }));
                            if (this.config.bodyParser !== false)
                                this._app.use(KoaBodyparser({ enableTypes: ['json', 'form', 'text'] }));
                            if (this.config.json !== false)
                                this._app.use(KoaJson({ pretty: this._app.env === 'development' }));
                            if (this.config.publicDirs) {
                                try {
                                    for (_a = tslib_1.__values(this.config.publicDirs), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        dir = _b.value;
                                        this._app.use(KoaStaticCache(dir, { cacheControl: this.config.cacheControl || 'private' }));
                                        this._app.use(KoaStatic(dir, {
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
                                        this._app.use(KoaConvert.compose(m));
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
                                        this._app.use(r.middlewares());
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_s = _e.return)) _s.call(_e);
                                    }
                                    finally { if (e_3) throw e_3.error; }
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
                                        if (_h && !_h.done && (_t = _g.return)) _t.call(_g);
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
                                            for (_o = tslib_1.__values(this._servers), _p = _o.next(); !_p.done; _p = _o.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsic2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBNEI7QUFDNUIsNkJBQThCO0FBQzlCLHlCQUEwQjtBQUMxQiwwQ0FBMkM7QUFDM0Msd0NBQXlDO0FBQ3pDLDhDQUErQztBQUMvQyxrQ0FBbUM7QUFDbkMsc0NBQXVDO0FBQ3ZDLHNDQUF1QztBQUN2QyxpREFBa0Q7QUFDbEQsd0NBQXlDO0FBQ3pDLG1DQUFvQztBQUtwQztJQWlCRSxtQkFBNkIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFmN0MsU0FBSSxHQUFRLElBQUksR0FBRyxFQUFFLENBQUE7UUFDckIsYUFBUSxHQUFpQixFQUFFLENBQUE7SUFjc0IsQ0FBQztJQVoxRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw4QkFBTzthQUFYO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDdEIsQ0FBQzs7O09BQUE7SUFJSyx5QkFBSyxHQUFYOzs7Ozs7Ozs2QkFPUSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBckIsY0FBcUI7d0JBRXRCLFFBQWdCLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUE7Ozs7d0JBSXhDLFdBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBeUIsRUFBQTs7d0JBQW5HLFNBQW1HLENBQUE7d0JBRW5HLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTt3QkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLE1BQUcsQ0FBQyxDQUFBOzs7O3dCQUU5RCxLQUFHLENBQUMsT0FBTyxHQUFHLGdDQUE4QixLQUFHLENBQUMsT0FBUyxDQUFBO3dCQUN6RCxXQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBRyxDQUFDLEVBQUE7Ozt3QkFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixNQUFNLEtBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLEVBQUE7d0JBQ3BGLENBQUM7Ozs7O3dCQUVELEtBQUcsQ0FBQyxPQUFPLEdBQUcsMkJBQXlCLEtBQUcsQ0FBQyxPQUFTLENBQUE7d0JBQ3BELFdBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFHLENBQUMsRUFBQTs7d0JBSzVCLElBQUksQ0FBQzs0QkFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTs0QkFHdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDO2dDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7NEJBQ3pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs0QkFDaEksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDO2dDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBOzRCQUN2RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUM7Z0NBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTs0QkFDN0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO2dDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUE7NEJBR25HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7b0NBQzNCLEdBQUcsQ0FBQyxDQUFjLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7d0NBQTdCLEdBQUc7d0NBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7d0NBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7NENBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSTt5Q0FDcEcsQ0FBQyxDQUFDLENBQUE7cUNBQ0o7Ozs7Ozs7Ozs0QkFDSCxDQUFDOzRCQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOztvQ0FBQyxHQUFHLENBQUMsQ0FBWSxLQUFBLGlCQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFBO3dDQUEzQixDQUFDO3dDQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7cUNBQUE7Ozs7Ozs7O2lDQUFBOzRCQUd4RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7b0NBQUMsR0FBRyxDQUFDLENBQVksS0FBQSxpQkFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTt3Q0FBeEIsQ0FBQzt3Q0FBeUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7cUNBQUE7Ozs7Ozs7O2lDQUFBOzRCQUc1RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0RBQ2xCLENBQUM7b0NBQ1YsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQVE7d0NBQzlGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NENBQ1IsR0FBRyxDQUFDLE9BQU8sR0FBRyxrQ0FBZ0MsR0FBRyxDQUFDLE9BQVMsQ0FBQTs0Q0FDM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7d0NBQzVCLENBQUM7d0NBRUQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO3dDQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUF3QixPQUFPLENBQUMsT0FBTyxTQUFJLE9BQU8sQ0FBQyxJQUFJLGFBQVEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVEsQ0FBQyxDQUFBO29DQUNuRyxDQUFDLENBQUMsQ0FBQTtvQ0FDRixPQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7Z0NBQzVCLENBQUM7OztvQ0FYRCxHQUFHLENBQUMsQ0FBWSxLQUFBLGlCQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFBO3dDQUE3QixDQUFDO2dEQUFELENBQUM7cUNBV1g7Ozs7Ozs7Ozs0QkFDSCxDQUFDOzRCQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvREFDakIsQ0FBQztvQ0FDVixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQVE7d0NBQ3JGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NENBQ1IsR0FBRyxDQUFDLE9BQU8sR0FBRyxpQ0FBK0IsR0FBRyxDQUFDLE9BQVMsQ0FBQTs0Q0FDMUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7d0NBQzVCLENBQUM7d0NBRUQsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO3dDQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixPQUFPLENBQUMsT0FBTyxTQUFJLE9BQU8sQ0FBQyxJQUFJLGFBQVEsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVEsQ0FBQyxDQUFBO29DQUNsRyxDQUFDLENBQUMsQ0FBQTtvQ0FDRixPQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7Z0NBQzVCLENBQUM7OztvQ0FYRCxHQUFHLENBQUMsQ0FBWSxLQUFBLGlCQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFBO3dDQUE1QixDQUFDO2dEQUFELENBQUM7cUNBV1g7Ozs7Ozs7Ozs0QkFDSCxDQUFDOzRCQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7b0NBQ3hCLEdBQUcsQ0FBQyxDQUFpQixLQUFBLGlCQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFBO3dDQUE3QixNQUFNOzs0Q0FDZixHQUFHLENBQUMsQ0FBaUIsS0FBQSxpQkFBQSxJQUFJLENBQUMsUUFBUSxDQUFBO2dEQUF2QixNQUFNO2dEQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7NkNBQ3RCOzs7Ozs7Ozs7cUNBQ0Y7Ozs7Ozs7Ozs0QkFDSCxDQUFDOzRCQUVELE1BQU0sS0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUE7d0JBQzFCLENBQUM7d0JBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDYixHQUFHLENBQUMsT0FBTyxHQUFHLHNCQUFvQixHQUFHLENBQUMsT0FBUyxDQUFBOzRCQUMvQyxNQUFNLEtBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBQTt3QkFDNUIsQ0FBQzs7Ozs7S0FDRjtJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQTVIRCxJQTRIQztBQTVIWSw4QkFBUyJ9