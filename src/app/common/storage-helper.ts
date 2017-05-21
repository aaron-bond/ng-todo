import { Injectable, Output, EventEmitter } from '@angular/core';

import { TodoItemStatus } from "enums";

// This class acts as a singleton and can be injected into any component
@Injectable()
export class StorageHelper {

	private todoItems: TodoItem[];

	public get TodoItems(): TodoItem[] {
		if (!this.todoItems) {
			this.todoItems = this.readLocalStorage();

			let today = new Date();
			today.setHours(0, 0, 0, 0);

			this.todoItems.forEach(item => {
				if (today > new Date(item.Modified)) {

					if (item.Status == TodoItemStatus.Paused) {
						item.Status = TodoItemStatus.Active;
					} else if (item.Status == TodoItemStatus.Completed) {
						item.Status = TodoItemStatus.Removed;
					}
				}
			});

			this.todoItems = this.todoItems.filter(item => item.Status != TodoItemStatus.Removed);

			this.writeLocalStorage(this.todoItems);
		}

		return this.todoItems;
	}

	public AddNewItem(title: string): void {
		this.todoItems.push({ Id: this.generateId(), Title: title, Status: TodoItemStatus.Active });

		this.writeLocalStorage(this.todoItems);
	}

	public UpdateItem(id: string, status: TodoItemStatus): void {
		let item: TodoItem = this.todoItems.find(item => item.Id == id);

		if (item) {
			if (status == TodoItemStatus.Removed) {
				var index = this.todoItems.indexOf(item, 0);
				if (index > -1) {
					this.todoItems.splice(index, 1);
				}
			}

			item.Status = status;
			item.Modified = new Date();
			item.Modified.setHours(0, 0, 0, 0);
		}

		this.writeLocalStorage(this.todoItems);
	}

	private readLocalStorage(): TodoItem[] {
		let items: TodoItem[] = JSON.parse(localStorage.getItem('ng-todo-items'));
		return (items) ? items : [];
	}

	private writeLocalStorage(items: TodoItem[]): void {
		localStorage.setItem('ng-todo-items', JSON.stringify(items));
	}

	private generateId(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
}