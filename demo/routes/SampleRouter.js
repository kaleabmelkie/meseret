"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const SampleModel_1 = require("../models/SampleModel");
const router = new Router({
    prefix: '/demo'
});
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello, world!';
    ctx.body += `\nThere are ${(await SampleModel_1.SampleModel.find()).length} documents modeled as 'Sample'`;
});
exports.SampleRouter = router;
