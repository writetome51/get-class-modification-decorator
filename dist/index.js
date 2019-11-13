"use strict";
/*********************
Returns a TypeScript class decorator.
 The decorator creates a new constructor for the class being decorated.
 Inside it, the original constructor is called, then the class instance is passed
 into param `modifyInstance()`, where you manipulate it however you want.
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
                // Without this, it won't know its immediate parent
                instance.__proto__ = original.prototype;
                return instance;
            };
            // Without this, it won't know its most distant parent
            f.prototype = original.prototype;
            // return new constructor
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
