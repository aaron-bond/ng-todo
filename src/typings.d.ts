/* SystemJS module definition */

declare var module: NodeModule;
interface NodeModule {
	id: string;
}

// Extending Jasmine tests
declare namespace jasmine {
	interface Matchers {
		toBeVisible(): boolean;
		toBeHidden(): boolean;
	}
}

interface TodoItem {
	Id: string;
	Title: string;
	Status: number;
	Modified?: Date;
}