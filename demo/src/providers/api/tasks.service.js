"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var task_model_1 = require("../../models/task.model");
var TasksService = (function () {
    function TasksService() {
    }
    TasksService.add = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var task, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        task = new task_model_1.TaskModel(data);
                        return [4, task.save()];
                    case 1:
                        _a.sent();
                        return [2, {
                                success: true,
                                task_id: task['_id']
                            }];
                    case 2:
                        e_1 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_1.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    TasksService.getById = function (_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var task, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, task_model_1.TaskModel.findById(_id)
                                .lean(true)];
                    case 1:
                        task = _a.sent();
                        if (task) {
                            return [2, {
                                    success: true,
                                    task: task
                                }];
                        }
                        else
                            throw new Error('Task not found.');
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_2.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    TasksService.list = function (limit, skip) {
        if (skip === void 0) { skip = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tasks, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, task_model_1.TaskModel.find({})
                                .skip(skip)
                                .limit(limit)
                                .lean(true)];
                    case 1:
                        tasks = _a.sent();
                        return [2, {
                                success: true,
                                tasks: tasks
                            }];
                    case 2:
                        e_3 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_3.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    TasksService.count = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var count, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, task_model_1.TaskModel.find({})
                                .count()];
                    case 1:
                        count = _a.sent();
                        return [2, {
                                success: true,
                                count: count
                            }];
                    case 2:
                        e_4 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_4.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    TasksService.edit = function (_id, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var task, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, task_model_1.TaskModel.findByIdAndUpdate(_id, data)
                                .lean(true)];
                    case 1:
                        task = _a.sent();
                        if (!task)
                            throw new Error('Task not found.');
                        return [2, {
                                success: true,
                                task_id: task['_id']
                            }];
                    case 2:
                        e_5 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_5.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    TasksService.remove = function (_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var task, e_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, task_model_1.TaskModel.findByIdAndRemove(_id)
                                .lean(true)];
                    case 1:
                        task = _a.sent();
                        if (!task)
                            throw new Error('Task not found.');
                        return [2, {
                                success: true
                            }];
                    case 2:
                        e_6 = _a.sent();
                        return [2, {
                                success: false,
                                problem: e_6.message
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    return TasksService;
}());
exports.TasksService = TasksService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Db2RlL0BrYWxlYWIudGVjaC9tZXNlcmV0LyIsInNvdXJjZXMiOlsiZGVtby9zcmMvcHJvdmlkZXJzL2FwaS90YXNrcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNEQUFtRDtBQUVuRDtJQUFBO0lBdUdBLENBQUM7SUFyR2MsZ0JBQUcsR0FBaEIsVUFBa0IsSUFBUzs7Ozs7Ozt3QkFFakIsSUFBSSxHQUFHLElBQUksc0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFDaEMsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUFqQixTQUFpQixDQUFBO3dCQUNqQixXQUFPO2dDQUNMLE9BQU8sRUFBRSxJQUFJO2dDQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDOzZCQUNyQixFQUFBOzs7d0JBRUQsV0FBTztnQ0FDTCxPQUFPLEVBQUUsS0FBSztnQ0FDZCxPQUFPLEVBQUUsR0FBQyxDQUFDLE9BQU87NkJBQ25CLEVBQUE7Ozs7O0tBRUo7SUFFWSxvQkFBTyxHQUFwQixVQUFzQixHQUFXOzs7Ozs7O3dCQUVoQixXQUFNLHNCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztpQ0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFEUCxJQUFJLEdBQUcsU0FDQTt3QkFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNULE1BQU0sS0FBQztvQ0FDTCxPQUFPLEVBQUUsSUFBSTtvQ0FDYixJQUFJLEVBQUUsSUFBSTtpQ0FDWCxFQUFBO3dCQUNILENBQUM7d0JBQUMsSUFBSTs0QkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7Ozs7d0JBRXpDLFdBQU87Z0NBQ0wsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsT0FBTyxFQUFFLEdBQUMsQ0FBQyxPQUFPOzZCQUNuQixFQUFBOzs7OztLQUVKO0lBRVksaUJBQUksR0FBakIsVUFBbUIsS0FBYSxFQUFFLElBQVE7UUFBUixxQkFBQSxFQUFBLFFBQVE7Ozs7Ozs7d0JBRXhCLFdBQU0sc0JBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lDQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lDQUNWLEtBQUssQ0FBQyxLQUFLLENBQUM7aUNBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFIUCxLQUFLLEdBQUcsU0FHRDt3QkFDYixXQUFPO2dDQUNMLE9BQU8sRUFBRSxJQUFJO2dDQUNiLEtBQUssRUFBRSxLQUFLOzZCQUNiLEVBQUE7Ozt3QkFFRCxXQUFPO2dDQUNMLE9BQU8sRUFBRSxLQUFLO2dDQUNkLE9BQU8sRUFBRSxHQUFDLENBQUMsT0FBTzs2QkFDbkIsRUFBQTs7Ozs7S0FFSjtJQUVZLGtCQUFLLEdBQWxCOzs7Ozs7O3dCQUVrQixXQUFNLHNCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQ0FDbkMsS0FBSyxFQUFFLEVBQUE7O3dCQURKLEtBQUssR0FBRyxTQUNKO3dCQUNWLFdBQU87Z0NBQ0wsT0FBTyxFQUFFLElBQUk7Z0NBQ2IsS0FBSyxFQUFFLEtBQUs7NkJBQ2IsRUFBQTs7O3dCQUVELFdBQU87Z0NBQ0wsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsT0FBTyxFQUFFLEdBQUMsQ0FBQyxPQUFPOzZCQUNuQixFQUFBOzs7OztLQUVKO0lBRVksaUJBQUksR0FBakIsVUFBbUIsR0FBVyxFQUFFLElBQVM7Ozs7Ozs7d0JBRTFCLFdBQU0sc0JBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2lDQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQURULElBQUksR0FBRyxTQUNFO3dCQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTt3QkFDN0MsV0FBTztnQ0FDTCxPQUFPLEVBQUUsSUFBSTtnQ0FDYixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs2QkFDckIsRUFBQTs7O3dCQUVELFdBQU87Z0NBQ0wsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsT0FBTyxFQUFFLEdBQUMsQ0FBQyxPQUFPOzZCQUNuQixFQUFBOzs7OztLQUVKO0lBRVksbUJBQU0sR0FBbkIsVUFBcUIsR0FBVzs7Ozs7Ozt3QkFFZixXQUFNLHNCQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO2lDQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQURQLElBQUksR0FBRyxTQUNBO3dCQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTt3QkFDN0MsV0FBTztnQ0FDTCxPQUFPLEVBQUUsSUFBSTs2QkFDZCxFQUFBOzs7d0JBRUQsV0FBTztnQ0FDTCxPQUFPLEVBQUUsS0FBSztnQ0FDZCxPQUFPLEVBQUUsR0FBQyxDQUFDLE9BQU87NkJBQ25CLEVBQUE7Ozs7O0tBRUo7SUFFSCxtQkFBQztBQUFELENBQUMsQUF2R0QsSUF1R0M7QUF2R1ksb0NBQVkifQ==