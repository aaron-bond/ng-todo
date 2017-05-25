import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoItemStatus } from 'enums';

describe('TodoItemComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TodoItemComponent
			],
			imports: [FormsModule]
		}).compileComponents();
	}));

	it('should create the todo item', async(() => {
		let fixture = TestBed.createComponent(TodoItemComponent);
		let todoItem = fixture.debugElement.componentInstance;
		expect(todoItem).toBeTruthy();
	}));

	it('should have an area to add a new item', async(() => {}));
	it('should have new item area with an empty text area for user input', async(() => {}));
	it('should add a new item on "+" icon click', async(() => {}));
	it('should add a new item on "enter" keypress', async(() => {}));

	it('should not show icons while not selected', async(() => {}));
	it('should show icons when selected', async(() => {}));
	it('should show "*", "x", "pause", "tick" icons for active items', async(() => {}));
	it('should show "x", "pause", "tick" icons for important items', async(() => {}));
	it('should show "x" icon for completed items', async(() => {}));
	it('should show "x" and "tick" icon for paused items', async(() => {}));

	it('should make an active item important', async(() => {}));
	it('should make an active item paused', async(() => {}));
	it('should make an active item complete', async(() => {}));
	it('should remove an active item', async(() => {}));

	it('should make an important item complete', async(() => {}));
	it('should make an important item paused', async(() => {}));
	it('should remove an important item', async(() => {}));

	it('should remove a complete item', async(() => {}));

	it('should make a paused item complete', async(() => {}));
	it('should remove an paused item', async(() => {}));
});