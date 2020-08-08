import { getClassModificationDecorator } from './index';
import { modifyObject } from '@writetome51/modify-object';


export const attach_prefix = getClassModificationDecorator(
	(instance: Associate, decoratorArgs: [string]) => {
		let prefix = decoratorArgs[0];
		instance.name = prefix + ' ' + instance.name;
	}
);


export class Associate {
	name = '';

	constructor(public company) {
		this.name = 'worker';
	}
}


@attach_prefix('snobby')
export class Employee extends Associate {
	constructor() {
		super('Apple');
		console.log('company is: ', this.company);
	}
}


let employee = new Employee();
if (employee.company === 'Apple' && employee.name === 'snobby worker') console.log('test 1 passed');
else console.log('test 1 FAILED');

if (employee instanceof Associate) console.log('test 2 passed');
else console.log('test 2 FAILED');


export const add_properties = getClassModificationDecorator(
	(instance, decoratorArgs: [object]) => {
		let newProperties = decoratorArgs[0];
		modifyObject(instance, newProperties);
	}
);


@add_properties({hair: 'amazing', age: 50, income: 200000, wife: 'hot'})
export class Boss extends Employee {
	address = '400 Jones road';
}


@attach_prefix('angry')
@add_properties({wife: 'radioactive'})
export class CEO extends Boss {
}
console.log('instantiating CEO');
let c = new CEO();


@attach_prefix('greedy')
export class Mogul extends CEO {
}


console.log('instantiating Mogul');
let mogul = new Mogul();

if (mogul.company === 'Apple' && mogul.name === 'greedy angry snobby worker'
	&& mogul['hair'] === 'amazing' && mogul['age'] === 50 && mogul['wife'] === 'radioactive')
	console.log('test 3 passed');
else console.log('test 3 FAILED');

if (mogul instanceof CEO) console.log('test 4 passed');
else console.log('test 4 FAILED');

if (mogul instanceof Associate) console.log('test 5 passed');
else console.log('test 5 FAILED');

