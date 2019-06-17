import * as gridFSStream from 'gridfs-stream'
import * as http from 'http'
import * as https from 'https'
import * as Koa from 'koa'
import * as KoaCompress from 'koa-compress'
import * as KoaConvert from 'koa-convert'
import * as koaBody from 'koa-body'
import * as KoaJson from 'koa-json'
import * as KoaLogger from 'koa-logger'
import * as KoaSend from 'koa-send'
import * as KoaStatic from 'koa-static'
import * as KoaStaticCache from 'koa-static-cache'
import * as KoaSession from 'koa-session'
import * as mongoose from 'mongoose'
import * as net from 'net'
import * as path from 'path'

import { IServerAppConfig } from './IServerAppConfig'

export class ServerApp {
  private _dbConn?: mongoose.Connection
  private _grid?: gridFSStream.Grid
  private _app: Koa = new Koa()
  private _servers: net.Server[] = []

  constructor(
    public readonly config: IServerAppConfig,
    env = process.env.NODE_ENV || 'development'
  ) {
    this.env = env
  }

  get name(): string {
    return this.config.name
  }

  get dbConn(): mongoose.Connection | undefined {
    return this._dbConn
  }

  get grid(): gridFSStream.Grid | undefined {
    return this._grid
  }

  get app(): Koa {
    return this._app
  }

  get servers(): net.Server[] {
    return this._servers
  }

  get env(): string {
    return this.app.env
  }

  set env(environment: string) {
    this.app.env = environment
  }

  async start(): Promise<void> {
    /* MONGOOSE */

    try {
      // mongoose models are automatically created at the origins of this.config.model

      if (this.config.mongoUris) {
        // if mongoUris in config...
        // connect to db
        try {
          await mongoose.connect(this.config.mongoUris, {
            useNewUrlParser: true,
            ...this.config.mongooseConnectionOptions
          })
          this._dbConn = mongoose.connection
          console.log(`Database connected to ${this.config.mongoUris}.`)

          this._grid = gridFSStream(this._dbConn.db, mongoose.mongo)
        } catch (err) {
          err.message = `Database connection error: ${err.message}`
          throw err
        }

        if (this.config.models) {
          // Create collections for models provided in IServerAppConfig ahead-of-time
          // needed for first-time ACID transactions
          // (timeout is needs to give mongoose sometime to register all models)
          setTimeout(async () => {
            if (!this._dbConn) return

            for (const model of this.config.models || []) {
              const name = mongoose.pluralize()(model.modelName)

              const collection = await this._dbConn.db
                .listCollections({ name })
                .next()
              if (!collection) {
                await this._dbConn.createCollection(name)
                console.info(`Created '${name}' collection.`)
              }
            }
          }, 5000)
        }
      } else if (this.config.models) {
        // else if there are models but no mongoUris... what are they for?
        throw new Error('No MongoDB URI to load the provided models on.')
      }
    } catch (err) {
      err.message = `Mongoose setup error: ${err.message}`
      throw err
    }

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
          KoaCompress({
            level: 9,
            memLevel: 9,
            threshold: 0
          })
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
            pretty: this.config.jsonPretty || this.env === 'development',
            param: this.config.jsonPrettyParam || undefined,
            spaces: this.config.jsonSpaces || 2
          })
        )
      }

      // use provided middleware
      if (this.config.middleware)
        for (const m of this.config.middleware)
          this.app.use(KoaConvert.compose(m) as Koa.Middleware)

      // use provided routers
      if (this.config.routers)
        for (const r of this.config.routers)
          this.app.use(r.routes()).use(r.allowedMethods())

      // use provided public directories (with static cache)
      if (this.config.publicDirs) {
        for (const dir of this.config.publicDirs) {
          if (!this.config.cacheFiles) this.config.cacheFiles = {}
          const cacheFiles = { ...this.config.cacheFiles }
          for (const pathKey in cacheFiles) {
            if (!cacheFiles.hasOwnProperty(pathKey)) continue
            const value = cacheFiles[pathKey]
            delete cacheFiles[pathKey]
            // normalize paths
            cacheFiles[path.normalize(decodeURIComponent(pathKey))] = value
          }
          const originalCacheFilesFreeze = JSON.stringify({ ...cacheFiles })

          this.app.use(async (ctx, next) => {
            await next()

            const occ = JSON.parse(originalCacheFilesFreeze)
            for (const pathKey in occ) {
              if (
                occ.hasOwnProperty(pathKey) &&
                path.normalize(decodeURIComponent(ctx.path)) === pathKey
              ) {
                const file = occ[pathKey]
                if (!file || (!file.cacheControl && file.maxAge != undefined))
                  break
                ctx.set(
                  'cache-control',
                  `${file.cacheControl ||
                    this.config.cacheControl ||
                    'private'}${
                    file.maxAge != undefined ? ', max-age=' + file.maxAge : ''
                  }`
                )
                break
              }
            }
          })

          this.app.use(
            KoaStaticCache(
              dir,
              {
                cacheControl: this.config.cacheControl || 'private',
                ...this.config.cacheOptions
              },
              cacheFiles
            )
          )

          this.app.use(
            KoaStatic(dir, {
              gzip:
                this.config.compress === true || this.config.compress === false
                  ? this.config.compress
                  : true
            })
          )
        }
      }

      // 404 => SPA?
      if (this.config.spaFileRelativePath) {
        this.app.use(async ctx => {
          if (ctx.status === 404) {
            await KoaSend(ctx, this.config.spaFileRelativePath as string).catch(
              err =>
                console.error(`Error sending the specified SPA file: ${err}`)
            )
          }
        })
      }

      // create and listen on all https servers
      if (this.config.httpsServers) {
        for (const s of this.config.httpsServers) {
          const server = https
            .createServer(s.opts, this.app.callback())
            .listen(s.port, s.hostname || s.path, (err?: any) => {
              if (err) {
                err.message = `HTTPS server creation error: ${err.message}`
                throw err
              }

              const address = server.address()
              console.log(
                `Listening at ${
                  !address
                    ? 'unknown address'
                    : typeof address === 'string'
                    ? address
                    : 'https://' + address.address + ':' + address.port + '/'
                } in ${this.app.env} mode.`
              )
            })
          this.servers.push(server)
        }
      }

      // create and listen on all http servers
      if (this.config.httpServers) {
        for (const s of this.config.httpServers) {
          const server = http
            .createServer(this.app.callback())
            .listen(s.port, s.hostname || s.path, (err?: any) => {
              if (err) {
                err.message = `HTTP server creation error: ${err.message}`
                throw err
              }

              const address = server.address()
              console.log(
                `Listening at ${
                  !address
                    ? 'unknown address'
                    : typeof address === 'string'
                    ? address
                    : 'http://' + address.address + ':' + address.port + '/'
                } in ${this.app.env} mode.`
              )
            })
          this.servers.push(server)
        }
      }

      // attach sockets to the servers
      if (this.config.sockets) {
        for (const socket of this.config.sockets) {
          for (const server of this.servers) {
            socket.attach(server)
          }
        }
      }

      return await Promise.resolve()
    } catch (err) {
      err.message = `Koa setup error: ${err.message}`
      throw err
    }
  }
}
