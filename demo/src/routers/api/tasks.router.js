"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Router = require("koa-router");
var tasks_service_1 = require("../../providers/api/tasks.service");
var TasksRouter = new Router({
    prefix: '/api/tasks'
});
exports.TasksRouter = TasksRouter;
TasksRouter.post('/add', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.add(JSON.parse(ctx.request.body))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.get('/get/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.getById(String(ctx.params['_id']))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.get('/list/limit/:limit', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.list(Number.parseInt(ctx.params['limit']))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.get('/list/limit/:limit/skip/:skip', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.list(Number.parseInt(ctx.params['limit']), Number.parseInt(ctx.params['skip']))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.get('/count', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.count()];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.put('/edit/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.edit(String(ctx.params['_id']), JSON.parse(ctx.request.body))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
TasksRouter.del('/remove/:_id', function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx;
                return [4, tasks_service_1.TasksService.remove(String(ctx.params['_id']))];
            case 1:
                _a.body = _b.sent();
                return [2];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Mucm91dGVyLmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJkZW1vL3NyYy9yb3V0ZXJzL2FwaS90YXNrcy5yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQThDQTs7O0FBOUNBLG1DQUFvQztBQUVwQyxtRUFBZ0U7QUFHaEUsSUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDN0IsTUFBTSxFQUFFLFlBQVk7Q0FDckIsQ0FBQyxDQUFBO0FBc0NPLGtDQUFXO0FBbkNwQixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLEdBQUc7Ozs7O2dCQUNoQyxLQUFBLEdBQUcsQ0FBQTtnQkFBUSxXQUFNLDRCQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFBOztnQkFBL0QsR0FBSSxJQUFJLEdBQUcsU0FBb0QsQ0FBQTs7OztLQUNoRSxDQUFDLENBQUE7QUFHRixXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFNLEdBQUc7Ozs7O2dCQUNwQyxLQUFBLEdBQUcsQ0FBQTtnQkFBUSxXQUFNLDRCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQTs7Z0JBQWhFLEdBQUksSUFBSSxHQUFHLFNBQXFELENBQUE7Ozs7S0FDakUsQ0FBQyxDQUFBO0FBR0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxVQUFNLEdBQUc7Ozs7O2dCQUM3QyxLQUFBLEdBQUcsQ0FBQTtnQkFBUSxXQUFNLDRCQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUE7O2dCQUF4RSxHQUFJLElBQUksR0FBRyxTQUE2RCxDQUFBOzs7O0tBQ3pFLENBQUMsQ0FBQTtBQUdGLFdBQVcsQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsVUFBTSxHQUFHOzs7OztnQkFDeEQsS0FBQSxHQUFHLENBQUE7Z0JBQVEsV0FBTSw0QkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFBOztnQkFBN0csR0FBSSxJQUFJLEdBQUcsU0FBa0csQ0FBQTs7OztLQUM5RyxDQUFDLENBQUE7QUFHRixXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFNLEdBQUc7Ozs7O2dCQUNqQyxLQUFBLEdBQUcsQ0FBQTtnQkFBUSxXQUFNLDRCQUFZLENBQUMsS0FBSyxFQUFFLEVBQUE7O2dCQUFyQyxHQUFJLElBQUksR0FBRyxTQUEwQixDQUFBOzs7O0tBQ3RDLENBQUMsQ0FBQTtBQUdGLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQU0sR0FBRzs7Ozs7Z0JBQ3JDLEtBQUEsR0FBRyxDQUFBO2dCQUFRLFdBQU0sNEJBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQTs7Z0JBQTNGLEdBQUksSUFBSSxHQUFHLFNBQWdGLENBQUE7Ozs7S0FDNUYsQ0FBQyxDQUFBO0FBR0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBTSxHQUFHOzs7OztnQkFDdkMsS0FBQSxHQUFHLENBQUE7Z0JBQVEsV0FBTSw0QkFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUE7O2dCQUEvRCxHQUFJLElBQUksR0FBRyxTQUFvRCxDQUFBOzs7O0tBQ2hFLENBQUMsQ0FBQSJ9