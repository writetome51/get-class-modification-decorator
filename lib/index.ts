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


export function getClassModificationDecorator(
	modifyInstance: (instance, decoratorArgs: any[]) => void
) {
	return function (...decoratorArgs) {
		return function (target) {
			// save a reference to the original constructor
			const original = target;

			// the new constructor behaviour
			const f: any = function (...args) {
				let instance = construct(original, args);
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
				const c: any = function () {
					return constructor.apply(this, args);
				};
				c.prototype = constructor.prototype;
				return new c();
			}

		};
	};
}
