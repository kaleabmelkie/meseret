'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var mongoose_1 = require('mongoose')
exports.Model = mongoose_1.Model
exports.Schema = mongoose_1.Schema
var ModelFactory = /** @class */ (function() {
  function ModelFactory(_config) {
    this._config = _config
  }
  Object.defineProperty(ModelFactory.prototype, 'schema', {
    get: function() {
      if (!this._schema) {
        this._schema = new mongoose_1.Schema(
          this._config.paths,
          this._config.options
        )
        this._schema.method(this._config.methods || {})
        this._schema.static(this._config.statics || {})
      }
      return this._schema
    },
    enumerable: true,
    configurable: true
  })
  Object.defineProperty(ModelFactory.prototype, 'model', {
    get: function() {
      if (!this._model) {
        this._model = mongoose_1.model(this._config.name, this.schema)
      }
      return this._model
    },
    enumerable: true,
    configurable: true
  })
  ModelFactory.prototype.documetify = function(that) {
    return that
  }
  ModelFactory.prototype.modelify = function(that) {
    return that
  }
  return ModelFactory
})()
exports.ModelFactory = ModelFactory
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUvQGthbGVhYm1lbGtpZS9tZXNlcmV0LyIsInNvdXJjZXMiOlsibW9kZWwvTW9kZWxGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBT2lCO0FBbURFLGdCQXhEakIsZ0JBQUssQ0F3RGlCO0FBQUUsaUJBdER4QixpQkFBTSxDQXNEd0I7QUE5Q2hDO0lBUUUsc0JBQ1UsT0FBNEQ7UUFBNUQsWUFBTyxHQUFQLE9BQU8sQ0FBcUQ7SUFDbkUsQ0FBQztJQUVKLHNCQUFJLGdDQUFNO2FBQVY7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQUs7YUFBVDtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUdsQyxDQUFBO1lBQ2xCLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtRQUNwQixDQUFDOzs7T0FBQTtJQUVELGlDQUFVLEdBQVYsVUFBVyxJQUFTO1FBQ2xCLE1BQU0sQ0FBQyxJQUEwQyxDQUFBO0lBQ25ELENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQ0UsSUFBUztRQUVULE1BQU0sQ0FBQyxJQUFrRSxDQUFBO0lBQzNFLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksb0NBQVkifQ==
