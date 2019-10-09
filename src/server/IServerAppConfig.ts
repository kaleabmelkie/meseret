import https from 'https'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaStaticCache from 'koa-static-cache'
import mongoose from 'mongoose'
import SocketIO from 'socket.io'

export interface IServerAppConfig {
  name: string

  models?: mongoose.Model<mongoose.Document>[]
  mongooseConnectionOptions?: mongoose.ConnectionOptions
  mongoUris?: string

  httpServers?: {
    hostname?: string
    port: number
    /**
     * @deprecated Use <code>hostname<code> instead. This will be removed in version 2.
     */
    path?: string
  }[]
  httpsServers?: {
    opts: https.ServerOptions
    hostname?: string
    port: number
    /**
     * @deprecated Use <code>hostname<code> instead. This will be removed in version 2.
     */
    path?: string
  }[]

  publicDirs?: string[]
  routers?: KoaRouter[]
  sockets?: SocketIO.Server[]
  spaFileRelativePath?: string

  bodyParser?: boolean
  bodyParserEnableForm?: boolean
  bodyParserEnableJson?: boolean
  bodyParserEnableText?: boolean
  bodyParserEncoding?: string
  bodyParserFormLimit?: string
  bodyParserJsonLimit?: string
  bodyParserMultipart?: boolean
  bodyParserTextLimit?: string
  cacheControl?: string
  cacheFiles?: KoaStaticCache.Files
  cacheOptions?: KoaStaticCache.Options
  compress?: boolean
  keys?: string[]
  json?: boolean
  jsonPretty?: boolean
  jsonPrettyParam?: string
  jsonSpaces?: number
  log?: boolean
  session?: boolean
  sessionCookieKey?: string
  sessionHttpOnly?: boolean
  sessionMaxAge?: number | 'session'
  sessionOverwrite?: boolean
  sessionRenew?: boolean
  sessionRolling?: boolean
  sessionSigned?: boolean

  middleware?: Koa.Middleware[]
}
