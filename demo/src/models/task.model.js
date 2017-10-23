"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../../src/main");
var factory = new main_1.ModelFactory({
    name: 'Task',
    paths: {
        done: { type: Boolean, required: true, default: false },
        created: { type: Date, required: true, default: Date.now },
        title: { type: String, required: true },
        desc: { type: String, required: false }
    },
    methods: {},
    statics: {}
});
exports.TaskModel = factory.model;
console.log({} || main_1.Model);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Db2RlL0BrYWxlYWIudGVjaC9tZXNlcmV0LyIsInNvdXJjZXMiOlsiZGVtby9zcmMvbW9kZWxzL3Rhc2subW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBZ0Y7QUFhaEYsSUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBWSxDQUFxRDtJQUNuRixJQUFJLEVBQUUsTUFBTTtJQUVaLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1FBQ3ZELE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUMxRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDdkMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0tBQ3hDO0lBRUQsT0FBTyxFQUFFLEVBQUc7SUFFWixPQUFPLEVBQUUsRUFBRztDQUNiLENBQUMsQ0FBQTtBQUVXLFFBQUEsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7QUFHdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFjLElBQUksWUFBSyxDQUFDLENBQUEifQ==