"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../src/main"); // replace '../src/main' by 'meseret' for your app
var factory = new main_1.ModelFactory({
    name: 'Task',
    paths: {
        done: { type: Boolean, required: true, default: false },
        created: { type: Date, required: true, default: Date.now },
        title: { type: String, required: true },
        desc: { type: String, required: false }
    },
    methods: {},
    statics: {}
});
exports.TaskModel = factory.model;
// fixme: temp: use Document and Model so that TSLint will not remove them when fixing code
console.warn('To-Do: Temp-Fix: ', {}, main_1.Model); // todo: google the provided error
//# sourceMappingURL=task.model.js.map