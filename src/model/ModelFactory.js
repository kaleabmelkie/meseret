"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.Model = mongoose_1.Model;
exports.Schema = mongoose_1.Schema;
var ModelFactory = (function () {
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
    ModelFactory.prototype.documetify = function (that) {
        return that;
    };
    ModelFactory.prototype.modelify = function (that) {
        return that;
    };
    return ModelFactory;
}());
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvTW9kZWxGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQTBGO0FBdUN2RSxnQkF2Q0EsZ0JBQUssQ0F1Q0E7QUFBRSxpQkF2Q08saUJBQU0sQ0F1Q1A7QUFsQ2hDO0lBS0Usc0JBQXFCLE9BQTREO1FBQTVELFlBQU8sR0FBUCxPQUFPLENBQXFEO0lBQUksQ0FBQztJQUV0RixzQkFBSSxnQ0FBTTthQUFWO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7Z0JBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtCQUFLO2FBQVQ7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBK0QsQ0FBQTtZQUNuSCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCxpQ0FBVSxHQUFWLFVBQVksSUFBUztRQUNuQixNQUFNLENBQUMsSUFBMEMsQ0FBQTtJQUNuRCxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFVLElBQVM7UUFDakIsTUFBTSxDQUFDLElBQWtFLENBQUE7SUFDM0UsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQWhDRCxJQWdDQztBQWhDWSxvQ0FBWSJ9