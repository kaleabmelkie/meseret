import { ServerApp } from '../..'
import Router = require('koa-router')

const r1 = new Router()

r1.post('sample', async ctx => {
  console.log(ctx.request.body)
})

new ServerApp({
  name: 'Hi',
  httpServers: [{ port: 3000 }],

  routers: [r1]
})
  .start()
  .then(() => console.log('success'))
  .catch(console.error)
