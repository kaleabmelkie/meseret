import { ServerApp } from '../../src/main' // replace '../src/main' by 'meseret' for your app
import { join } from 'path'

import { TaskModel } from './models/task.model'
import { TasksRouter } from './routers/api/tasks.router'
import { TasksSocket } from './sockets/api/tasks.socket'

new ServerApp({
  name: 'Task Organizer',

  mongoUris: process.env['PROD_MONGODB'] || 'mongodb://localhost/task-organizer',
  httpServers: [{ port: Number.parseInt(String(process.env['PORT'])) || 80 }],

  publicDirs: [join(__dirname, '../public/dist/')],

  models: [TaskModel],
  routers: [TasksRouter],
  sockets: [TasksSocket],

  middleware: []
}).start()
  .then(() => { console.log(`'Task Organizer' is starting...`) })
  .catch((err: any) => { console.error(`Start failed: ${ err }`) })
