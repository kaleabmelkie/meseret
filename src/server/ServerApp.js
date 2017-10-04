"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var ServerApp = /** @class */ (function () {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var err_1, err_2, _a, _b, dir, _c, _d, m, _e, _f, r, _loop_1, this_1, _g, _h, s, _loop_2, this_2, _j, _k, s, e_1, _l, e_2, _m, e_3, _o, e_4, _p, e_5, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _r.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3 /*break*/, 5];
                        // set mongoose's promise library
                        mongoose.Promise = global.Promise;
                        _r.label = 1;
                    case 1:
                        _r.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mongoose.connect(this.config.mongoUris, { useMongoClient: true }).then()
                            // todo: feature request: auth (user & pass) for connecting to db
                        ];
                    case 2:
                        _r.sent();
                        // todo: feature request: auth (user & pass) for connecting to db
                        this._dbConn = mongoose.connection;
                        console.log("Database connected to " + this.config.mongoUris + ".");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _r.sent();
                        err_1.message = "Database connection error: " + err_1.message;
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (this.config.models) {
                            return [2 /*return*/, Promise.reject(new Error('No MongoDB URI to load the provided models on.'))];
                        }
                        _r.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_2 = _r.sent();
                        err_2.message = "Mongoose setup error: " + err_2.message;
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 8:
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
                                try {
                                    for (_a = __values(this.config.publicDirs), _b = _a.next(); !_b.done; _b = _a.next()) {
                                        dir = _b.value;
                                        this._app.use(KoaStaticCache(dir, { cacheControl: 'private' }));
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
                            // use provided middleware
                            if (this.config.middleware)
                                try {
                                    for (_c = __values(this.config.middleware), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                            // use provided routes
                            if (this.config.routes)
                                try {
                                    for (_e = __values(this.config.routes), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        r = _f.value;
                                        this._app.use(r);
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_o = _e.return)) _o.call(_e);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            // create and listen on all https _servers
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
                                    for (_g = __values(this.config.httpsServers), _h = _g.next(); !_h.done; _h = _g.next()) {
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
                            // create and listen on all http _servers
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
                                    for (_j = __values(this.config.httpServers), _k = _j.next(); !_k.done; _k = _j.next()) {
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
                            return [2 /*return*/, Promise.resolve()];
                        }
                        catch (err) {
                            err.message = "Koa setup error: " + err.message;
                            return [2 /*return*/, Promise.reject(err)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
//# sourceMappingURL=ServerApp.js.map