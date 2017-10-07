"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Router = require("koa-router");
var mongoose_1 = require("mongoose");
var task_model_1 = require("../../models/task.model");
var TasksRouter = new Router({
    prefix: '/api/tasks'
});
exports.TasksRouter = TasksRouter;
TasksRouter.post('/add', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var task, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                task = new task_model_1.TaskModel(JSON.parse(ctx.request.body));
                return [4, task.save()];
            case 1:
                _a.sent();
                ctx.body = {
                    success: true,
                    task_id: task['_id']
                };
                return [3, 3];
            case 2:
                e_1 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_1.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.get('/get/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var task, e_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.findOne({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
                        .lean()
                        .exec()];
            case 1:
                task = _a.sent();
                if (task) {
                    ctx.body = {
                        success: true,
                        task: task
                    };
                }
                else
                    throw new Error('Task not found.');
                return [3, 3];
            case 2:
                e_2 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_2.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.get('/list/limit/:limit', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var tasks, e_3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.find({})
                        .limit(Number.parseInt(ctx.params['limit']))
                        .lean()
                        .exec()];
            case 1:
                tasks = _a.sent();
                ctx.body = {
                    success: true,
                    tasks: tasks
                };
                return [3, 3];
            case 2:
                e_3 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_3.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.get('/list/limit/:limit/skip/:skip', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var tasks, e_4;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.find({})
                        .skip(Number.parseInt(ctx.params['skip']))
                        .limit(Number.parseInt(ctx.params['limit']))
                        .lean()
                        .exec()];
            case 1:
                tasks = _a.sent();
                ctx.body = {
                    success: true,
                    tasks: tasks
                };
                return [3, 3];
            case 2:
                e_4 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_4.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.get('/count', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var count, e_5;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.find({})
                        .count()
                        .exec()];
            case 1:
                count = _a.sent();
                ctx.body = {
                    success: true,
                    count: count
                };
                return [3, 3];
            case 2:
                e_5 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_5.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.put('/edit/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var task, e_6;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.findOneAndUpdate({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) }, JSON.parse(ctx.request.body))
                        .lean()
                        .exec()];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new Error('Task not found.');
                ctx.body = {
                    success: true,
                    task_id: task['_id']
                };
                return [3, 3];
            case 2:
                e_6 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_6.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
TasksRouter.del('/remove/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var task, e_7;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, task_model_1.TaskModel.findOneAndRemove({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
                        .lean()
                        .exec()];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new Error('Task not found.');
                ctx.body = {
                    success: true
                };
                return [3, 3];
            case 2:
                e_7 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_7.message
                };
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Mucm91dGVyLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJkZW1vL3JvdXRlcnMvYXBpL3Rhc2tzLnJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBK0lBOzs7QUEvSUEsbUNBQW9DO0FBQ3BDLHFDQUFnQztBQUVoQyxzREFBbUQ7QUFHbkQsSUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDN0IsTUFBTSxFQUFFLFlBQVk7Q0FDckIsQ0FBQyxDQUFBO0FBc0lPLGtDQUFXO0FBbklwQixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLEdBQUc7Ozs7OztnQkFFeEIsSUFBSSxHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDeEQsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUFqQixTQUFpQixDQUFBO2dCQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHO29CQUNULE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNyQixDQUFBOzs7O2dCQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFLEdBQUMsQ0FBQyxPQUFPO2lCQUNuQixDQUFBOzs7OztLQUVKLENBQUMsQ0FBQTtBQUdGLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQU0sR0FBRzs7Ozs7O2dCQUVyQixXQUFNLHNCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLGdCQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO3lCQUM3RSxJQUFJLEVBQUU7eUJBQ04sSUFBSSxFQUFFLEVB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