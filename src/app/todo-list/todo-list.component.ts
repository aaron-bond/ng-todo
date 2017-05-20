import { Component } from '@angular/core';

import { TodoStatusPipe } from 'pipes/todostatus.pipe';
import { TodoItemStatus } from "enums";

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

	public TodoItems: TodoItem[] = [];
	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;

	public constructor() {
		this.TodoItems = [{
			Title: "Create todo list",
			Status: TodoItemStatus.Active
		}, {
			Title: "Fix unit tests",
			Status: TodoItemStatus.Active
		}, {
			Title: "[Paused] Pick up groceries",
			Status: TodoItemStatus.Paused
		}, {
			Title: "[Paused] Cut grass",
			Status: TodoItemStatus.Paused
		}, {
			Title: "[Completed] Vacuum floors",
			Status: TodoItemStatus.Completed
		}, {
			Title: "[Completed] Put on clothes wash",
			Status: TodoItemStatus.Completed
		}];
	}
}
