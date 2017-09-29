import * as https from 'https'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as mongoose from 'mongoose'

export interface ServerAppConfig {
  name: string

  models?: mongoose.Model<mongoose.Document>[]

  mongoUris?: string

  httpsServers?: {
    opts: https.ServerOptions
    path: string,
    port: number
  }[]

  httpServers?: {
    path: string,
    port: number
  }[]

  publicDirs?: string[]

  middleware?: Koa.Middleware[]

  routes?: KoaRouter.IMiddleware[]
}
