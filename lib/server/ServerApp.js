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
var mongoose_1 = require("mongoose");
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
            var err_1, _i, _a, model, name, collection, err_2, _b, _c, m, _d, _e, r, _f, _g, dir, _loop_1, this_1, _h, _j, s, _loop_2, this_2, _k, _l, s, _m, _o, socket, _p, _q, server, err_3;
            var _this = this;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _r.trys.push([0, 12, , 13]);
                        if (!this.config.mongoUris) return [3 /*break*/, 10];
                        _r.label = 1;
                    case 1:
                        _r.trys.push([1, 3, , 4]);
                        // todo: allow overriding mongoose.connect options in v1.8.0
                        return [4 /*yield*/, mongoose.connect(this.config.mongoUris, {
                                useNewUrlParser: true
                            })];
                    case 2:
                        // todo: allow overriding mongoose.connect options in v1.8.0
                        _r.sent();
                        this._dbConn = mongoose.connection;
                        console.log("Database connected to " + this.config.mongoUris + ".");
                        this._grid = gridFSStream(this._dbConn.db, mongoose.mongo);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _r.sent();
                        err_1.message = "Database connection error: " + err_1.message;
                        throw err_1;
                    case 4:
                        if (!this.config.models) return [3 /*break*/, 9];
                        _i = 0, _a = this.config.models || [];
                        _r.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        model = _a[_i];
                        name = mongoose_1.pluralize()(model.modelName);
                        return [4 /*yield*/, this._dbConn.db
                                .listCollections({ name: name })
                                .next()];
                    case 6:
                        collection = _r.sent();
                        if (!!collection) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._dbConn.createCollection(name)];
                    case 7:
                        _r.sent();
                        console.info("Created '" + name + "' collection.");
                        _r.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (this.config.models) {
                            // else if there are models but no mongoUris... what are they for?
                            throw new Error('No MongoDB URI to load the provided models on.');
                        }
                        _r.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_2 = _r.sent();
                        err_2.message = "Mongoose setup error: " + err_2.message;
                        throw err_2;
                    case 13:
                        _r.trys.push([13, 15, , 16]);
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
                        // use provided public directories (with static cache)
                        if (this.config.publicDirs) {
                            for (_f = 0, _g = this.config.publicDirs; _f < _g.length; _f++) {
                                dir = _g[_f];
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
                                            return [4 /*yield*/, KoaSend(ctx, // todo: temp fix until @types/koa-send supports ParametrizedContext
                                                this.config.spaFileRelativePath).catch(function (err) {
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
                                        throw err;
                                    }
                                    var address = server.address();
                                    console.log("Listening at " + (!address
                                        ? 'unknown address'
                                        : typeof address === 'string'
                                            ? address
                                            : 'https://' + address.address + ':' + address.port + '/') + " in " + _this.app.env + " mode.");
                                });
                                this_1.servers.push(server);
                            };
                            this_1 = this;
                            for (_h = 0, _j = this.config.httpsServers; _h < _j.length; _h++) {
                                s = _j[_h];
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
                                        throw err;
                                    }
                                    var address = server.address();
                                    console.log("Listening at " + (!address
                                        ? 'unknown address'
                                        : typeof address === 'string'
                                            ? address
                                            : 'http://' + address.address + ':' + address.port + '/') + " in " + _this.app.env + " mode.");
                                });
                                this_2.servers.push(server);
                            };
                            this_2 = this;
                            for (_k = 0, _l = this.config.httpServers; _k < _l.length; _k++) {
                                s = _l[_k];
                                _loop_2(s);
                            }
                        }
                        // attach sockets to the servers
                        if (this.config.sockets) {
                            for (_m = 0, _o = this.config.sockets; _m < _o.length; _m++) {
                                socket = _o[_m];
                                for (_p = 0, _q = this.servers; _p < _q.length; _p++) {
                                    server = _q[_p];
                                    socket.attach(server);
                                }
                            }
                        }
                        return [4 /*yield*/, Promise.resolve()];
                    case 14: return [2 /*return*/, _r.sent()];
                    case 15:
                        err_3 = _r.sent();
                        err_3.message = "Koa setup error: " + err_3.message;
                        throw err_3;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
//# sourceMappingURL=ServerApp.js.map