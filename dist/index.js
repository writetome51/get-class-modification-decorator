"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*********************
Returns a TypeScript class decorator.
 The decorator creates a new constructor for the class being decorated.
 Inside it, the original constructor is called, then the class instance is passed
 into param `modifyInstance()`, where you manipulate it however you want.
EXAMPLE:

// Create a decorator:
export const attach_prefix = getClassModificationDecorator(
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
var modify_object_1 = require("@writetome51/modify-object");
function getClassModificationDecorator(modifyInstance) {
    return function () {
        var decoratorArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            decoratorArgs[_i] = arguments[_i];
        }
        return function (target) {
            // save a reference to the original constructor
            var originalConstructor = target;
            // the new constructor behaviour
            var f = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var instance = construct(originalConstructor, args);
                modifyInstance(instance, decoratorArgs);
                // Required so the returned instance's prototype will be its immediate parent.
                var instanceCopy = Object.create(originalConstructor.prototype);
                modify_object_1.modifyObject(instanceCopy, instance);
                return instanceCopy;
            };
            // Required so the 'instanceof' operator will work:
            f.prototype = originalConstructor.prototype;
            // return new constructor
            return f;
            // a utility function to generate instances of a class
            function construct(constructor, args) {
                var c = function () {
                    //	return constructor.apply(this, args);
                    return new (constructor.bind.apply(constructor, [void 0].concat(args)))();
                };
                c.prototype = constructor.prototype;
                return new (c.bind.apply(c, [void 0].concat(args)))();
            }
        };
    };
}
exports.getClassModificationDecorator = getClassModificationDecorator;
