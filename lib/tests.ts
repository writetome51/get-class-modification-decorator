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

	constructor(public company) {
		this.name = 'worker';
	}
}


@attach_prefix('snobby')
export class Employee extends Associate {
}


console.log('instantiating Employee');
let employee = new Employee('IBM');
console.log(employee);

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


console.log('instantiating Boss');
let boss = new Boss('Apple');
console.log(boss);


// the constructor is called once for every decorator added, so here
// it will be called twice:
@attach_prefix('angry')
@add_properties({age: 60, income: 600000, wife: 'radioactive'})
export class CEO extends Boss {
}

console.log('instantiating CEO');
let ceo = new CEO('Amazon');

console.log(ceo);
console.log(ceo instanceof Associate);
console.log(ceo instanceof CEO);


@attach_prefix('greedy')
export class Mogul extends CEO {
	constructor(company){
		super(company);
		console.log('company is: ', this.company);
	}
}


console.log('instantiating Mogul');
let mogul = new Mogul('Time Warner Cable');
console.log(mogul instanceof CEO);
console.log(mogul);
