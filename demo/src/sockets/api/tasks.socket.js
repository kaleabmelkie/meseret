"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sio = require("socket.io");
var tasks_service_1 = require("../../providers/api/tasks.service");
var TasksSocket = sio();
exports.TasksSocket = TasksSocket;
var io = TasksSocket.of('/api/task');
io.on('connection', function (socket) {
    console.log("Socket.IO connected at namespace '" + io.name + "'.");
    socket.on('count', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = socket).emit;
                    _c = ['count'];
                    return [4, tasks_service_1.TasksService.count()];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
    socket.on('list', function (limit, skip) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = socket).emit;
                    _c = ['list'];
                    return [4, tasks_service_1.TasksService.list(limit, skip)];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
    socket.on('get', function (_id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = socket).emit;
                    _c = ['get'];
                    return [4, tasks_service_1.TasksService.getById(_id)];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
    socket.on('add', function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = io).emit;
                    _c = ['change'];
                    return [4, tasks_service_1.TasksService.add(data)];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
    socket.on('edit', function (_id, data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = io).emit;
                    _c = ['change'];
                    return [4, tasks_service_1.TasksService.edit(_id, data)];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
    socket.on('remove', function (_id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = io).emit;
                    _c = ['change'];
                    return [4, tasks_service_1.TasksService.remove(_id)];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Muc29ja2V0LmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJkZW1vL3NyYy9zb2NrZXRzL2FwaS90YXNrcy5zb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQTBDQTs7O0FBMUNBLCtCQUFnQztBQUNoQyxtRUFBZ0U7QUFFaEUsSUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFzQ2hCLGtDQUFXO0FBckNwQixJQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBR3RDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUEsTUFBTTtJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUFzQyxFQUFFLENBQUMsSUFBSSxPQUFLLENBQUMsQ0FBQTtJQUcvRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTs7Ozs7b0JBQ2pCLEtBQUEsQ0FBQSxLQUFBLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQTswQkFBQyxPQUFPO29CQUFFLFdBQU0sNEJBQVksQ0FBQyxLQUFLLEVBQUUsRUFBQTs7b0JBQS9DLHdCQUFxQixTQUEwQixHQUFDLENBQUE7Ozs7U0FDakQsQ0FBQyxDQUFBO0lBR0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBTyxLQUFLLEVBQUUsSUFBSTs7Ozs7b0JBQ2xDLEtBQUEsQ0FBQSxLQUFBLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQTswQkFBQyxNQUFNO29CQUFFLFdBQU0sNEJBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFBOztvQkFBeEQsd0JBQW9CLFNBQW9DLEdBQUMsQ0FBQTs7OztTQUMxRCxDQUFDLENBQUE7SUFHRixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFNLEdBQUc7Ozs7O29CQUN4QixLQUFBLENBQUEsS0FBQSxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUE7MEJBQUMsS0FBSztvQkFBRSxXQUFNLDRCQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFBOztvQkFBbEQsd0JBQW1CLFNBQStCLEdBQUMsQ0FBQTs7OztTQUNwRCxDQUFDLENBQUE7SUFHRixNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFNLElBQUk7Ozs7O29CQUN6QixLQUFBLENBQUEsS0FBQSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUE7MEJBQUMsUUFBUTtvQkFBRSxXQUFNLDRCQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBOUMsd0JBQWtCLFNBQTRCLEdBQUMsQ0FBQTs7OztTQUNoRCxDQUFDLENBQUE7SUFHRixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFPLEdBQUcsRUFBRSxJQUFJOzs7OztvQkFDaEMsS0FBQSxDQUFBLEtBQUEsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFBOzBCQUFDLFFBQVE7b0JBQUUsV0FBTSw0QkFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUFwRCx3QkFBa0IsU0FBa0MsR0FBQyxDQUFBOzs7O1NBQ3RELENBQUMsQ0FBQTtJQUdGLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQU8sR0FBRzs7Ozs7b0JBQzVCLEtBQUEsQ0FBQSxLQUFBLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQTswQkFBQyxRQUFRO29CQUFFLFdBQU0sNEJBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUFoRCx3QkFBa0IsU0FBOEIsR0FBQyxDQUFBOzs7O1NBQ2xELENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=