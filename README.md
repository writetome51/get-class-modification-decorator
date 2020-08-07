# getClassModificationDecorator(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modifyInstance: (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance, decoratorArgs: any[]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) => void<br>) : @Decorator

Returns a TypeScript class decorator. You set the behavior of the decorator  
by passing the callback `modifyInstance()`. The decorator creates a new  
constructor for the class being decorated.  The new constructor first calls  
the original constructor, then the class instance is passed into `modifyInstance()`,  
where you manipulate it however you want.  (The prototype chain is kept intact,  
and the `instanceof` operator will still work.)


## Examples

```ts
// Create a decorator:

export const attach_prefix = getClassModificationDecorator(
    (instance, decoratorArgs: [string]) => {
        let prefix = decoratorArgs[0];
        instance.name = prefix + ' ' + instance.name;
    }
);

export class Associate {
    name = 'associate';
}

// Now decorate a class:

@attach_prefix('snobby')
export class Employee extends Associate{
}

let employee = new Employee();
console.log(employee.name); // 'snobby associate'


// Here we make a decorator that adds properties:

export const add_properties = getClassModificationDecorator(
    (instance, decoratorArgs: [object]) => {
        let newProperties = decoratorArgs[0];
        mergeObject(instance, newProperties);
    }
);

// Now use it:

@add_properties({hair: 'amazing', age: 50, income: 200000, wife: 'hot'})
export class Boss extends Employee {
}

let boss = new Boss();
console.log(boss);
/*************
Boss {
  name: 'snobby associate',
  hair: 'amazing',
  age: 50,
  income: 200000,
  wife: 'hot' }
**************/


// Now combine decorators:

@attach_prefix('angry')
@add_properties({address: '100 fleet street', age: 60, income: 600000, wife: 'radioactive'})
export class CEO extends Boss {
}

let ceo = new CEO();
console.log(ceo);
/*************
CEO {
  name: 'angry snobby associate',
  address: '100 fleet street',
  hair: 'amazing',
  age: 60,
  income: 600000,
  wife: 'radioactive' 
}
**************/

// Remember when combining decorators:  the class constructor is called once
// for every decorator attached to the class.  So in the above example it 
// will be called twice.
```

## Installation
```bash
npm i  @writetome51/get-class-modification-decorator
```

## Loading
```js
import {getClassModificationDecorator} 
    from '@writetome51/get-class-modification-decorator';
```
