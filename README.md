# meseret

configuration-based backbone for node.js servers.

## Features

__General:__

- [TypeScript](https://www.npmjs.com/package/typescript) everywhere.
- Configuration-based architecture (using TypeScript code).

__Server:__

- [Koa](https://www.npmjs.com/package/koa) server with preconfigured compression, static serving & caching, body parsing (JSON and forms), direct JSON response, console logging and session support.
- Support for more Koa middleware, and [koa-router](https://www.npmjs.com/package/koa-router) routes.
- Listening on multiple HTTP and/or HTTPS servers.
- Static-serving (hosting) multiple public directories.

__Database:__

- MongoDB connection and [Mongoose](https://www.npmjs.com/package/mongoose) models.
- A `ModelFactory` for type enabled Mongoose schema paths, methods and statics, -- bringing auto-complete to the data model.

__WebSocket:__

- [Socket.io](https://www.npmjs.com/package/socket.io) support.

## Installation

Inside a [Node.js](https://nodejs.org/) package, install meseret using:

Yarn:

```sh
yarn add meseret
```

or NPM:

```sh
npm install meseret --save
```

## Language

Your application code is recommended to be written in [TypeScript](https://www.npmjs.com/package/typescript) when you use this framework.

## A Simple `ServerApp`

A simple app that makes [Koa](https://www.npmjs.com/package/koa) listen on port 3000 looks like:

```ts
import { ServerApp } from 'meseret'

new ServerApp({
  name: 'App Name',
  httpServers: [{ port: 3000 }],
}).start() // returns a Promise
```

A new `ServerApp` receives a configuration object (called `IServerAppConfig`) as a parameter.
The `start()` method launches the server application and returns a `Promise`.

## `IServerAppConfig` Options

The `name` option is the only required of all the `IServerAppConfig` options. Below is a list of all the available options:

Option Name | Data Type | Description
--- | --- | ---
`bodyParser?` | `boolean` | Support for JSON and form request bodies? Defaults to true.
`cacheControl?` | `string` | Cache control to be used. Defaults to 'private'.
`compress?` | `boolean` | Compress responses? Defaults to true.
`httpServers?` | `{ path?: string, port: number }[]` | HTTP server configurations.
`httpsServers?` | `{ opts: https.ServerOptions, path?: string, port: number }[]` | HTTPS server configurations.
`json?` | `boolean` | Support direct JSON response parsing? Defaults to true.
`keys?` | `string[]` | Sets Koa `app.keys`.
`log?` | `boolean` | Log requests and responses? Defaults to true.
`middleware?` | `Koa.middleware[]` | More [Koa](https://www.npmjs.com/package/koa) middleware to use.
`models?` | `mongoose.Model<mongoose.Document>[]` | [Mongoose](https://www.npmjs.com/package/mongoose) models, optionally built using meseret's `ModelFactory`. Requires `IServerApp.mongoUris`.
`mongoUris?` | `string` | MongoDB connection URIs.
`name` | `string` | Name of the server application. It is required.
`publicDirs?` | `string[]` | Directory paths to serve statically.
`routers?` | `KoaRouter[]` | An array of [koa-router](https://www.npmjs.com/package/koa-router) routers used in the servers.
`session?` | `boolean` | Session support using cookies? Requires `IServerAppConfig.keys`. Defaults to true if some `IServerAppConfig.keys` are provided.
`sockets?` | `SocketIO.Server[]` | [Socket.io](https://www.npmjs.com/package/socket-io) servers used in the http servers.

## A Realistic Example

A small "task organization" application:

```ts
// src/main.ts

import { ServerApp } from 'meseret'
import { join } from 'path'

import { TasksModel } from './models/tasks.model'
import { TaskRouter } from './routers/task.router'

new ServerApp({
  name: 'Task Organizer',
  mongoUris: process.env['MONGO_URI'] || 'mongodb://localhost/task-organizer',
  httpServers: [{port: Number.parseInt(process.env['PORT']) || 3000}],
  publicDirs: [join(__dirname, '../../public/dist/')],
  models: [TasksModel],
  routers: [TaskRouter]
}).start()
  .then(() => console.log(`Starting 'Task Organizer'...`))
  .catch(err => console.error(`Launch problem: ${err}`))
```

It is recommended to use the `ModelFactory` from meseret for your mongoose data models. Although this method is optional and relatively verbose, it provides support for auto-completing mongoose models in IDEs (even deep down to the data-schema level).

```ts
// src/models/tasks.model

import { ModelFactory, Document, Model } from 'ServerApp'

export interface ITasksSchemaPaths { desc: string, done: boolean }
export interface ITasksSchemaMethods extends FunctionsType { tickToggle: () => Promise<boolean> }
export interface ITasksSchemaStatics extends FunctionsType { } // empty for now

const factory = new ModelFactory<ITasksSchemaPaths, ITasksSchemaMethods, ITasksSchemaStatics>({
  name: 'Tasks', // collection/model name
  paths: {
    desc: { type: String, required: true, trim: true }
    done: { type: Boolean, required: true, default: false }
  },
  methods: {
    tickToggle: async (): Promise<boolean> => {
      const task = factory.documentify(this) // for auto-complete support in the `this`
      task.done = !task.done
      await task.save()
      return Promise.resolve(task.done)
    }
  }
  statics: {
    // empty for now
    // `factory.modelify(this)` in a function is available for auto-complete support 
  }
})

export const TasksModel = factory.model
```

...or, you could use same old mongoose and loose auto-complete support for your database data in your IDEs.

Below is how you can create routers used in the `ServerApp` using [koa-router](https://www.npmjs.com/packages/koa-router). Nothing out of the ordinary here.

```ts
// src/routers/task.router

import * as Router from 'koa-router'
import { TasksModel } from '../models/tasks.model'

const TaskRouter = new Router({ prefix: '/api/task' })

// GET /api/task/:_id
TaskRouter.get('/:_id', async ctx => {
  ctx.body = await TasksModel.findById(ctx.params['_id'])
})

// ... more API definition

export { TaskRouter }
```

## Licence

Made with &hearts; in Addis Ababa.

[MIT License](LICENSE) &copy; 2017 Kaleab S. Melkie.
