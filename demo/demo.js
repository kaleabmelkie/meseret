"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const main_1 = require("../src/main");
const SampleModel_1 = require("./models/SampleModel");
const SampleRouter_1 = require("./routes/SampleRouter");
exports.app = new main_1.ServerApp({
    name: 'Test',
    models: [
        SampleModel_1.SampleModel
    ],
    mongoUris: 'mongodb://localhost:27017/meseret-demo',
    httpServers: [
        { path: 'localhost', port: 1414 }
    ],
    publicDirs: [
        path_1.join(__dirname, './public/')
    ],
    middleware: [],
    routes: [
        SampleRouter_1.SampleRouter.routes(), SampleRouter_1.SampleRouter.allowedMethods()
    ]
});
exports.app.start()
    .then(() => {
    console.log('Demo Test Passing');
})
    .catch((err) => {
    console.error(`Demo Test Failed: ${err}`);
})
