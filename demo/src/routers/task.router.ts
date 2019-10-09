import Router from 'koa-router'
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
