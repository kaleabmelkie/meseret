"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("rxjs/operator/map");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/common/http");
var SayService = (function () {
    function SayService(http) {
        this.http = http;
    }
    SayService.prototype.getSays = function (length, skip) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        return new Observable_1.Observable(function (subscriber) {
            var url = "/api/say/list/" + length + "/skip/" + skip;
            var req = _this.http.get(url)
                .subscribe(function (res) {
                if (!res['success']) {
                    subscriber.error(new Error("Request to '" + url + "' responded not successful."));
                }
                else if (!res['says'] || !Array.isArray(res['says'])) {
                    subscriber.error(new Error("Request to '" + url + "' responded with incorrect format."));
                }
                else {
                    subscriber.next(res['says']);
                }
            }, function (err) {
                subscriber.error(err);
            }, function () {
                subscriber.complete();
            });
            return function () { return req.unsubscribe(); };
        });
    };
    SayService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SayService);
    return SayService;
}());
exports.SayService = SayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovQ29kZS9Aa2FsZWFibWVsa2llL291ci1zYXkvIiwic291cmNlcyI6WyJwdWJsaWMvc3JjL2FwcC9wcm92aWRlcnMvc2F5L3NheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUEwQjtBQUUxQixzQ0FBMEM7QUFFMUMsOENBQTRDO0FBQzVDLDZDQUFpRDtBQUdqRDtJQUVFLG9CQUFvQixJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBQUksQ0FBQztJQUV6Qyw0QkFBTyxHQUFQLFVBQVMsTUFBYyxFQUFFLElBQVE7UUFBakMsaUJBcUJDO1FBckJ3QixxQkFBQSxFQUFBLFFBQVE7UUFDL0IsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxVQUFBLFVBQVU7WUFDOUIsSUFBTSxHQUFHLEdBQUcsbUJBQWtCLE1BQU0sY0FBVyxJQUFPLENBQUE7WUFFdEQsSUFBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2lCQUMzQixTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBZ0IsR0FBRyxnQ0FBOEIsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hGLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsaUJBQWdCLEdBQUcsdUNBQXFDLENBQUMsQ0FBQyxDQUFBO2dCQUN2RixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBVyxDQUFDLENBQUE7Z0JBQ3hDLENBQUM7WUFDSCxDQUFDLEVBQUUsVUFBQSxHQUFHO2dCQUNKLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkIsQ0FBQyxFQUFFO2dCQUNELFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtZQUVKLE1BQU0sQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQXpCVSxVQUFVO1FBRHRCLGlCQUFVLEVBQUU7aURBR2UsaUJBQVU7T0FGekIsVUFBVSxDQTBCdEI7SUFBRCxpQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLGdDQUFVIn0=