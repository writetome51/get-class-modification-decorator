var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getClassModificationDecorator } from './index';
import { modifyObject } from '@writetome51/modify-object';
export const attach_prefix = getClassModificationDecorator((instance, decoratorArgs) => {
    let prefix = decoratorArgs[0];
    instance.name = prefix + ' ' + instance.name;
});
export class Associate {
    constructor(company) {
        this.company = company;
        this.name = 'associate';
        this.name = 'worker';
    }
}
let Employee = class Employee extends Associate {
};
Employee = __decorate([
    attach_prefix('snobby')
], Employee);
export { Employee };
console.log('instantiating Employee');
let employee = new Employee('IBM');
console.log(employee);
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
console.log('instantiating Boss');
let boss = new Boss('Apple');
console.log(boss);
// the constructor is called once for every decorator added, so here
// it will be called twice:
let CEO = class CEO extends Boss {
};
CEO = __decorate([
    attach_prefix('angry'),
    add_properties({ age: 60, income: 600000, wife: 'radioactive' })
], CEO);
export { CEO };
console.log('instantiating CEO');
let ceo = new CEO('Amazon');
console.log(ceo);
console.log(ceo instanceof Associate);
console.log(ceo instanceof CEO);
let Mogul = class Mogul extends CEO {
    constructor(company) {
        super(company);
        console.log('company is: ', this.company);
    }
};
Mogul = __decorate([
    attach_prefix('greedy')
], Mogul);
export { Mogul };
console.log('instantiating Mogul');
let mogul = new Mogul('Time Warner Cable');
console.log(mogul instanceof CEO);
console.log(mogul);
