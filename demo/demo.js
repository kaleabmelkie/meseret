"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../src/main"); // replace '../src/main' by 'meseret' for your app
var path_1 = require("path");
var task_model_1 = require("./models/task.model");
var tasks_router_1 = require("./routers/api/tasks.router");
// start server app
new main_1.ServerApp({
    // name of the app
    name: 'Task Organizer',
    // mongoose models
    models: [
        task_model_1.TaskModel
    ],
    // mongodb connection
    mongoUris: process.env['PROD_MONGODB'] || 'mongodb://localhost:27017/meseret-demo_task-organizer',
    // servers to create
    httpServers: [
        { port: Number.parseInt(String(process.env['PORT'])) || 80 }
    ],
    // directories to host
    publicDirs: [
        path_1.join(__dirname, './public/')
    ],
    // extra Koa-middleware to use
    middleware: [],
    // Koa-routers (as middleware)
    routes: [
        tasks_router_1.TasksRouter.routes(), tasks_router_1.TasksRouter.allowedMethods()
    ]
}).start() // start the app (returns a promise)
    .then(function () { console.log('Task Organizer Starting...'); })
    .catch(function (err) { console.error("Start Failed: " + err); });
//# sourceMappingURL=demo.js.map