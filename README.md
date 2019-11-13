# getClassModificationDecorator&lt;T&gt; (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modifyInstance: (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance: T, decoratorArgs: any[]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) => void<br>) : @Decorator

Returns a TypeScript class decorator. You set the behavior of the decorator  
by passing the callback `modifyInstance()`. The decorator creates a new  
constructor for the class being decorated.  The new constructor first calls  
the original constructor, then the class instance is passed into `modifyInstance()`,  
where you manipulate it however you want.


## Examples

```ts
// Create a decorator:

export const attach_prefix = getClassModificationDecorator<Associate>(
    (instance, decoratorArgs: [string]) => {
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

let employee = new Employee();
console.log(employee.name); // 'snobby associate'


export const add_properties = getClassModificationDecorator<Associate>(
	(instance, decoratorArgs: [object]) => {
		let newProperties = decoratorArgs[0];
		modifyObject(instance, newProperties);
	}
);

@add_properties({hair: 'amazing', age: 50, income: 200000, wife: 'hot'})
export class Boss extends Associate {
}

let boss = new Boss();
console.log(boss);
/*************
Boss {
  name: 'associate',
  hair: 'amazing',
  age: 50,
  income: 200000,
  wife: 'hot' }
**************/
```

## Installation

```bash
npm i  @writetome51/get-class-modification-decorator
```

## Loading
```ts
// If using TypeScript:
import {getClassModificationDecorator} 
    from '@writetome51/get-class-modification-decorator';

// If using ES5 JavaScript:
var getClassModificationDecorator = 
    require('@writetome51/get-class-modification-decorator')
        .getClassModificationDecorator;
```
