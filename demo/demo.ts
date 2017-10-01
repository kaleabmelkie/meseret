import { join } from 'path'

import { ServerApp } from '../src/main'

import { SampleModel } from './models/SampleModel'

import { SampleRouter } from './routes/SampleRouter'

export const app = new ServerApp({
  name: 'Test',

  models: [
    SampleModel
  ],

  mongoUris: 'mongodb://localhost:27017/meseret-demo',

  httpServers: [
    { path: 'localhost', port: 1414 }
  ],

  publicDirs: [
    join(__dirname, './public/')
  ],

  middleware: [],

  routes: [
    SampleRouter.routes(), SampleRouter.allowedMethods()
  ]
})

app.start()
  .then(() => {
    console.log('Demo Test Passing')
  })
  .catch((err: any) => {
    console.error(`Demo Test Failed: ${ err }`)
  })
