import * as https from 'https'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as mongoose from 'mongoose'
import * as SocketIO from 'socket.io'

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
  cacheControl?: string
  compress?: boolean
  keys?: string[]
  json?: boolean
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
