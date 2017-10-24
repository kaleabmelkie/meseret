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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYi50ZWNoL21lc2VyZXQvIiwic291cmNlcyI6WyJtb2RlbC9Nb2RlbEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBMEY7QUF1Q3ZFLGdCQXZDQSxnQkFBSyxDQXVDQTtBQUFFLGlCQXZDTyxpQkFBTSxDQXVDUDtBQWxDaEM7SUFLRSxzQkFBcUIsT0FBNEQ7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBcUQ7SUFBSSxDQUFDO0lBRXRGLHNCQUFJLGdDQUFNO2FBQVY7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQUs7YUFBVDtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUErRCxDQUFBO1lBQ25ILENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUNwQixDQUFDOzs7T0FBQTtJQUVELGlDQUFVLEdBQVYsVUFBWSxJQUFTO1FBQ25CLE1BQU0sQ0FBQyxJQUEwQyxDQUFBO0lBQ25ELENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVUsSUFBUztRQUNqQixNQUFNLENBQUMsSUFBa0UsQ0FBQTtJQUMzRSxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBaENELElBZ0NDO0FBaENZLG9DQUFZIn0=