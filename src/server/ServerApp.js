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
Object.defineProperty(exports, "__esModule", { value: true });
var gridFSStream = require("gridfs-stream");
var http = require("http");
var https = require("https");
var Koa = require("koa");
var KoaCompress = require("koa-compress");
var KoaConvert = require("koa-convert");
var koaBody = require("koa-body");
var KoaJson = require("koa-json");
var KoaLogger = require("koa-logger");
var KoaSend = require("koa-send");
var KoaStatic = require("koa-static");
var KoaStaticCache = require("koa-static-cache");
var KoaSession = require("koa-session");
var mongoose = require("mongoose");
var ServerApp = /** @class */ (function () {
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
    Object.defineProperty(ServerApp.prototype, "grid", {
        get: function () {
            return this._grid;
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var err_1, err_2, _i, _a, dir, _b, _c, m, _d, _e, r, _loop_1, this_1, _f, _g, s, _loop_2, this_2, _h, _j, s, _k, _l, socket, _m, _o, server;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        _p.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3 /*break*/, 5];
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mongoose.connect(this.config.mongoUris)]; // todo: feature request: auth (user & pass) support for db
                    case 2:
                        _p.sent(); // todo: feature request: auth (user & pass) support for db
                        this._dbConn = mongoose.connection;
                        console.log("Database connected to " + this.config.mongoUris + ".");
                        this._grid = gridFSStream(this._dbConn.db, mongoose.mongo);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _p.sent();
                        err_1.message = "Database connection error: " + err_1.message;
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (this.config.models) {
                            return [2 /*return*/, Promise.reject(new Error('No MongoDB URI to load the provided models on.'))];
                        }
                        _p.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_2 = _p.sent();
                        err_2.message = "Mongoose setup error: " + err_2.message;
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 8:
                        /* KOA */
                        try {
                            // set keys
                            if (this.config.keys)
                                this.app.keys = this.config.keys;
                            // use the essential koa middleware
                            if (this.config.log !== false) {
                                this.app.use(KoaLogger());
                            }
                            if (this.config.session !== false && Array.isArray(this.app.keys) && this.app.keys.length) {
                                this.app.use(KoaSession({
                                    key: this.config.sessionCookieKey || this.config.name.trim().toLowerCase().replace(/ /g, '_'),
                                    httpOnly: this.config.sessionHttpOnly !== false,
                                    maxAge: this.config.sessionMaxAge || 86400000,
                                    overwrite: this.config.sessionOverwrite !== false,
                                    renew: this.config.sessionRenew || false,
                                    rolling: this.config.sessionRolling || false,
                                    signed: this.config.sessionSigned !== false
                                }, this.app));
                            }
                            if (this.config.compress !== false) {
                                this.app.use(KoaCompress({ level: 9, memLevel: 9, threshold: 0 }));
                            }
                            if (this.config.bodyParser !== false) {
                                this.app.use(koaBody({
                                    encoding: this.config.bodyParserEncoding || 'utf-8',
                                    formLimit: this.config.bodyParserFormLimit || '56kb',
                                    json: this.config.bodyParserEnableJson !== false,
                                    jsonLimit: this.config.bodyParserJsonLimit || '1mb',
                                    multipart: this.config.bodyParserMultipart || false,
                                    text: this.config.bodyParserEnableText !== false,
                                    textLimit: this.config.bodyParserTextLimit || '1mb',
                                    urlencoded: this.config.bodyParserEnableForm !== false
                                }));
                            }
                            if (this.config.json !== false) {
                                this.app.use(KoaJson({
                                    pretty: this.config.jsonPretty || this.env === 'development',
                                    param: this.config.jsonPrettyParam || undefined,
                                    spaces: this.config.jsonSpaces || 2
                                }));
                            }
                            // use provided public directories (with static cache)
                            if (this.config.publicDirs) {
                                for (_i = 0, _a = this.config.publicDirs; _i < _a.length; _i++) {
                                    dir = _a[_i];
                                    this.app.use(KoaStaticCache(dir, { cacheControl: this.config.cacheControl || 'private' }));
                                    this.app.use(KoaStatic(dir, {
                                        gzip: this.config.compress === true || this.config.compress === false ? this.config.compress : true
                                    }));
                                }
                            }
                            // use provided middleware
                            if (this.config.middleware)
                                for (_b = 0, _c = this.config.middleware; _b < _c.length; _b++) {
                                    m = _c[_b];
                                    this.app.use(KoaConvert.compose(m));
                                }
                            // use provided routers
                            if (this.config.routers)
                                for (_d = 0, _e = this.config.routers; _d < _e.length; _d++) {
                                    r = _e[_d];
                                    this.app.use(r.routes()).use(r.allowedMethods());
                                }
                            // 404 => SPA?
                            if (this.config.spaFileRelativePath) {
                                this.app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(ctx.status === 404)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, KoaSend(ctx, this.config.spaFileRelativePath)
                                                        .catch(function (err) { return console.error("Error sending the specified SPA file: " + err); })];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            // create and listen on all https servers
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
                                for (_f = 0, _g = this.config.httpsServers; _f < _g.length; _f++) {
                                    s = _g[_f];
                                    _loop_1(s);
                                }
                            }
                            // create and listen on all http servers
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
                                for (_h = 0, _j = this.config.httpServers; _h < _j.length; _h++) {
                                    s = _j[_h];
                                    _loop_2(s);
                                }
                            }
                            // attach sockets to the servers
                            if (this.config.sockets) {
                                for (_k = 0, _l = this.config.sockets; _k < _l.length; _k++) {
                                    socket = _l[_k];
                                    for (_m = 0, _o = this.servers; _m < _o.length; _m++) {
                                        server = _o[_m];
                                        socket.attach(server);
                                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsic2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTZDO0FBQzdDLDJCQUE0QjtBQUM1Qiw2QkFBOEI7QUFDOUIseUJBQTBCO0FBQzFCLDBDQUEyQztBQUMzQyx3Q0FBeUM7QUFDekMsa0NBQW1DO0FBQ25DLGtDQUFtQztBQUNuQyxzQ0FBdUM7QUFDdkMsa0NBQW1DO0FBQ25DLHNDQUF1QztBQUN2QyxpREFBa0Q7QUFDbEQsd0NBQXlDO0FBQ3pDLG1DQUFvQztBQUtwQztJQU1FLG1CQUE2QixNQUF3QixFQUFFLEdBQTBDO1FBQTFDLG9CQUFBLEVBQUEsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksYUFBYTtRQUFwRSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUg3QyxTQUFJLEdBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNyQixhQUFRLEdBQWlCLEVBQUUsQ0FBQTtRQUdqQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBRUQsc0JBQUksMkJBQUk7YUFBUjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFNO2FBQVY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNuQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBCQUFHO2FBQVA7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJ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