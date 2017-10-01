import * as Router from 'koa-router'

import { SampleModel } from '../models/SampleModel'

const router = new Router({
  prefix: '/demo'
})

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello, world!'
  ctx.body += `\nThere are ${ (await SampleModel.find()).length } documents modeled as 'Sample'`
})

export const SampleRouter = router
