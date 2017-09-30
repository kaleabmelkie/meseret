"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.Model = mongoose_1.Model;
class ModelFactory {
    get schema() {
        if (!this._schema) {
            this._schema = new mongoose_1.Schema(this.paths, this.options);
            this._schema.method(this.methods);
            this._schema.static(this.statics);
        }
        return this._schema;
    }
    get model() {
        if (!this._model) {
            this._model = mongoose_1.model(this.name, this.schema);
        }
        return this._model;
    }
}
exports.ModelFactory = ModelFactory;
