import * as Router from 'koa-router'
import { Types } from 'mongoose'

import { TaskModel } from '../../models/task.model'

// create a router
const TasksRouter = new Router({
  prefix: '/api/tasks'
})

// POST /api/tasks/add
TasksRouter.post('/add', async ctx => {
  try {
    const task = new TaskModel(JSON.parse(ctx.request.body))
    await task.save()
    ctx.body = {
      success: true,
      task_id: task['_id']
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// GET /api/tasks/get/:_id
TasksRouter.get('/get/:_id', async ctx => {
  try {
    const task = await TaskModel.findOne({ _id: Types.ObjectId(ctx.params['_id']) })
      .lean()
      .exec()
    if (task) {
      ctx.body = {
        success: true,
        task: task
      }
    } else throw new Error('Task not found.')
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// GET /api/tasks/list/limit/:limit
TasksRouter.get('/list/limit/:limit', async ctx => {
  try {
    const tasks = await TaskModel.find({})
      .limit(Number.parseInt(ctx.params['limit']))
      .lean()
      .exec()
    ctx.body = {
      success: true,
      tasks: tasks
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// GET /api/tasks/list/limit/:limit/skip/:skip
TasksRouter.get('/list/limit/:limit/skip/:skip', async ctx => {
  try {
    const tasks = await TaskModel.find({})
      .skip(Number.parseInt(ctx.params['skip']))
      .limit(Number.parseInt(ctx.params['limit']))
      .lean()
      .exec()
    ctx.body = {
      success: true,
      tasks: tasks
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// GET /api/tasks/count
TasksRouter.get('/count', async ctx => {
  try {
    const count = await TaskModel.find({})
      .count()
      .exec()
    ctx.body = {
      success: true,
      count: count
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// PUT /api/tasks/edit/:_id
TasksRouter.put('/edit/:_id', async ctx => {
  try {
    const task = await TaskModel.findOneAndUpdate({ _id: Types.ObjectId(ctx.params['_id']) }, JSON.parse(ctx.request.body))
      .lean()
      .exec()
    if (!task) throw new Error('Task not found.')
    ctx.body = {
      success: true,
      task_id: task['_id']
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// DELETE /api/tasks/remove/:_id
TasksRouter.del('/remove/:_id', async ctx => {
  try {
    const task = await TaskModel.findOneAndRemove({ _id: Types.ObjectId(ctx.params['_id']) })
      .lean()
      .exec()
    if (!task) throw new Error('Task not found.')
    ctx.body = {
      success: true
    }
  } catch (e) {
    ctx.body = {
      success: false,
      problem: e.message
    }
  }
})

// export the router
export { TasksRouter }
