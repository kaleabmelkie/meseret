"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.Model = mongoose_1.Model;
class DataModel {
    get schema() {
        const ret = new mongoose_1.Schema(this.paths, this.options);
        ret.method(this.methods);
        ret.static(this.statics);
        return ret;
    }
    get model() {
        return mongoose_1.model(this.name, this.schema);
    }
}
exports.DataModel = DataModel;
