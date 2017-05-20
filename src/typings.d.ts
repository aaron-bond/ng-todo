/* SystemJS module definition */

declare var module: NodeModule;
interface NodeModule {
	id: string;
}

interface TodoItem {
	Title: string;
	Status: number;
	Modified?: Date;
}