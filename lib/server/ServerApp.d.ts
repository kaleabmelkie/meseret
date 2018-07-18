/// <reference types="node" />
import gridFSStream from 'gridfs-stream'
import Koa from 'koa'
import mongoose from 'mongoose'
import net from 'net'
import { IServerAppConfig } from './IServerAppConfig'
export declare class ServerApp {
  readonly config: IServerAppConfig
  private _dbConn?
  private _grid?
  private _app
  private _servers
  constructor(config: IServerAppConfig, env?: string)
  readonly name: string
  readonly dbConn: mongoose.Connection | undefined
  readonly grid: gridFSStream.Grid | undefined
  readonly app: Koa
  readonly servers: net.Server[]
  env: string
  start(): Promise<void>
}
//# sourceMappingURL=ServerApp.d.ts.map
