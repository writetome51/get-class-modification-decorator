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


export declare function getClassModificationDecorator<T>(
	modifyInstance: (instance: T, decoratorArgs: any[]) => void
): (...decoratorArgs: any[]) => (target: Class<T>) => Class<T>;
