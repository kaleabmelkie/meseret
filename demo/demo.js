"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main"); // replace '../src/main' by 'meseret' for your app
const path_1 = require("path");
const task_model_1 = require("./models/task.model");
const tasks_router_1 = require("./routers/api/tasks.router");
// start server app
new main_1.ServerApp({
    // name of the app
    name: 'Task Organizer',
    // mongoose models
    models: [
        task_model_1.TaskModel
    ],
    // mongodb connection
    mongoUris: 'mongodb://localhost:27017/meseret-demo_task-organizer',
    // servers to create
    httpServers: [
        { path: 'localhost', port: 80 },
        { path: 'localhost', port: 1414 },
        { path: 'localhost', port: 3000 },
        { path: 'localhost', port: 8080 }
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
    .then(() => { console.log('Task Organizer Starting...'); })
    .catch((err) => { console.error(`Start Failed: ${err}`); });
