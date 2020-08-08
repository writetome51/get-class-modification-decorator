var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getClassModificationDecorator } from './index.js';
import { modifyObject } from '@writetome51/modify-object';
export const attach_prefix = getClassModificationDecorator((instance, decoratorArgs) => {
    let prefix = decoratorArgs[0];
    instance.name = prefix + ' ' + instance.name;
});
export class Associate {
    constructor(company) {
        this.company = company;
        this.name = '';
        this.name = 'worker';
    }
}
let Employee = class Employee extends Associate {
    constructor() {
        super('Apple');
        console.log('company is: ', this.company);
    }
};
Employee = __decorate([
    attach_prefix('snobby')
], Employee);
export { Employee };
let employee = new Employee();
if (employee.company === 'Apple' && employee.name === 'snobby worker')
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
if (employee instanceof Associate)
    console.log('test 2 passed');
else
    console.log('test 2 FAILED');
export const add_properties = getClassModificationDecorator((instance, decoratorArgs) => {
    let newProperties = decoratorArgs[0];
    modifyObject(instance, newProperties);
});
let Boss = class Boss extends Employee {
    constructor() {
        super(...arguments);
        this.address = '400 Jones road';
    }
};
Boss = __decorate([
    add_properties({ hair: 'amazing', age: 50, income: 200000, wife: 'hot' })
], Boss);
export { Boss };
let CEO = class CEO extends Boss {
};
CEO = __decorate([
    attach_prefix('angry'),
    add_properties({ wife: 'radioactive' })
], CEO);
export { CEO };
console.log('instantiating CEO');
let c = new CEO();
let Mogul = class Mogul extends CEO {
};
Mogul = __decorate([
    attach_prefix('greedy')
], Mogul);
export { Mogul };
console.log('instantiating Mogul');
let mogul = new Mogul();
if (mogul.company === 'Apple' && mogul.name === 'greedy angry snobby worker'
    && mogul['hair'] === 'amazing' && mogul['age'] === 50 && mogul['wife'] === 'radioactive')
    console.log('test 3 passed');
else
    console.log('test 3 FAILED');
if (mogul instanceof CEO)
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
if (mogul instanceof Associate)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
