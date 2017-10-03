"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const factory = new main_1.ModelFactory({
    name: 'Sample',
    paths: {
        path1: { type: String, required: true },
        path2: String
    },
    methods: {
        method1() {
            // code
            // factory.doc(this) is available
        }
    },
    statics: {
        static1() {
            // code
            // factory.mod(this) is available for other static functions
        }
    }
});
exports.SampleModel = factory.model;
