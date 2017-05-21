import { Component, ChangeDetectorRef } from '@angular/core';

import { TodoStatusPipe } from 'pipes/todostatus.pipe';
import { TodoItemStatus } from "enums";

import { StorageHelper } from "../common/storage-helper";

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

	public TodoItems: TodoItem[];

	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;

	public constructor(private storageHelper: StorageHelper, private ref: ChangeDetectorRef) {
		this.TodoItems = this.storageHelper.TodoItems;
	}

	public AddNewItem(title: string): void {
		this.storageHelper.AddNewItem(title);
	}

	public UpdateItem(id: string, status: TodoItemStatus): void {
		this.storageHelper.UpdateItem(id, status);
	}

	// TESTING //
	public testing(): void {
		this.storageHelper.AddNewItem("Clean living room");
		this.storageHelper.AddNewItem("Vacuum bedrooms");
		this.storageHelper.AddNewItem("Get groceries");
		this.storageHelper.AddNewItem("Finish revision");
		this.storageHelper.AddNewItem("Prepare lunch");
		this.storageHelper.AddNewItem("Walk dog");
	}

	public clear(): void {
		localStorage.clear();
	}
}
