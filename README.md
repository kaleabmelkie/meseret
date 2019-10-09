# meseret

[![meseret][npm-badge]][npm]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Opinionated, feature-packed professional node.js server framework.

Meseret is a framework designed from the ground up to allow easy professional-grade node.js server configuration setup (code-wise).

Here are some of its features:

**Server Setup:**

- [Koa](https://www.npmjs.com/package/koa) server with preconfigured compression, static serving & caching, body parsing (JSON and forms), direct JSON response, console logging and session support.
- Support for more Koa middleware, and [koa-router](https://www.npmjs.com/package/koa-router) routes.
- Listening on multiple HTTP and/or HTTPS servers.
- Static-serving (hosting) multiple public directories.

**Database Models:**

- MongoDB connection and [Mongoose](https://www.npmjs.com/package/mongoose) models.
- A `ModelFactory` for type enabled Mongoose schema paths, methods and statics: bringing static-type support (and IDE auto-complete) to the data schema.
- GridFS support to store small and large files in MongoDB.

**WebSocket Support:**

- [Socket.io](https://www.npmjs.com/package/socket.io) integration support (connects `SocketIO.Server`s to the `ServerApp`).

**Single Page Application Support:**

- Serves any SPA file.
- Serves build files of SPA front-end projects, built using frameworks such as [Angular](https://angular.io) and [React](https://reactjs.org), even when in different packages.
- All 404 responses can be redirected to an SPA file, if specified.

**Coding Style:**

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
  httpServers: [{ port: 3000 }]
}).start() // returns a Promise
```

A new `ServerApp` receives a configuration object (called `IServerAppConfig`) as a parameter.
The `start()` method launches the server application on `http://localhost:3000`; it returns a `Promise`.

## A Realistic Example

We are now going to create the back-end of a small "task organization" application using meseret. Its main source file looks something like:

```ts
// src/app.ts

import { ServerApp } from 'meseret'
import { join } from 'path'

import { TasksModel } from './models/tasks.model'
import { TaskRouter } from './routers/task.router'

const taskOrganizer = new ServerApp({
  name: 'Task Organizer',

  mongoUris: process.env.MONGO_URI || 'mongodb://localhost/task-organizer',
  models: [TasksModel],

  publicDirs: [join(process.cwd(), 'react', 'build')],
  spaFileRelativePath: join('react', 'build', 'index.html'),

  routers: [TaskRouter],

  httpServers: [
    {
      hostname: process.env.HOSTNAME || '127.0.0.1',
      port: Number(process.env.PORT) || 3000
    }
  ]
})

taskOrganizer.start().catch(console.error)

export { taskOrganizer }

// optionally, you may...
export const dbConn = () => taskOrganizer.dbConn // to access the mongoose connection
export const gfs = () => taskOrganizer.grid // to access GridFS from other files
export const app = () => taskOrganizer.app // the Koa application instance
```

In this code, we imported a `ServerApp` from meseret and created an instance (`taskOrganizer`) by passing it a (`config: IServerAppConfig`) as its first parameter. Then we called `start()` on `taskOrganizer` to launch our application based on the `config` we provided it. This configuration we passed to the `ServerApp` is the most important piece of code here. The job the `ServerApp` performs when `start()` is called will be discussed later in detail at the end of this example project.

Now we are moving our attention to the mongoose database model that's imported and used in `taskOrganizer` (the `TasksModel`). When it comes to models, it is recommended that we use the `ModelFactory` from meseret. Although this method is optional and relatively verbose when compared to pure mongoose, it provides support for static-typing and auto-completing mongoose models in IDEs, even deep down to the data schema level. The code for `TasksModel` looks something like:

```ts
// src/models/tasks.model

import { ModelFactory, FunctionsType } from 'meseret'

export interface ITasksSchemaPaths {
  desc: string
  done: boolean
}

export interface ITasksSchemaMethods extends FunctionsType {
  tickToggle: () => Promise<boolean>
}

export interface ITasksSchemaStatics extends FunctionsType {} // empty for now

const factory = new ModelFactory<
  ITasksSchemaPaths,
  ITasksSchemaMethods,
  ITasksSchemaStatics
>({
  name: 'tasks', // collection/model name

  paths: {
    desc: { type: String, required: true, trim: true },
    done: { type: Boolean, required: true, default: false }
  },

  methods: {
    async tickToggle(): Promise<boolean> {
      const task = factory.documentify(this) // for static-type support of the `this` in this document's context
      task.done = !task.done
      await task.save()
      return task.done
    }
  },

  statics: {
    // empty for now
    // `factory.modelify(this)` is available in functions here, for static-type support of the `this` in this model's context
  }
})

// optionally, you may manually also access the built schema
export const TasksSchema = factory.schema

// finally, create & export the model
export const TasksModel = factory.model
TasksModel.collection.createIndex({ '$**': 'text' }).catch(console.error)
```

In the code above, the `ModelFactory` is imported from meseret and used to create an instance called `factory`. It receives three types to support type-checks and auto-complete of the data schema here and elsewhere in the project. These types represent the mongoose schema's paths, methods and statics, respectively. In the code above, these types are interfaces, namely `ITasksSchemaPaths`, `ITasksSchemaMethods` and `ITasksSchemaStatics` in order.

As you can see above the methods' and statics' type interfaces extend `FunctionsType` from meseret. This is essential to guarantee that the mongoose method and static functions defined in the `factory` have valid signatures as their interface/type definitions above.

However, meseret does not currently support this guaranteed match between the type definition and actual implementation for schema paths (it's in the works... shh!). Until this gets support, developers should manually check if their path interfaces match their `paths` definition.

_TIP: If you have an empty `paths`, `methods` or `statics` you may pass just `{}` to the `ModelFactory`. Therefore, our code above could have eliminated the `ITasksSchemaStatics` and the `factory` would have been defined as_:

```ts
const factory = new ModelFactory<ITasksSchemaPaths, ITasksSchemaMethods, {}>({
```

Just like the `ServerApp`, meseret's `ModelFactory` receives an object (this time, whose type is `IModelFactoryConfig`). This object configures the `name` of the mongoose model (which is required) and, optionally, the paths, methods and statics for the model.

Inside the mongoose method and static function definitions, the `this` keyword represents the document and model, respectively. Meseret adds static-type support to these `this`s using `factory.documentify(this)` and `factory.modelify(this)`, respectively.

Finally, we see the `factory.model` code at the very last line. The `ModelFactory`'s `.model` is a getter that generates a normal mongoose model based on the `IModelFactoryConfig` provided earlier. It is to be used elsewhere in our project, just like a normal mongoose model would have been.

Moving on...

Below is how we create the [koa-router](https://www.npmjs.com/packages/koa-router)s used in the `ServerApp`. Nothing out of the ordinary here.

```ts
// src/routers/task.router

import * as Router from 'koa-router'
import { TasksModel } from '../models/tasks.model'

const TaskRouter = new Router({ prefix: '/api/task' })

// POST /api/task/new
TaskRouter.get('/new', async ctx => {
  ctx.body = await TasksModel.create(ctx.request.body)
})

// GET /api/task/all
TaskRouter.get('/all', async ctx => {
  ctx.body = await TasksModel.find({})
})

// GET /api/task/one/:_id
TaskRouter.get('/one/:_id', async ctx => {
  ctx.body = await TasksModel.findById(ctx.params._id)
})

// ... more route definitions

export { TaskRouter }
```

To recap, the above router (`TaskRouter`) and the model (`TasksModel`) are included in the `ServerApp` (`taskOrganizer`). When the `taskOrganizer` is started, it:

1.  connects to a MongoDB server at a specified `MONGO_URI` environment variable (or defaults to `mongodb://localhost/task-organizer`),
2.  loads configured Mongoose database models (`TasksModel`),
3.  launches an HTTP Koa server at a specified `HOSTNAME` and `PORT` environment variables (or defaults to `http://127.0.0.1:3000`),
4.  serves the static directory `./react/build/`,
5.  serves an SPA from `./react/build/index.html`, and
6.  handles requests that match definitions in `TaskRouter`.

Based on this and the default configuration, the started `ServerApp` **implicitly** takes care of:

- Koa Context body parsing (using [koa-body](https://www.npmjs.com/package/koa-body)),
- caching static requests (using [koa-static-cache](https://www.npmjs.com/package/koa-static-cache)),
- response GZip compression (using [koa-compress](https://www.npmjs.com/package/koa-compress)),
- JSON format responses (using [koa-json](https://www.npmjs.com/package/koa-json)),
- logging every request and response (using [koa-logger](https://www.npmjs.com/package/koa-logger)), and
- creating a GridFSStream instance based on the MongoDB connection (using [gridfs-stream](https://www.npmjs.com/package/gridfs-stream)).

In addition, a `keys` option can be provided to set Koa `ctx.keys` for signing cookies. If the `keys` are set, session support will be enabled automatically (using [koa-session](https://npmjs.com/package/koa-session)).

These features can be explicitly turned off (or modified) inside the `config` parameter of the `ServerApp` instance.

Besides the above built-in feature middleware packages, you may specify your own Koa `middleware` in the `config` to be used for each HTTP and/or HTTPS requests. You can also find the original `Koa` application instance using `taskOrganizer.app`, among many other variables.

Whew!

## API

### `IServerAppConfig` Options

The `name` option is the only required of all the `IServerAppConfig` options. Below is a list of all the available options:

| Option Name                 | Data Type                                                          | Description                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bodyParser?`               | `boolean`                                                          | Support form, JSON and text request body parsing? Defaults to `true`.                                                                                                                                                                                       |
| `bodyParserEnableForm?`     | `boolean`                                                          | If `bodyParser` is enabled, enable form parsing? Defaults to `true`.                                                                                                                                                                                        |
| `bodyParserEnableJson?`     | `boolean`                                                          | If `bodyParser` is enabled, enable JSON parsing? Defaults to `true`.                                                                                                                                                                                        |
| `bodyParserEnableText?`     | `boolean`                                                          | If `bodyParser` is enabled, enable text parsing? Defaults to `true`.                                                                                                                                                                                        |
| `bodyParserEncoding?`       | `string`                                                           | Encoding to use, if `bodyParser` is enabled. Defaults to `'utf-8'`.                                                                                                                                                                                         |
| `bodyParserFormLimit?`      | `string`                                                           | Form size limit, if `bodyParser` is enabled. Defaults to `'56kb'`.                                                                                                                                                                                          |
| `bodyParserJsonLimit?`      | `string`                                                           | JSON size limit, if `bodyParser` is enabled. Defaults to `'1mb'`.                                                                                                                                                                                           |
| `bodyParserMultipart?`      | `boolean`                                                          | If `bodyParser` is enabled, enable `multipart/form-data` parsing to support standard file upload? Defaults to `false`.                                                                                                                                      |
| `bodyParserTextLimit?`      | `string`                                                           | Text size limit, if `bodyParser` is enabled. Defaults to `'1mb'`.                                                                                                                                                                                           |
| `cacheControl?`             | `string`                                                           | Cache control to be used. Defaults to `'private'`.                                                                                                                                                                                                          |
| `cacheFiles`                | `{ [path: string]: staticCache.Options }`                          | Set static cache options per file path. Optional.                                                                                                                                                                                                           |
| `cacheOptions`              | `staticCache.Options`                                              | Set global static cache options. Optional. May override `IServerAppConfig.cacheOptions.cacheControl` overrides `IServerAppConfig.cacheControl`.                                                                                                             |
| `compress?`                 | `boolean`                                                          | Compress responses? Defaults to `true`.                                                                                                                                                                                                                     |
| `httpServers?`              | `{ hostname?: string, port: number }[]`                            | HTTP server configurations.                                                                                                                                                                                                                                 |
| `httpsServers?`             | `{ opts: https.ServerOptions, hostname?: string, port: number }[]` | HTTPS server configurations.                                                                                                                                                                                                                                |
| `json?`                     | `boolean`                                                          | Support direct JSON response parsing? Defaults to `true`.                                                                                                                                                                                                   |
| `jsonPretty?`               | `boolean`                                                          | If `json` is enabled, send pretty responses? Default to `true` only if `app` is in `'development'` mode.                                                                                                                                                    |
| `jsonPrettyParam?`          | `string`                                                           | Optional query-string param for pretty responses, if `json` is enabled.                                                                                                                                                                                     |
| `jsonSpaces?`               | `number`                                                           | JSON spaces, if `json` is enabled and pretty. Defaults to `2`.                                                                                                                                                                                              |
| `keys?`                     | `string[]`                                                         | Sets Koa `app.keys`.                                                                                                                                                                                                                                        |
| `log?`                      | `boolean`                                                          | Log requests and responses? Defaults to true.                                                                                                                                                                                                               |
| `middleware?`               | `Koa.middleware[]`                                                 | More [Koa](https://www.npmjs.com/package/koa) middleware to use.                                                                                                                                                                                            |
| `models?`                   | `mongoose.Model<mongoose.Document>[]`                              | [Mongoose](https://www.npmjs.com/package/mongoose) models, optionally built using meseret's `ModelFactory`. Requires `IServerApp.mongoUris`.                                                                                                                |
| `mongooseConnectionOptions` | `mongoose.ConnectionOptions`                                       | Set moongoose connection options. Optional.                                                                                                                                                                                                                 |
| `mongoUris?`                | `string`                                                           | MongoDB connection URIs.                                                                                                                                                                                                                                    |
| `name`                      | `string`                                                           | Name of the server application. It is required.                                                                                                                                                                                                             |
| `publicDirs?`               | `string[]`                                                         | Directory paths to serve statically.                                                                                                                                                                                                                        |
| `routers?`                  | `KoaRouter[]`                                                      | An array of [koa-router](https://www.npmjs.com/package/koa-router) routers used in the servers.                                                                                                                                                             |
| `spaFileRelativePath?`      | `string`                                                           | A relative path to an SPA file (e.g. an [Angular](https://angular.io) or [React](https://reactjs.org) build's `index.html` file). If this is unspecified (or `null`) the `ServerApp` will not have an SPA-like behavior of rerouting `404 Not Found` pages. |
| `session?`                  | `boolean`                                                          | Session support using cookies? Requires `IServerAppConfig.keys`. Defaults to `true` if some `IServerAppConfig.keys` are provided.                                                                                                                           |
| `sessionCookieKey?`         | `string`                                                           | Session cookie key, if `session` is enabled. Defaults to the `name` of the `ServerApp` in "snake_case".                                                                                                                                                     |
| `sessionHttpOnly?`          | `boolean`                                                          | If `session` is enabled, use it for HTTP only? Defaults to `true`.                                                                                                                                                                                          |
| `sessionMaxAge?`            | `number` or `'session'`                                            | Maximum valid age of the session in milliseconds, if `session` is enabled. Defaults to `86400000` (1 day). If it is set to the string value: `'session'`, the cookie expires when the session/browser is closed.                                            |
| `sessionOverwrite?`         | `boolean`                                                          | If `session` is enabled, allow overwriting? Defaults to `true`.                                                                                                                                                                                             |
| `sessionRenew?`             | `boolean`                                                          | If `session` is enabled, renew it when nearing its expiry? Defaults to `false`.                                                                                                                                                                             |
| `sessionRolling?`           | `boolean`                                                          | If `session` is enabled, force a session identifier cookie to be set on every response? Defaults to `false`.                                                                                                                                                |
| `sessionSigned?`            | `boolean`                                                          | If `session` is enabled, should it be signed? Defaults to `true`.                                                                                                                                                                                           |
| `sockets?`                  | `SocketIO.Server[]`                                                | [Socket.io](https://www.npmjs.com/package/socket-io) servers used in the http servers.                                                                                                                                                                      |

P.S. more API documentation is coming soon.

## Licence

Made with &hearts; in Addis Ababa.

[MIT License](LICENSE) &copy; 2017-2018 [Kaleab S. Melkie](https://kaleab.kelaltech.com).

[npm-badge]: https://img.shields.io/npm/v/meseret.png?style=flat-square
[npm]: https://www.npmjs.org/package/meseret
