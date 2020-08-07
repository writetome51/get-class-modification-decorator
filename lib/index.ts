import { modifyObject } from '@writetome51/modify-object';


/*********************
Returns a TypeScript ClassDecorator factory.
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

export function getClassModificationDecorator(
	modifyInstance: (instance: object, decoratorArgs: any[]) => void
): (...decoratorArgs) => ClassDecorator {

	return function (...decoratorArgs): ClassDecorator {
		return function (target) {
			// save a reference to the original constructor
			let originalConstructor = target;

			// the new constructor behaviour
			const f: any = function (...args) {
				let instance = construct(originalConstructor, args);
				modifyInstance(instance, decoratorArgs);

				// Required so the returned instance's prototype will be its immediate parent.
				let instanceCopy = Object.create(originalConstructor.prototype);
				modifyObject(instanceCopy, instance);

				return instanceCopy;
			};

			// Required so the 'instanceof' operator will work:
			f.prototype = originalConstructor.prototype;

			// return new constructor
			return f;


			// a utility function to generate instances of a class
			function construct(constructor, args) {
				const c: any = function () {
					//	return constructor.apply(this, args);

					return new constructor(...args);
				};
				c.prototype = constructor.prototype;

				return new c(...args);
			}

		};
	};
}
