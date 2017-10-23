import * as Router from 'koa-router'

import { TasksService } from '../../providers/api/tasks.service'

// create a router
const TasksRouter = new Router({
  prefix: '/api/tasks'
})

// POST /api/tasks/add
TasksRouter.post('/add', async ctx => {
  ctx.body = await TasksService.add(JSON.parse(ctx.request.body))
})

// GET /api/tasks/get/:_id
TasksRouter.get('/get/:_id', async ctx => {
  ctx.body = await TasksService.getById(String(ctx.params['_id']))
})

// GET /api/tasks/list/limit/:limit
TasksRouter.get('/list/limit/:limit', async ctx => {
  ctx.body = await TasksService.list(Number.parseInt(ctx.params['limit']))
})

// GET /api/tasks/list/limit/:limit/skip/:skip
TasksRouter.get('/list/limit/:limit/skip/:skip', async ctx => {
  ctx.body = await TasksService.list(Number.parseInt(ctx.params['limit']), Number.parseInt(ctx.params['skip']))
})

// GET /api/tasks/count
TasksRouter.get('/count', async ctx => {
  ctx.body = await TasksService.count()
})

// PUT /api/tasks/edit/:_id
TasksRouter.put('/edit/:_id', async ctx => {
  ctx.body = await TasksService.edit(String(ctx.params['_id']), JSON.parse(ctx.request.body))
})

// DELETE /api/tasks/remove/:_id
TasksRouter.del('/remove/:_id', async ctx => {
  ctx.body = await TasksService.remove(String(ctx.params['_id']))
})

// export the router
export { TasksRouter }
