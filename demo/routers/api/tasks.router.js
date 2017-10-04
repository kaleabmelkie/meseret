"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var mongoose_1 = require("mongoose");
var task_model_1 = require("../../models/task.model");
// create a router
var TasksRouter = new Router({
    prefix: '/api/tasks'
});
exports.TasksRouter = TasksRouter;
// POST /api/tasks/add
TasksRouter.post('/add', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var task, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                task = new task_model_1.TaskModel(JSON.parse(ctx.request.body));
                return [4 /*yield*/, task.save()];
            case 1:
                _a.sent();
                ctx.body = {
                    success: true,
                    task_id: task['_id']
                };
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_1.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /api/tasks/get/:_id
TasksRouter.get('/get/:_id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var task, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.findOne({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
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
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_2.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /api/tasks/list/limit/:limit
TasksRouter.get('/list/limit/:limit', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var tasks, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.find({})
                        .limit(Number.parseInt(ctx.params['limit']))
                        .lean()
                        .exec()];
            case 1:
                tasks = _a.sent();
                ctx.body = {
                    success: true,
                    tasks: tasks
                };
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_3.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /api/tasks/list/limit/:limit/skip/:skip
TasksRouter.get('/list/limit/:limit/skip/:skip', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var tasks, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.find({})
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
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_4.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET /api/tasks/count
TasksRouter.get('/count', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var count, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.find({})
                        .count()
                        .exec()];
            case 1:
                count = _a.sent();
                ctx.body = {
                    success: true,
                    count: count
                };
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_5.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT /api/tasks/edit/:_id
TasksRouter.put('/edit/:_id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var task, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.findOneAndUpdate({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) }, JSON.parse(ctx.request.body))
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
                return [3 /*break*/, 3];
            case 2:
                e_6 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_6.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE /api/tasks/remove/:_id
TasksRouter.del('/remove/:_id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var task, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task_model_1.TaskModel.findOneAndRemove({ _id: mongoose_1.Types.ObjectId(ctx.params['_id']) })
                        .lean()
                        .exec()];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new Error('Task not found.');
                ctx.body = {
                    success: true
                };
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                ctx.body = {
                    success: false,
                    problem: e_7.message
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=tasks.router.js.map