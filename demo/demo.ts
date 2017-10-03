import { ServerApp } from '../src/main' // replace '../src/main' by 'meseret' for your app
import { join } from 'path'

import { TaskModel } from './models/task.model'
import { TasksRouter } from './routers/api/tasks.router'

// start server app
new ServerApp({
  // name of the app
  name: 'Task Organizer',

  // mongoose models
  models: [
    TaskModel
  ],

  // mongodb connection
  mongoUris: 'mongodb://localhost:27017/meseret-demo_task-organizer',

  // servers to create
  httpServers: [
    { path: 'localhost', port: 80 },
    { path: 'localhost', port: 1414 },
    { path: 'localhost', port: 3000 },
    { path: 'localhost', port: 8080 }
  ],

  // directories to host
  publicDirs: [
    join(__dirname, './public/')
  ],

  // extra Koa-middleware to use
  middleware: [],

  // Koa-routers (as middleware)
  routes: [
    TasksRouter.routes(), TasksRouter.allowedMethods()
  ]
}).start() // start the app (returns a promise)
  .then(() => { console.log('Task Organizer Starting...') })
  .catch((err: any) => { console.error(`Start Failed: ${ err }`) })
