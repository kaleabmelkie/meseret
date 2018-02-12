# meseret

Opinionated, feature-packed professional node.js server framework.

Meseret is a framework designed from the ground up to allow easy professional-grade node.js server configuration setup (code-wise).

Here are some of its features:

__Server Setup:__

- [Koa](https://www.npmjs.com/package/koa) server with preconfigured compression, static serving & caching, body parsing (JSON and forms), direct JSON response, console logging and session support.
- Support for more Koa middleware, and [koa-router](https://www.npmjs.com/package/koa-router) routes.
- Listening on multiple HTTP and/or HTTPS servers.
- Static-serving (hosting) multiple public directories.

__Database Models:__

- MongoDB connection and [Mongoose](https://www.npmjs.com/package/mongoose) models.
- A `ModelFactory` for type enabled Mongoose schema paths, methods and statics, -- bringing type-support (and IDE auto-complete) to the data schema.

__WebSocket Support:__

- [Socket.io](https://www.npmjs.com/package/socket.io) support.

__Single Page Application Support:__

- Serves any SPA file.
- Serves build files of SPA front-end projects, built using frameworks such as [Angular](https://angular.io) and [React](https://reactjs.org), even when in different packages.
- All 404 responses can be redirected to an SPA file, if specified.

__Coding Style:__

- [TypeScript](https://www.npmjs.com/package/typescript) everywhere.
- Configuration-based architecture (using TypeScript code).

## Installation

Inside a [Node.js](https://nodejs.org) package, install meseret using:

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
`bodyParser?` | `boolean` | Support form, JSON and text request body parsing? Defaults to `true`.
`bodyParserEnableForm?` | `boolean` | If `bodyParser` is enabled, enable form parsing? Defaults to `true`.
`bodyParserEnableJson?` | `boolean` | If `bodyParser` is enabled, enable JSON parsing? Defaults to `true`.
`bodyParserEnableText?` | `boolean` | If `bodyParser` is enabled, enable text parsing? Defaults to `true`.
`bodyParserEncoding?` | `string` | Encoding to use, if `bodyParser` is enabled. Defaults to `'utf-8'`.
`bodyParserExtendTypes?` | `{ json?: string[], form?: string[], text?: string[] }` | Custom extend types, if `bodyParser` is enabled.
`bodyParserFormLimit?` | `string` | Form size limit, if `bodyParser` is enabled. Defaults to `'56kb'`.
`bodyParserJsonLimit?` | `string` | JSON size limit, if `bodyParser` is enabled. Defaults to `'1mb'`.
`bodyParserTextLimit?` | `string` | Text size limit, if `bodyParser` is enabled. Defaults to `'1mb'`.
`cacheControl?` | `string` | Cache control to be used. Defaults to `'private'`.
`compress?` | `boolean` | Compress responses? Defaults to `true`.
`httpServers?` | `{ path?: string, port: number }[]` | HTTP server configurations.
`httpsServers?` | `{ opts: https.ServerOptions, path?: string, port: number }[]` | HTTPS server configurations.
`json?` | `boolean` | Support direct JSON response parsing? Defaults to `true`.
`jsonPretty?` | `boolean` | If `json` is enabled, send pretty responses? Default to `true` only if `app` is in `'development'` mode.
`jsonPrettyParam?` | `string` | Optional query-string param for pretty responses, if `json` is enabled.
`jsonSpaces?` | `number` | JSON spaces, if `json` is enabled and pretty. Defaults to `2`.
`keys?` | `string[]` | Sets Koa `app.keys`.
`log?` | `boolean` | Log requests and responses? Defaults to true.
`middleware?` | `Koa.middleware[]` | More [Koa](https://www.npmjs.com/package/koa) middleware to use.
`models?` | `mongoose.Model<mongoose.Document>[]` | [Mongoose](https://www.npmjs.com/package/mongoose) models, optionally built using meseret's `ModelFactory`. Requires `IServerApp.mongoUris`.
`mongoUris?` | `string` | MongoDB connection URIs.
`name` | `string` | Name of the server application. It is required.
`publicDirs?` | `string[]` | Directory paths to serve statically.
`routers?` | `KoaRouter[]` | An array of [koa-router](https://www.npmjs.com/package/koa-router) routers used in the servers.
`spaFileRelativePath?` | `string` | A relative path to an SPA file (e.g. an [Angular](https://angular.io) or [React](https://reactjs.org) build's `index.html` file). If this is unspecified (or `null`) the `ServerApp` will not have an SPA-like behavior of rerouting `404 Not Found` pages.
`session?` | `boolean` | Session support using cookies? Requires `IServerAppConfig.keys`. Defaults to `true` if some `IServerAppConfig.keys` are provided.
`sessionCookieKey?` | `string` | Session cookie key, if `session` is enabled. Defaults to the `name` of the `ServerApp` in "snake_case".
`sessionHttpOnly?` | `boolean` | If `session` is enabled, use it for HTTP only? Defaults to `true`.
`sessionMaxAge?` | `number` or `'session'` | Maximum valid age of the session in milliseconds, if `session` is enabled. Defaults to `86400000` (1 day). If it is set to the string value: `'session'`, the cookie expires when the session/browser is closed.
`sessionOverwrite?` | `boolean` | If `session` is enabled, allow overwriting? Defaults to `true`.
`sessionRenew?` | `boolean` | If `session` is enabled, renew it when nearing its expiry? Defaults to `false`.
`sessionRolling?` | `boolean` | If `session` is enabled, force a session identifier cookie to be set on every response? Defaults to `false`.
`sessionSigned?` | `boolean` | If `session` is enabled, should it be signed? Defaults to `true`.
`sockets?` | `SocketIO.Server[]` | [Socket.io](https://www.npmjs.com/package/socket-io) servers used in the http servers.

## A Realistic Example

A small "task organization" application:

```ts
// src/main.ts

import { ServerApp } from 'meseret'
import { join } from 'path'

import { TasksModel } from './models/tasks.model'
import { TaskRouter } from './routers/task.router'

const taskOrganizer = new ServerApp({
  name: 'Task Organizer',
  
  models: [TasksModel],
  mongoUris: process.env['MONGO_URI'] || 'mongodb://localhost/task-organizer',

  httpServers: [{ port: Number.parseInt(process.env['PORT']) || 3000 }],

  publicDirs: [join(process.cwd(), 'react', 'build')],
  routers: [TaskRouter],
  spaFileRelativePath: join('react', 'build', 'index.html')
})

taskOrganizer.start()
  .then(() => console.log(`Starting 'Task Organizer'...`))
  .catch(err => console.error(`Launch problem: ${err}`))
```

It is recommended to use the `ModelFactory` from meseret for your mongoose data models. Although this method is optional and relatively verbose, it provides support for auto-completing mongoose models in IDEs (even deep down to the data-schema level).

```ts
// src/models/tasks.model

import { ModelFactory, FunctionsType, Document, Model } from 'meseret'

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
      const task = factory.documentify(this) // for type-support of the `this` in this document's context
      task.done = !task.done
      await task.save()
      return Promise.resolve(task.done)
    }
  }
  statics: {
    // empty for now
    // `factory.modelify(this)` is available in functions here, for type-support of the `this` in this model's context
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
  ctx.body = await TasksModel.findById(String(ctx.params['_id']))
})

// ... more route definitions

export { TaskRouter }
```

To recap, the above router (`TaskRouter`) and the model (`TasksModel`) are included in the `ServerApp` (`taskOrganizer`). When the `taskOrganizer` is started, it:

1. connects to a MongoDB server at a specified `MONGO_URI` environment variable (or defaults to `mongodb://localhost/task-organizer`),
2. loads configured Mongoose database models (`TasksModel`),
3. launches an HTTP Koa server at a specified `PORT` environment variable (or defaults to `3000`) on `localhost`,
4. serves the static directory `./react/build/`,
5. serves an SPA from `./react/build/index.html`, and
6. handles requests that match definitions in `TaskRouter`.

Based on this and the default configuration, the started `ServerApp` **implicitly** takes care of:

- Koa Context body parsing (using [koa-bodyparser](https://npmjs.com/package/koa-bodyparser)),
- caching static requests (using [koa-static-cache](https://npmjs.com/package/koa-static-cache)),
- response GZip compression (using [koa-compress](https://npmjs.com/package/koa-compress)),
- JSON format responses (using [koa-json](https://npmjs.com/package/koa-json)), and
- logging every request and response (using [koa-logger](https://npmjs.com/package/koa-logger)).

In addition, a `keys` option can be provided to set Koa `ctx.keys` for signing cookies. If the `keys` are set, session support will be enabled automatically (using [koa-session](https://npmjs.com/package/koa-session)).

These features can be explicitly turned off (or modified) inside the `config` parameter of the `ServerApp` instance.

Besides the above built-in feature middleware packages, you may specify your own Koa `middleware` in the `config` to be used for each HTTP and/or HTTPS requests. You can also find the original `Koa` application instance using `taskOrganizer.app`, among many other variables.

Whew!
 
## Licence

Made with &hearts; in Addis Ababa.

[MIT License](LICENSE) &copy; 2017-2018 Kaleab S. Melkie.
