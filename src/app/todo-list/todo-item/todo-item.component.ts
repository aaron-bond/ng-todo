import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TodoItemStatus } from 'enums';

@Component({
	selector: 'todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.scss'],
	host: {
		'(document:click)': 'clickAnywhere($event)'
	}
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
	public IsSelected: boolean = false;

	public constructor(private elementRef: ElementRef) { }

	public SelectItem(): void {
		this.IsSelected = true;
	}

	public HandleAddClick(): void {
		this.AddNewItem.emit(this.TodoItem.Title);

		// reset the textbox
		this.TodoItem = { Id: "", Title: "", Status: TodoItemStatus.Active };
	}

	public HandleUpdateClick(status: TodoItemStatus): void {
		this.UpdateItem.emit(status);
	}

	private clickAnywhere(event: MouseEvent): void {
		if (this.IsSelected && !this.elementRef.nativeElement.contains(event.target)) {
			this.IsSelected = false;
		}
	}
}
