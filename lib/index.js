'use strict'
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p]
}
Object.defineProperty(exports, '__esModule', { value: true })
__export(require('./model/ModelFactory'))
__export(require('./server/ServerApp'))
// fix for missing ctx.request.{body,files} types
require('koa-body')
//# sourceMappingURL=index.js.map
