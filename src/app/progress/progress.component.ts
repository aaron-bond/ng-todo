import { Component } from '@angular/core';
import { StorageHelper } from "../common/storage-helper";

@Component({
	selector: 'todo-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

	private todoItems: TodoItem[];

	public constructor(private storageHelper: StorageHelper) {
		this.todoItems = this.storageHelper.TodoItems;
	}
}