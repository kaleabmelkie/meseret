"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../src/main");
var path_1 = require("path");
var task_model_1 = require("./models/task.model");
var tasks_router_1 = require("./routers/api/tasks.router");
var tasks_socket_1 = require("./sockets/api/tasks.socket");
new main_1.ServerApp({
    name: 'Task Organizer',
    mongoUris: process.env['MONGODB_URI'] || 'mongodb://localhost/task-organizer',
    httpServers: [{ port: Number.parseInt(String(process.env['PORT'])) || 80 }],
    publicDirs: [path_1.join(__dirname, '../public/dist/')],
    models: [task_model_1.TaskModel],
    routers: [tasks_router_1.TasksRouter],
    sockets: [tasks_socket_1.TasksSocket],
    middleware: []
}).start()
    .then(function () { console.log("'Task Organizer' is starting..."); })
    .catch(function (err) { console.error("Start failed: " + err); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiJDOi9Db2RlL0BrYWxlYWIudGVjaC9tZXNlcmV0LyIsInNvdXJjZXMiOlsiZGVtby9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUEwQztBQUMxQyw2QkFBMkI7QUFFM0Isa0RBQStDO0FBQy9DLDJEQUF3RDtBQUN4RCwyREFBd0Q7QUFFeEQsSUFBSSxnQkFBUyxDQUFDO0lBQ1osSUFBSSxFQUFFLGdCQUFnQjtJQUV0QixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxvQ0FBb0M7SUFDN0UsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFFM0UsVUFBVSxFQUFFLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBRWhELE1BQU0sRUFBRSxDQUFDLHNCQUFTLENBQUM7SUFDbkIsT0FBTyxFQUFFLENBQUMsMEJBQVcsQ0FBQztJQUN0QixPQUFPLEVBQUUsQ0FBQywwQkFBVyxDQUFDO0lBRXRCLFVBQVUsRUFBRSxFQUFFO0NBQ2YsQ0FBQyxDQUFDLEtBQUssRUFBRTtLQUNQLElBQUksQ0FBQyxjQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztLQUM5RCxLQUFLLENBQUMsVUFBQyxHQUFRLElBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBa0IsR0FBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSJ9