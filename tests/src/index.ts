import { ServerApp } from '../..'
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
