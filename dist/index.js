"use strict";
/*********************
Returns a TypeScript class decorator.
param `modifyInstance()` is called inside the constructor of the class being decorated,
allowing you to change its behavior.
EXAMPLE:

// Create a decorator:
export const attach_prefix = getClassModificationDecorator<Employee>(
    (instance, decoratorArgs: [string]) => {
        let prefix = decoratorArgs[0];
        instance.name = prefix + ' ' + instance.name;
    }
);

@attach_prefix('subordinate')
export class Employee {
    name = 'employee';
}

let subordinate = new Employee();
console.log(subordinate.name); // 'subordinate employee'
 *********************/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getClassModificationDecorator(modifyInstance) {
    return function () {
        var decoratorArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            decoratorArgs[_i] = arguments[_i];
        }
        return function (target) {
            // save a reference to the original constructor
            var original = target;
            // the new constructor behaviour
            var f = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var instance = construct(original, args);
                modifyInstance(instance, decoratorArgs);
                return instance;
            };
            // copy prototype so `instanceof` operator still works
            // @ts-ignore
            f.prototype = original.prototype;
            // return new constructor (will override original)
            return f;
            // a utility function to generate instances of a class
            function construct(constructor, args) {
                var c = function () {
                    return constructor.apply(this, args);
                };
                c.prototype = constructor.prototype;
                return new c();
            }
        };
    };
}
exports.getClassModificationDecorator = getClassModificationDecorator;
//
exports.attach_prefix = getClassModificationDecorator(function (instance, decoratorArgs) {
    var prefix = decoratorArgs[0];
    instance.name = prefix + ' ' + instance.name;
});
var Employee = /** @class */ (function () {
    function Employee() {
        this.name = 'employee';
    }
    Employee = __decorate([
        exports.attach_prefix('subordinate')
    ], Employee);
    return Employee;
}());
exports.Employee = Employee;
var subordinate = new Employee();
console.log(subordinate.name); // 'subordinate employee'
