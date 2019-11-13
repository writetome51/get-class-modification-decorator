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
import { Class } from './class-type';


export function getClassModificationDecorator<T>(
	modifyInstance: (instance: T, decoratorArgs: any[]) => void
): (...decoratorArgs: any[]) => (target: Class<T>) => Class<T> {

	return function (...decoratorArgs) {
		return function (target: Class<T>) {
			// save a reference to the original constructor
			const original = target;

			// the new constructor behaviour
			const f: any = function (...args) {
				let instance = construct(original, args);
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
				const c: any = function () {
					return constructor.apply(this, args);
				};
				c.prototype = constructor.prototype;
				return new c();
			}

		};
	};
}
