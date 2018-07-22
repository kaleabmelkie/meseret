"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.Model = mongoose_1.Model;
exports.Schema = mongoose_1.Schema;
var ModelFactory = /** @class */ (function () {
    function ModelFactory(_config) {
        this._config = _config;
    }
    Object.defineProperty(ModelFactory.prototype, "schema", {
        get: function () {
            if (!this._schema) {
                this._schema = new mongoose_1.Schema(this._config.paths, this._config.options);
                this._schema.method(this._config.methods || {});
                this._schema.static(this._config.statics || {});
            }
            return this._schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelFactory.prototype, "model", {
        get: function () {
            if (!this._model) {
                this._model = mongoose_1.model(this._config.name, this.schema);
            }
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @deprecated Use <code>documentify<code> instead. This was a typo and will be removed in version 2.
     */
    ModelFactory.prototype.documetify = function (that) {
        return this.documentify(that);
    };
    ModelFactory.prototype.documentify = function (that) {
        return that;
    };
    ModelFactory.prototype.modelify = function (that) {
        return that;
    };
    return ModelFactory;
}());
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=ModelFactory.js.map