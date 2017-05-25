import { Component } from '@angular/core';

import { TodoStatusPipe } from 'pipes/todostatus.pipe';
import { TodoItemStatus } from 'enums';

import { StorageHelper } from '../common/storage-helper';

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;

	public get TodoItems(): TodoItem[] {
		return this.storageHelper.TodoItems;
	}

	public constructor(private storageHelper: StorageHelper) {}

	public AddNewItem(title: string): void {
		this.storageHelper.AddNewItem(title);
	}

	public UpdateItem(id: string, status: TodoItemStatus): void {
		this.storageHelper.UpdateItem(id, status);
	}
}
