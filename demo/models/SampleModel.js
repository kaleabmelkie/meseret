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
                // (this as DocumentType) is available for other methods
            }
        };
        this.statics = {
            static1() {
                // code
                // (this as ModelType) is available for other static functions
            }
        };
    }
}
exports.SampleModelFactory = SampleModelFactory;
exports.SampleModel = new SampleModelFactory().model;
