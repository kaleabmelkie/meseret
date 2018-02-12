import * as https from 'https'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as mongoose from 'mongoose'

export interface IServerAppConfig {
  name: string

  models?: mongoose.Model<mongoose.Document>[]
  mongoUris?: string

  httpServers?: {
    path?: string,
    port: number
  }[]
  httpsServers?: {
    opts: https.ServerOptions
    path?: string,
    port: number
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
  bodyParserExtendTypes?: {
    json?: string[]
    form?: string[]
    text?: string[]
  }
  bodyParserFormLimit?: string
  bodyParserJsonLimit?: string
  bodyParserTextLimit?: string
  cacheControl?: string
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
