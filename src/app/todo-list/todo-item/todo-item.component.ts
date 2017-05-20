import { Component, Input } from '@angular/core';
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
	public TodoItem: TodoItem;

	public TodoItemStatus: typeof TodoItemStatus = TodoItemStatus;
}
