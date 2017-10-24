import * as https from 'https'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as mongoose from 'mongoose'

export interface IServerAppConfig {
  name: string

  models?: mongoose.Model<mongoose.Document>[]

  mongoUris?: string

  httpsServers?: {
    opts: https.ServerOptions
    path?: string,
    port: number
  }[]

  httpServers?: {
    path?: string,
    port: number
  }[]

  publicDirs?: string[]

  middleware?: Koa.Middleware[]

  routers?: KoaRouter[]

  sockets?: SocketIO.Server[]

  cacheControl?: string

  compress: boolean

  bodyParser: boolean

  json: boolean

  log: boolean
}
