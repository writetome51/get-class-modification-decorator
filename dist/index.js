import {modifyObject} from '@writetome51/modify-object';


/*********************
 Returns a TypeScript ClassDecorator factory.
 The decorator creates a new constructor for the class being decorated.
 The new constructor first calls the original, then the class instance
 is passed into modifyInstance(), where you manipulate it however you want.
 (The prototype chain is kept intact, and the instanceof operator will still work.)
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

export function getClassModificationDecorator(modifyInstance) {
	return function(...decoratorArgs) {

		return function(target) {
			let originalConstructor = target;

			// the new constructor behaviour
			const f = function(...args) {
				let instance = construct(originalConstructor, args);
				modifyInstance(instance, decoratorArgs);

				// Required so the returned instance's prototype will be its immediate parent.
				let instanceCopy = Object.create(originalConstructor.prototype);
				modifyObject(instanceCopy, instance);
				return instanceCopy;
			};
			// Required so the 'instanceof' operator will work:
			f.prototype = originalConstructor.prototype;
			return f;


			function construct(constructor, args) {
				const c = function() {
					return new constructor(...args);
				};
				c.prototype = constructor.prototype;
				return new c(...args);
			}
		};
	};
}
