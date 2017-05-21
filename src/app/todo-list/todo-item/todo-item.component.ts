import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItemStatus } from 'enums';

@Component({
	selector: 'todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

	@Input()
	public IsNewItem: boolean = false;

	@Input()
	public TodoItem: TodoItem = { Id: "", Title: "", Status: TodoItemStatus.Active };

	@Output()
	public AddNewItem = new EventEmitter<string>();

	@Output()
	public UpdateItem = new EventEmitter<TodoItemStatus>();

	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;

	public HandleAddClick(): void {
		this.AddNewItem.emit(this.TodoItem.Title);
	}

	public HandleUpdateClick(status: TodoItemStatus): void {
		this.UpdateItem.emit(status);
	}
}
