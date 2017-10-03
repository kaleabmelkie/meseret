"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const mongoose_1 = require("mongoose");
const task_model_1 = require("../../models/task.model");
// create a router
const TasksRouter = new Router({
    prefix: '/api/tasks'
});
exports.TasksRouter = TasksRouter;
// POST /api/tasks/add
TasksRouter.post('/add', async (ctx) => {
    try {
        const task = new task_model_1.TaskModel(JSON.parse(ctx.request.body));
        await task.save();
        ctx.body = {
            success: true,
            task_id: task['_id']
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// GET /api/tasks/get/:_id
TasksRouter.get('/get/:_id', async (ctx) => {
    try {
        const task = await task_model_1.TaskModel.findOne({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
            .lean()
            .exec();
        if (task) {
            ctx.body = {
                success: true,
                task: task
            };
        }
        else
            throw new Error('Task not found.');
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// GET /api/tasks/list/limit/:limit
TasksRouter.get('/list/limit/:limit', async (ctx) => {
    try {
        const tasks = await task_model_1.TaskModel.find({})
            .limit(Number.parseInt(ctx.params['limit']))
            .lean()
            .exec();
        ctx.body = {
            success: true,
            tasks: tasks
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// GET /api/tasks/list/limit/:limit/skip/:skip
TasksRouter.get('/list/limit/:limit/skip/:skip', async (ctx) => {
    try {
        const tasks = await task_model_1.TaskModel.find({})
            .skip(Number.parseInt(ctx.params['skip']))
            .limit(Number.parseInt(ctx.params['limit']))
            .lean()
            .exec();
        ctx.body = {
            success: true,
            tasks: tasks
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// GET /api/tasks/count
TasksRouter.get('/count', async (ctx) => {
    try {
        const count = await task_model_1.TaskModel.find({})
            .count()
            .exec();
        ctx.body = {
            success: true,
            count: count
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// PUT /api/tasks/edit/:_id
TasksRouter.put('/edit/:_id', async (ctx) => {
    try {
        const task = await task_model_1.TaskModel.findOneAndUpdate({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) }, JSON.parse(ctx.request.body))
            .lean()
            .exec();
        if (!task)
            throw new Error('Task not found.');
        ctx.body = {
            success: true,
            task_id: task['_id']
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
// DELETE /api/tasks/remove/:_id
TasksRouter.del('/remove/:_id', async (ctx) => {
    try {
        const task = await task_model_1.TaskModel.findOneAndRemove({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
            .lean()
            .exec();
        if (!task)
            throw new Error('Task not found.');
        ctx.body = {
            success: true
        };
    }
    catch (e) {
        ctx.body = {
            success: false,
            problem: e.message
        };
    }
});
