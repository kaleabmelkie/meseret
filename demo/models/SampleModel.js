"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
class SampleModelFactory extends main_1.ModelFactory {
    constructor() {
      super(...arguments
    )
      this.name = 'Sample';
        this.paths = {
            path1: { type: String, required: true },
            path2: String
        };
        this.methods = {
            method1() {
                // code
            }
        };
        this.statics = {
            static1() {
                // code
            }
        };
    }
}
exports.SampleModelFactory = SampleModelFactory;
exports.SampleModel = new SampleModelFactory().model;
