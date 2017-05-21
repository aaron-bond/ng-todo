import { Component } from '@angular/core';

import { TodoStatusPipe } from 'pipes/todostatus.pipe';
import { TodoItemStatus } from "enums";

import { StorageHelper } from "../common/storage-helper";

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

	public TodoItems: TodoItem[] = [];
	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;

	public constructor(private storageHelper: StorageHelper) {
		this.TodoItems = this.storageHelper.TodoItems;
	}
}
