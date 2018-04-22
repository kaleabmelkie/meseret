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
  /**
   * @deprecated Use <code>documentify<code> instead. This was a typo and will be removed in version 2.
   */
  ModelFactory.prototype.documetify = function(that) {
    return this.documentify(that)
  }
  ModelFactory.prototype.documentify = function(that) {
    return that
  }
  ModelFactory.prototype.modelify = function(that) {
    return that
  }
  return ModelFactory
})()
exports.ModelFactory = ModelFactory
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0NvZGUva2FsZWFibWVsa2llL21lc2VyZXQvIiwic291cmNlcyI6WyJtb2RlbC9Nb2RlbEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FPaUI7QUF3REUsZ0JBN0RqQixnQkFBSyxDQTZEaUI7QUFBRSxpQkEzRHhCLGlCQUFNLENBMkR3QjtBQW5EaEM7SUFRRSxzQkFDVSxPQUE0RDtRQUE1RCxZQUFPLEdBQVAsT0FBTyxDQUFxRDtJQUNuRSxDQUFDO0lBRUosc0JBQUksZ0NBQU07YUFBVjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7YUFDaEQ7WUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQkFBSzthQUFUO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUdsQyxDQUFBO2FBQ2pCO1lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7SUFDSCxpQ0FBVSxHQUFWLFVBQVcsSUFBUztRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxJQUFTO1FBQ25CLE9BQU8sSUFBMEMsQ0FBQTtJQUNuRCxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUNFLElBQVM7UUFFVCxPQUFPLElBQWtFLENBQUE7SUFDM0UsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQztBQWpEWSxvQ0FBWSJ9
