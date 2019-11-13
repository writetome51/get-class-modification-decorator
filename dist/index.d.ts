export declare function getClassModificationDecorator(
	modifyInstance: (instance: any, decoratorArgs: any[]) => void
): (...decoratorArgs: any[]) => (target: any) => any;
