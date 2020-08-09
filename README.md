# getClassModificationDecorator(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;modifyInstance: (<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instance, decoratorArgs: any[]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) => void<br>): (...decoratorArgs) => ClassDecorator

Returns a TypeScript ClassDecorator factory. You set the decorator behavior with the  
callback `modifyInstance()`. The decorator creates a new constructor for the class  
being decorated. The new constructor first calls the original, then the class instance  
is passed into `modifyInstance()`, where you manipulate it however you want. (The  
prototype chain is kept intact, and the `instanceof` operator will still work.)


## Examples

```ts
// Here we make a decorator that adds properties:

export const add_properties = getClassModificationDecorator(
    (instance, decoratorArgs: [object]) => {
        let newProperties = decoratorArgs[0];
        Object.assign(instance, newProperties);
    }
);

// Now use it:

@add_properties({hair: 'amazing', age: 50, income: 200000, wife: 'hot'})
export class Boss {
}

@add_properties({address: '100 fleet street', income: 600000})
export class CEO extends Boss {
}

let ceo = new CEO();

console.log(ceo);
/*************
CEO {
  age: 50,
  address: '100 fleet street',
  hair: 'amazing',
  income: 600000,
  wife: 'hot' 
}
**************/
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
