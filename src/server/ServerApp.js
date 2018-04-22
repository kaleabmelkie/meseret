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
      env = process.env.NODE_ENV || 'development'
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
            return [4 /*yield*/, mongoose.connect(this.config.mongoUris)]
          case 2:
            _p.sent()
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
                    .listen(s.port, s.hostname || s.path, function(err) {
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
                    .listen(s.port, s.hostname || s.path, function(err) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyQXBwLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUva2FsZWFibWVsa2llL21lc2VyZXQvIiwic291cmNlcyI6WyJzZXJ2ZXIvU2VydmVyQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNkM7QUFDN0MsMkJBQTRCO0FBQzVCLDZCQUE4QjtBQUM5Qix5QkFBMEI7QUFDMUIsMENBQTJDO0FBQzNDLHdDQUF5QztBQUN6QyxrQ0FBbUM7QUFDbkMsa0NBQW1DO0FBQ25DLHNDQUF1QztBQUN2QyxrQ0FBbUM7QUFDbkMsc0NBQXVDO0FBQ3ZDLGlEQUFrRDtBQUNsRCx3Q0FBeUM7QUFDekMsbUNBQW9DO0FBS3BDO0lBTUUsbUJBQ2tCLE1BQXdCLEVBQ3hDLEdBQTJDO1FBQTNDLG9CQUFBLEVBQUEsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhO1FBRDNCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBSmxDLFNBQUksR0FBUSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLGFBQVEsR0FBaUIsRUFBRSxDQUFBO1FBTWpDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxzQkFBSSwyQkFBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZCQUFNO2FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQkFBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ25CLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMEJBQUc7YUFBUDtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNsQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhCQUFPO2FBQVg7WUFD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
