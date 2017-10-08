"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main");
var path_1 = require("path");
var task_model_1 = require("./models/task.model");
var tasks_router_1 = require("./routers/api/tasks.router");
new main_1.ServerApp({
    name: 'Task Organizer',
    models: [
        task_model_1.TaskModel
    ],
    mongoUris: process.env['PROD_MONGODB'] || 'mongodb://localhost:27017/meseret-demo_task-organizer',
    httpServers: [
        { port: Number.parseInt(String(process.env['PORT'])) || 80 }
    ],
    publicDirs: [
        path_1.join(__dirname, './public/')
    ],
    middleware: [],
    routes: [
        tasks_router_1.TasksRouter
    ]
}).start()
    .then(function () { console.log('Task Organizer Starting...'); })
    .catch(function (err) { console.error("Start Failed: " + err); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiJDOi9Db2RlL0BrYWxlYWIudGVjaC9tZXNlcmV0LyIsInNvdXJjZXMiOlsiZGVtby9kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXVDO0FBQ3ZDLDZCQUEyQjtBQUUzQixrREFBK0M7QUFDL0MsMkRBQXdEO0FBSXhELElBQUksZ0JBQVMsQ0FBQztJQUVaLElBQUksRUFBRSxnQkFBZ0I7SUFHdEIsTUFBTSxFQUFFO1FBQ04sc0JBQVM7S0FDVjtJQUdELFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLHVEQUF1RDtJQUdqRyxXQUFXLEVBQUU7UUFDWCxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7S0FDN0Q7SUFHRCxVQUFVLEVBQUU7UUFDVixXQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztLQUM3QjtJQUdELFVBQVUsRUFBRSxFQUFFO0lBR2QsTUFBTSxFQUFFO1FBQ04sMEJBQVc7S0FDWjtDQUNGLENBQUMsQ0FBQyxLQUFLLEVBQUU7S0FDUCxJQUFJLENBQUMsY0FBUSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7S0FDekQsS0FBSyxDQUFDLFVBQUMsR0FBUSxJQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQWtCLEdBQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEifQ==