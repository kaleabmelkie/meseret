"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("../../src/main");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Db2RlL0BrYWxlYWIudGVjaC9tZXNlcmV0LyIsInNvdXJjZXMiOlsiZGVtby9tb2RlbHMvdGFzay5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUE2RTtBQWE3RSxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFZLENBQXFEO0lBQ25GLElBQUksRUFBRSxNQUFNO0lBRVosS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7UUFDdkQsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQzFELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtRQUN2QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7S0FDeEM7SUFFRCxPQUFPLEVBQUUsRUFBRztJQUVaLE9BQU8sRUFBRSxFQUFHO0NBQ2IsQ0FBQyxDQUFBO0FBRVcsUUFBQSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtBQUd0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQWMsSUFBSSxZQUFLLENBQUMsQ0FBQSJ9