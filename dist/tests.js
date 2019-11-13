"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var modify_object_1 = require("@writetome51/modify-object");
exports.attach_prefix = index_1.getClassModificationDecorator(function (instance, decoratorArgs) {
    var prefix = decoratorArgs[0];
    instance.name = prefix + ' ' + instance.name;
});
var Associate = /** @class */ (function () {
    function Associate() {
        this.name = 'associate';
        this.name = 'worker';
    }
    return Associate;
}());
exports.Associate = Associate;
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Employee = __decorate([
        exports.attach_prefix('snobby')
    ], Employee);
    return Employee;
}(Associate));
exports.Employee = Employee;
console.log('instantiating Employee');
var employee = new Employee();
//console.log(employee);
exports.add_properties = index_1.getClassModificationDecorator(function (instance, decoratorArgs) {
    var newProperties = decoratorArgs[0];
    modify_object_1.modifyObject(instance, newProperties);
});
var Boss = /** @class */ (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.address = '400 Jones road';
        return _this;
    }
    Boss = __decorate([
        exports.add_properties({ hair: 'amazing', age: 50, income: 200000, wife: 'hot' })
    ], Boss);
    return Boss;
}(Employee));
exports.Boss = Boss;
console.log('instantiating Boss');
var boss = new Boss();
//console.log(boss);
// the constructor is called once for every decorator added, so here
// it will be called twice:
var CEO = /** @class */ (function (_super) {
    __extends(CEO, _super);
    function CEO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CEO = __decorate([
        exports.attach_prefix('angry'),
        exports.add_properties({ age: 60, income: 600000, wife: 'radioactive' })
    ], CEO);
    return CEO;
}(Boss));
exports.CEO = CEO;
console.log('instantiating CEO');
var ceo = new CEO();
//console.log(ceo);
console.log(ceo instanceof Associate);
console.log(ceo instanceof CEO);
var Mogul = /** @class */ (function (_super) {
    __extends(Mogul, _super);
    function Mogul() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mogul = __decorate([
        exports.attach_prefix('greedy')
    ], Mogul);
    return Mogul;
}(CEO));
exports.Mogul = Mogul;
console.log('instantiating Mogul');
var mogul = new Mogul();
console.log(mogul instanceof CEO);
console.log(mogul);
