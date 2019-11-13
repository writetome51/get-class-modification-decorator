import { getClassModificationDecorator } from './index';


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
//
//
