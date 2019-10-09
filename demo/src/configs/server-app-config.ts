import { IServerAppConfig } from 'meseret'

import { TaskModel } from '../models/task-model'
import { TaskRouter } from '../routers/task-router'

export const serverAppConfig: IServerAppConfig = {
  name: 'Task Organizer',

  mongoUris: process.env.MONGO_URI || 'mongodb://localhost/task-organizer',
  models: [TaskModel],

  routers: [TaskRouter],

  httpServers: [
    {
      hostname: process.env.HOSTNAME || 'localhost',
      port: Number(process.env.PORT) || 4000
    }
  ]
}
