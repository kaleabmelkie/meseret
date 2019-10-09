import Router from 'koa-router'
import { TaskModel } from '../models/task-model'

export const TaskRouter = new Router({ prefix: '/api/task' })

// POST /api/task/new
TaskRouter.get('/new', async ctx => {
  ctx.body = await TaskModel.create(ctx.request.body)
})

// GET /api/task/all
TaskRouter.get('/all', async ctx => {
  ctx.body = await TaskModel.find({})
})

// GET /api/task/one/:_id
TaskRouter.get('/one/:_id', async ctx => {
  ctx.body = await TaskModel.findById(ctx.params._id)
})

// ... more route definitions
