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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
        if (env === void 0) { env = process.env.NODE_ENV || 'development'; }
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
            var err_1, err_2, _i, _a, m, _b, _c, r, _d, _e, dir, _loop_1, this_1, _f, _g, s, _loop_2, this_2, _h, _j, s, _k, _l, socket, _m, _o, server;
            var _this = this;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        _p.trys.push([0, 7, , 8]);
                        if (!this.config.mongoUris) return [3 /*break*/, 5];
                        _p.label = 1;
                    case 1:
                        _p.trys.push([1, 3, , 4]);
                        // todo: allow overriding mongoose.connect options in v1.8.0
                        return [4 /*yield*/, mongoose.connect(this.config.mongoUris, { useNewUrlParser: true })];
                    case 2:
                        // todo: allow overriding mongoose.connect options in v1.8.0
                        _p.sent();
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
                            // else if there are models but no mongoUris... what are they for?
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
                            if (this.config.session !== false &&
                                Array.isArray(this.app.keys) &&
                                this.app.keys.length) {
                                this.app.use(KoaSession({
                                    key: this.config.sessionCookieKey ||
                                        this.config.name
                                            .trim()
                                            .toLowerCase()
                                            .replace(/ /g, '_'),
                                    httpOnly: this.config.sessionHttpOnly !== false,
                                    maxAge: this.config.sessionMaxAge || 86400000,
                                    overwrite: this.config.sessionOverwrite !== false,
                                    renew: this.config.sessionRenew || false,
                                    rolling: this.config.sessionRolling || false,
                                    signed: this.config.sessionSigned !== false
                                }, this.app));
                            }
                            if (this.config.compress !== false) {
                                this.app.use(KoaCompress({
                                    level: 9,
                                    memLevel: 9,
                                    threshold: 0
                                }));
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
                            // use provided middleware
                            if (this.config.middleware)
                                for (_i = 0, _a = this.config.middleware; _i < _a.length; _i++) {
                                    m = _a[_i];
                                    this.app.use(KoaConvert.compose(m));
                                }
                            // use provided routers
                            if (this.config.routers)
                                for (_b = 0, _c = this.config.routers; _b < _c.length; _b++) {
                                    r = _c[_b];
                                    this.app.use(r.routes()).use(r.allowedMethods());
                                }
                            // use provided public directories (with static cache)
                            if (this.config.publicDirs) {
                                for (_d = 0, _e = this.config.publicDirs; _d < _e.length; _d++) {
                                    dir = _e[_d];
                                    this.app.use(KoaStaticCache(dir, {
                                        cacheControl: this.config.cacheControl || 'private'
                                    }));
                                    this.app.use(KoaStatic(dir, {
                                        gzip: this.config.compress === true || this.config.compress === false
                                            ? this.config.compress
                                            : true
                                    }));
                                }
                            }
                            // 404 => SPA?
                            if (this.config.spaFileRelativePath) {
                                this.app.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(ctx.status === 404)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, KoaSend(ctx, this.config.spaFileRelativePath).catch(function (err) {
                                                        return console.error("Error sending the specified SPA file: " + err);
                                                    })];
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
                                    var server = https
                                        .createServer(s.opts, this_1.app.callback())
                                        .listen(s.port, s.hostname || s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTPS server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at " + (typeof address === 'string'
                                            ? address
                                            : 'https://' + address.address + ':' + address.port + '/') + " in " + _this.app.env + " mode.");
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
                                    var server = http
                                        .createServer(this_2.app.callback())
                                        .listen(s.port, s.hostname || s.path, function (err) {
                                        if (err) {
                                            err.message = "HTTP server creation error: " + err.message;
                                            return Promise.reject(err);
                                        }
                                        var address = server.address();
                                        console.log("Listening at " + (typeof address === 'string'
                                            ? address
                                            : 'http://' + address.address + ':' + address.port + '/') + " in " + _this.app.env + " mode.");
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
//# sourceMappingURL=ServerApp.js.map