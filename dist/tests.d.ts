export declare const attach_prefix: (arg: any) => Function;
export declare class Associate {
    company: any;
    name: string;
    constructor(company: any);
}
export declare class Employee extends Associate {
}
export declare const add_properties: (...decoratorArgs: any[]) => ClassDecorator;
export declare class Boss extends Employee {
    address: string;
}
export declare class CEO extends Boss {
}
export declare class Mogul extends CEO {
    constructor(company: any);
}
