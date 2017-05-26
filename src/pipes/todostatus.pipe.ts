import { Pipe, PipeTransform } from '@angular/core';
import { TodoItemStatus } from 'enums';

/*
 * Returns the items which match the passed status
 * Takes a status argument that defaults to Active.
 * Usage:
 *   todoItems | todoItemStatus: TodoItemStatus
 * Example:
 *   {{ todoItems |  todoItemStatus:TodoItemStatus.Paused }}
*/
@Pipe({
	name: 'todoStatus',
	pure: false
})
export class TodoStatusPipe implements PipeTransform {
	public transform(items: TodoItem[], todoItemStatus: TodoItemStatus) {
		return items.filter(item => item.Status == todoItemStatus);
	}
}