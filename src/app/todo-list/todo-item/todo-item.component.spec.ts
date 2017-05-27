import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoItemStatus } from 'enums';
import { CustomMatchers } from 'test';

describe('TodoItemComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TodoItemComponent
			],
			imports: [FormsModule]
		}).compileComponents();

		jasmine.addMatchers(CustomMatchers);
	}));

	it('should create the todo item', async(() => {
		let fixture = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent = fixture.debugElement.componentInstance;
		expect(todoItemComponent).toBeTruthy();
	}));

	it('should have new item area with an empty text area for user input', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsNewItem = true;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let textInput: HTMLInputElement = itemElement.querySelector('input[type=text]') as HTMLInputElement;

		expect(textInput).toBeTruthy();
	}));

	it('should show a "+" icon for new item entry', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsNewItem = true;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let addIcon: HTMLInputElement = itemElement.querySelector('.item-controls i') as HTMLInputElement;

		expect(addIcon).toBeTruthy();
		expect(addIcon.textContent).toBe('add');
		expect(addIcon).toBeVisible();
	}));

	it('should add a new item on "+" icon click', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsNewItem = true;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let textInput: HTMLInputElement = itemElement.querySelector('input[type=text]') as HTMLInputElement;
		let addIcon: HTMLInputElement = itemElement.querySelector('.item-controls i') as HTMLInputElement;
		spyOn(todoItemComponent.AddNewItem, 'emit');

		// Enter the todo item title into the textbox
		textInput.value = 'TodoItemTest';
		textInput.dispatchEvent(new Event('input'));

		// Detect changes so binding updates
		fixture.detectChanges();

		// Simulate the icon click event
		addIcon.click();

		// Expect the AddNewItem event o be raised off the todo item with the title of the item
		expect(todoItemComponent.AddNewItem.emit).toHaveBeenCalledWith('TodoItemTest');
	}));

	it('should add a new item on "enter" keypress', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsNewItem = true;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let textInput: HTMLInputElement = itemElement.querySelector('input[type=text]') as HTMLInputElement;
		spyOn(todoItemComponent.AddNewItem, 'emit');

		// Enter the todo item title into the textbox
		textInput.value = 'TodoItemTest';
		textInput.dispatchEvent(new Event('input'));

		// Detect changes so binding updates
		fixture.detectChanges();

		// Simulate "Enter" key being pressed on the field
		textInput.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));

		// Expect the AddNewItem event to be raised off the todo item with the title of the item
		expect(todoItemComponent.AddNewItem.emit).toHaveBeenCalledWith('TodoItemTest');
	}));

	it('should not show icons while not selected', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		expect(iconContainer).toBeHidden();
	}));

	it('should show icons when selected', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let itemContainer: HTMLDivElement = itemElement.querySelector('.item-container') as HTMLDivElement;
		itemContainer.click();

		expect(todoItemComponent.IsSelected).toBeTruthy();

		// Detect changes so binding updates
		fixture.detectChanges();

		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		expect(iconContainer).toBeVisible();
	}));

	it('should show "*", "x", "pause", "tick" icons for active items', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Active };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;

		expect(iconContainer.querySelector('.item-controls .important')).toBeTruthy();
		expect(iconContainer.querySelector('.important')).toBeVisible();

		expect(iconContainer.querySelector('.clear')).toBeTruthy();
		expect(iconContainer.querySelector('.clear')).toBeVisible();

		expect(iconContainer.querySelector('.pause')).toBeTruthy();
		expect(iconContainer.querySelector('.pause')).toBeVisible();

		expect(iconContainer.querySelector('.done')).toBeTruthy();
		expect(iconContainer.querySelector('.done')).toBeVisible();
	}));

	it('should show "x", "tick" icons for important items', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Important };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;

		expect(iconContainer.querySelector('.important')).toBeFalsy();
		expect(iconContainer.querySelector('.pause')).toBeFalsy();

		expect(iconContainer.querySelector('.clear')).toBeTruthy();
		expect(iconContainer.querySelector('.clear')).toBeVisible();

		expect(iconContainer.querySelector('.done')).toBeTruthy();
		expect(iconContainer.querySelector('.done')).toBeVisible();
	}));

	it('should show "x" icon for completed items', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Completed };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;

		expect(iconContainer.querySelector('.important')).toBeFalsy();
		expect(iconContainer.querySelector('.pause')).toBeFalsy();
		expect(iconContainer.querySelector('.done')).toBeFalsy();

		expect(iconContainer.querySelector('.clear')).toBeTruthy();
		expect(iconContainer.querySelector('.clear')).toBeVisible();
	}));

	it('should show "x" and "tick" icon for paused items', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Paused };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;

		expect(iconContainer.querySelector('.important')).toBeFalsy();
		expect(iconContainer.querySelector('.pause')).toBeFalsy();

		expect(iconContainer.querySelector('.clear')).toBeTruthy();
		expect(iconContainer.querySelector('.clear')).toBeVisible();

		expect(iconContainer.querySelector('.done')).toBeTruthy();
		expect(iconContainer.querySelector('.done')).toBeVisible();
	}));

	it('should make an active item important', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Active };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let importantIcon: HTMLSpanElement = iconContainer.querySelector('.important') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		importantIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Important);
	}));

	it('should make an active item paused', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Active };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let pauseIcon: HTMLSpanElement = iconContainer.querySelector('.pause') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		pauseIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Paused);
	}));

	it('should make an active item complete', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Active };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let doneIcon: HTMLSpanElement = iconContainer.querySelector('.done') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		doneIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Completed);
	}));

	it('should remove an active item', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Active };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let clearIcon: HTMLSpanElement = iconContainer.querySelector('.clear') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		clearIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Removed);
	}));

	it('should make an important item complete', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Important };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let doneIcon: HTMLSpanElement = iconContainer.querySelector('.done') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		doneIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Completed);
	}));

	it('should remove an important item', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Important };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let clearIcon: HTMLSpanElement = iconContainer.querySelector('.clear') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		clearIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Removed);
	}));

	it('should remove a complete item', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Completed };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let clearIcon: HTMLSpanElement = iconContainer.querySelector('.clear') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		clearIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Removed);
	}));

	it('should make a paused item complete', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Paused };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let doneIcon: HTMLSpanElement = iconContainer.querySelector('.done') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		doneIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Completed);
	}));

	it('should remove a paused item', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Paused };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		let iconContainer: HTMLSpanElement = itemElement.querySelector('.item-controls') as HTMLSpanElement;
		let clearIcon: HTMLSpanElement = iconContainer.querySelector('.clear') as HTMLSpanElement;
		spyOn(todoItemComponent.UpdateItem, 'emit');

		clearIcon.click();

		// Expect the UpdateItem event to be raised off the todo item with status being changed
		expect(todoItemComponent.UpdateItem.emit).toHaveBeenCalledWith(TodoItemStatus.Removed);
	}));

	it('should deselect any selected items on document click', async(() => {
		let fixture: ComponentFixture<TodoItemComponent> = TestBed.createComponent(TodoItemComponent);
		let todoItemComponent: TodoItemComponent = fixture.debugElement.componentInstance;

		todoItemComponent.IsSelected = true;
		todoItemComponent.TodoItem = { Id: 'mock0', Title: 'MockItem', Status: TodoItemStatus.Paused };
		fixture.detectChanges();

		let itemElement: HTMLElement = fixture.debugElement.nativeElement;
		document.getElementsByTagName('body')[0].click();

		fixture.detectChanges();

		expect(todoItemComponent.IsSelected).toBeFalsy();
	}));
});