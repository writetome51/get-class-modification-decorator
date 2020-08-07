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

export declare function getClassModificationDecorator(
	modifyInstance: (instance: object, decoratorArgs: any[]) => void
): (...decoratorArgs: any[]) => ClassDecorator;
