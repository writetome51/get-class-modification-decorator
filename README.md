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
