"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.Model = mongoose_1.Model;
exports.Schema = mongoose_1.Schema;
class ModelFactory {
    constructor(_config) {
        this._config = _config;
    }
    get schema() {
        if (!this._schema) {
            this._schema = new mongoose_1.Schema(this._config.paths, this._config.options);
            this._schema.method(this._config.methods || {});
            this._schema.static(this._config.statics || {});
        }
        return this._schema;
    }
    get model() {
        if (!this._model) {
            this._model = mongoose_1.model(this._config.name, this.schema);
        }
        return this._model;
    }
    doc(that) {
        return that;
    }
    mod(that) {
        return that;
    }
}
exports.ModelFactory = ModelFactory;
