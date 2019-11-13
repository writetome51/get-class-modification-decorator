import { getClassModificationDecorator } from './index';
import { modifyObject } from '@writetome51/modify-object';


export const attach_prefix: (arg) => Function = getClassModificationDecorator(
	(instance: Associate, decoratorArgs: [string]) => {
		let prefix = decoratorArgs[0];
		instance.name = prefix + ' ' + instance.name;
	}
);


export class Associate {
	name = 'associate';
}


@attach_prefix('snobby')
export class Employee extends Associate {
}

console.log('instantiating Employee');
let subordinate = new Employee();
console.log(subordinate);

export const add_properties = getClassModificationDecorator(
	(instance, decoratorArgs: [object]) => {
		let newProperties = decoratorArgs[0];
		modifyObject(instance, newProperties);
	}
);


@add_properties({hair: 'amazing', age: 50, income: 200000, wife: 'hot'})
export class Boss extends Employee {
	address = '400 Jones road'
}

console.log('instantiating Boss');
let boss = new Boss();
console.log(boss);


@add_properties({address: '100 fleet street', age: 60, income: 600000, wife: 'radioactive'})
export class CEO extends Boss {
}

console.log('instantiating CEO');
let ceo = new CEO();

console.log(ceo);

console.log(ceo instanceof CEO);
