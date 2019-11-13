"use strict";
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
            // @ts-ignore
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
