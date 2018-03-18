'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = y[op[0] & 2 ? 'return' : op[0] ? 'throw' : 'next']) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [0, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var gridFSStream = require('gridfs-stream')
var http = require('http')
var https = require('https')
var Koa = require('koa')
var KoaCompress = require('koa-compress')
var KoaConvert = require('koa-convert')
var koaBody = require('koa-body')
var KoaJson = require('koa-json')
var KoaLogger = require('koa-logger')
var KoaSend = require('koa-send')
var KoaStatic = require('koa-static')
var KoaStaticCache = require('koa-static-cache')
var KoaSession = require('koa-session')
var mongoose = require('mongoose')
var ServerApp = /** @class */ (function() {
  function ServerApp(config, env) {
    if (env === void 0) {
      env = process['NODE_ENV'] || 'development'
    }
    this.config = config
    this._app = new Koa()
    this._servers = []
    this.env = env
  }
  Object.defineProperty(ServerApp.prototype, 'name', {
    get: function() {
      return this.config.name
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ServerApp.prototype, 'dbConn', {
    get: function() {
      return this._dbConn
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ServerApp.prototype, 'grid', {
    get: function() {
      return this._grid
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ServerApp.prototype, 'app', {
    get: function() {
      return this._app
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ServerApp.prototype, 'servers', {
    get: function() {
      return this._servers
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ServerApp.prototype, 'env', {
    get: function() {
      return this.app.env
    },
    set: function(environment) {
      this.app.env = environment
    },
    enumerable: true,
    configurable: true
  })
  ServerApp.prototype.start = function() {
    return __awaiter(this, void 0, void 0, function() {
      var _this = this
      var err_1,
        err_2,
        _i,
        _a,
        dir,
        _b,
        _c,
        m,
        _d,
        _e,
        r,
        _loop_1,
        this_1,
        _f,
        _g,
        s,
        _loop_2,
        this_2,
        _h,
        _j,
        s,
        _k,
        _l,
        socket,
        _m,
        _o,
        server
      return __generator(this, function(_p) {
        switch (_p.label) {
          case 0:
            _p.trys.push([0, 7, , 8])
            if (!this.config.mongoUris) return [3 /*break*/, 5]
            _p.label = 1
          case 1:
            _p.trys.push([1, 3, , 4])
            return [4 /*yield*/, mongoose.connect(this.config.mongoUris)] // todo: feature request: auth (user & pass) support for db
          case 2:
            _p.sent() // todo: feature request: auth (user & pass) support for db
            this._dbConn = mongoose.connection
            console.log('Database connected to ' + this.config.mongoUris + '.')
            this._grid = gridFSStream(this._dbConn.db, mongoose.mongo)
            return [3 /*break*/, 4]
          case 3:
            err_1 = _p.sent()
            err_1.message = 'Database connection error: ' + err_1.message
            return [2 /*return*/, Promise.reject(err_1)]
          case 4:
            return [3 /*break*/, 6]
          case 5:
            if (this.config.models) {
              // else if there are models but no mongoUris... what are they for?
              return [
                2 /*return*/,
                Promise.reject(
                  new Error('No MongoDB URI to load the provided models on.')
                )
              ]
            }
            _p.label = 6
          case 6:
            return [3 /*break*/, 8]
          case 7:
            err_2 = _p.sent()
            err_2.message = 'Mongoose setup error: ' + err_2.message
            return [2 /*return*/, Promise.reject(err_2)]
          case 8:
            /* KOA */
            try {
              // set keys
              if (this.config.keys) this.app.keys = this.config.keys
              // use the essential koa middleware
              if (this.config.log !== false) {
                this.app.use(KoaLogger())
              }
              if (
                this.config.session !== false &&
                Array.isArray(this.app.keys) &&
                this.app.keys.length
              ) {
                this.app.use(
                  KoaSession(
                    {
                      key:
                        this.config.sessionCookieKey ||
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
                    },
                    this.app
                  )
                )
              }
              if (this.config.compress !== false) {
                this.app.use(
                  KoaCompress({ level: 9, memLevel: 9, threshold: 0 })
                )
              }
              if (this.config.bodyParser !== false) {
                this.app.use(
                  koaBody({
                    encoding: this.config.bodyParserEncoding || 'utf-8',
                    formLimit: this.config.bodyParserFormLimit || '56kb',
                    json: this.config.bodyParserEnableJson !== false,
                    jsonLimit: this.config.bodyParserJsonLimit || '1mb',
                    multipart: this.config.bodyParserMultipart || false,
                    text: this.config.bodyParserEnableText !== false,
                    textLimit: this.config.bodyParserTextLimit || '1mb',
                    urlencoded: this.config.bodyParserEnableForm !== false
                  })
                )
              }
              if (this.config.json !== false) {
                this.app.use(
                  KoaJson({
                    pretty:
                      this.config.jsonPretty || this.env === 'development',
                    param: this.config.jsonPrettyParam || undefined,
                    spaces: this.config.jsonSpaces || 2
                  })
                )
              }
              // use provided public directories (with static cache)
              if (this.config.publicDirs) {
                for (
                  _i = 0, _a = this.config.publicDirs;
                  _i < _a.length;
                  _i++
                ) {
                  dir = _a[_i]
                  this.app.use(
                    KoaStaticCache(dir, {
                      cacheControl: this.config.cacheControl || 'private'
                    })
                  )
                  this.app.use(
                    KoaStatic(dir, {
                      gzip:
                        this.config.compress === true ||
                        this.config.compress === false
                          ? this.config.compress
                          : true
                    })
                  )
                }
              }
              // use provided middleware
              if (this.config.middleware)
                for (
                  _b = 0, _c = this.config.middleware;
                  _b < _c.length;
                  _b++
                ) {
                  m = _c[_b]
                  this.app.use(KoaConvert.compose(m))
                }
              // use provided routers
              if (this.config.routers)
                for (_d = 0, _e = this.config.routers; _d < _e.length; _d++) {
                  r = _e[_d]
                  this.app.use(r.routes()).use(r.allowedMethods())
                }
              // 404 => SPA?
              if (this.config.spaFileRelativePath) {
                this.app.use(function(ctx) {
                  return __awaiter(_this, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          if (!(ctx.status === 404)) return [3 /*break*/, 2]
                          return [
                            4 /*yield*/,
                            KoaSend(ctx, this.config.spaFileRelativePath).catch(
                              function(err) {
                                return console.error(
                                  'Error sending the specified SPA file: ' + err
                                )
                              }
                            )
                          ]
                        case 1:
                          _a.sent()
                          _a.label = 2
                        case 2:
                          return [2 /*return*/]
                      }
                    })
                  })
                })
              }
              // create and listen on all https servers
              if (this.config.httpsServers) {
                _loop_1 = function(s) {
                  var server = https
                    .createServer(s.opts, this_1.app.callback())
                    .listen(s.port, s.path, function(err) {
                      if (err) {
                        err.message =
                          'HTTPS server creation error: ' + err.message
                        return Promise.reject(err)
                      }
                      var address = server.address()
                      console.log(
                        'Listening at https://' +
                          address.address +
                          ':' +
                          address.port +
                          '/ in ' +
                          _this.app.env +
                          ' mode.'
                      )
                    })
                  this_1.servers.push(server)
                }
                this_1 = this
                for (
                  _f = 0, _g = this.config.httpsServers;
                  _f < _g.length;
                  _f++
                ) {
                  s = _g[_f]
                  _loop_1(s)
                }
              }
              // create and listen on all http servers
              if (this.config.httpServers) {
                _loop_2 = function(s) {
                  var server = http
                    .createServer(this_2.app.callback())
                    .listen(s.port, s.path, function(err) {
                      if (err) {
                        err.message =
                          'HTTP server creation error: ' + err.message
                        return Promise.reject(err)
                      }
                      var address = server.address()
                      console.log(
                        'Listening at http://' +
                          address.address +
                          ':' +
                          address.port +
                          '/ in ' +
                          _this.app.env +
                          ' mode.'
                      )
                    })
                  this_2.servers.push(server)
                }
                this_2 = this
                for (
                  _h = 0, _j = this.config.httpServers;
                  _h < _j.length;
                  _h++
                ) {
                  s = _j[_h]
                  _loop_2(s)
                }
              }
              // attach sockets to the servers
              if (this.config.sockets) {
                for (_k = 0, _l = this.config.sockets; _k < _l.length; _k++) {
                  socket = _l[_k]
                  for (_m = 0, _o = this.servers; _m < _o.length; _m++) {
                    server = _o[_m]
                    socket.attach(server)
                  }
                }
              }
              return [2 /*return*/, Promise.resolve()]
            } catch (err) {
              err.message = 'Koa setup error: ' + err.message
              return [2 /*return*/, Promise.reject(err)]
            }
            return [2 /*return*/]
        }
      })
    })
  }
  return ServerApp
})()
exports.ServerApp = ServerApp
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsic2VydmVyL1NlcnZlckFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTZDO0FBQzdDLDJCQUE0QjtBQUM1Qiw2QkFBOEI7QUFDOUIseUJBQTBCO0FBQzFCLDBDQUEyQztBQUMzQyx3Q0FBeUM7QUFDekMsa0NBQW1DO0FBQ25DLGtDQUFtQztBQUNuQyxzQ0FBdUM7QUFDdkMsa0NBQW1DO0FBQ25DLHNDQUF1QztBQUN2QyxpREFBa0Q7QUFDbEQsd0NBQXlDO0FBQ3pDLG1DQUFvQztBQUtwQztJQU1FLG1CQUNrQixNQUF3QixFQUN4QyxHQUEwQztRQUExQyxvQkFBQSxFQUFBLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQWE7UUFEMUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFKbEMsU0FBSSxHQUFRLElBQUksR0FBRyxFQUFFLENBQUE7UUFDckIsYUFBUSxHQUFpQixFQUFFLENBQUE7UUFNakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztJQUVELHNCQUFJLDJCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2QkFBTTthQUFWO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQkFBSTthQUFSO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFB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
