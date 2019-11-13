import { getClassModificationDecorator } from './index';


export const attach_prefix = getClassModificationDecorator<Associate>(
	(instance, decoratorArgs: [string]) => {
		let prefix = decoratorArgs[0];
		instance.name = prefix + ' ' + instance.name;
	}
);


export class Associate {
	name = 'associate';
}


@attach_prefix('subordinate')
export class Employee extends Associate {
}

let subordinate = new Employee();
console.log(subordinate.name); // 'subordinate associate'
