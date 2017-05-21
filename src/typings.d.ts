/* SystemJS module definition */

declare var module: NodeModule;
interface NodeModule {
	id: string;
}

interface TodoItem {
	Id: string;
	Title: string;
	Status: number;
	Modified?: Date;
}