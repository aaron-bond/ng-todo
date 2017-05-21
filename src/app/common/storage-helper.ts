import { Injectable, Output, EventEmitter } from '@angular/core';

// This class acts as a singleton and can be injected into any component
@Injectable()
export class StorageHelper {

	private todoItems: TodoItem[];
	public get TodoItems(): TodoItem[] {
		if (!this.todoItems) {
			this.todoItems = this.ReadLocalStorage();
		}

		return this.todoItems;
	}

	public ReadLocalStorage(): TodoItem[] {
		let items: TodoItem[] = JSON.parse(localStorage.getItem('ng-todo-items'));
		return (items) ? items : [];
	}
	public WriteLocalStorage(items: TodoItem[]): void {
		localStorage.setItem('ng-todo-items', JSON.stringify(items));
	}
}