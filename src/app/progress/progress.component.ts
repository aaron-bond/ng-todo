import { Component } from '@angular/core';
import { StorageHelper } from "../common/storage-helper";
import { TodoItemStatus } from "enums";

@Component({
	selector: 'todo-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

	private todoItems: TodoItem[];

	public get CompletePercentage(): number {
		if (this.todoItems.length == 0) {
			return 0;
		}

		let percentage = (this.todoItems.filter(item => item.Status == TodoItemStatus.Completed).length / this.todoItems.length) * 100;

		return percentage;
	}

	public get PausedPercentage(): number {
		if (this.todoItems.length == 0) {
			return 0;
		}

		let percentage = (this.todoItems.filter(item => item.Status == TodoItemStatus.Paused).length / this.todoItems.length) * 100;

		return percentage;
	}

	public get ImportantPercentage(): number {
		if (this.todoItems.length == 0) {
			return 0;
		}

		let percentage = (this.todoItems.filter(item => item.Status == TodoItemStatus.Important).length / this.todoItems.length) * 100;

		return percentage;
	}

	public constructor(private storageHelper: StorageHelper) {
		this.todoItems = this.storageHelper.TodoItems;
	}
}