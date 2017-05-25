import { FormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from 'app/todo-list/todo-item/todo-item.component';
import { StorageHelper } from 'app/common/storage-helper';
import { TodoStatusPipe } from 'pipes/todostatus.pipe';
import { TodoItemStatus } from 'enums';

class StorageHelperSpy {
	public TodoItems: TodoItem[] = [{
		Id: 'mock0',
		Title: 'Item 0',
		Status: TodoItemStatus.Active
	}, {
		Id: 'mock1',
		Title: 'Item 1',
		Status: TodoItemStatus.Completed
	}, {
		Id: 'mock2',
		Title: 'Item 2',
		Status: TodoItemStatus.Paused
	}, {
		Id: 'mock3',
		Title: 'Item 3',
		Status: TodoItemStatus.Important
	}];
	public AddNewItem: jasmine.Spy = jasmine.createSpy('AddNewItem').and.callFake((title: string) => { });
	public UpdateItem: jasmine.Spy = jasmine.createSpy('UpdateItem').and.callFake((id: string, status: TodoItemStatus) => { });
}

describe('TodoListComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				TodoListComponent,
				TodoItemComponent,
				TodoStatusPipe
			],
			providers: [{ provide: StorageHelper, useClass: StorageHelperSpy }],
			imports: [FormsModule]
		}).compileComponents();
	}));

	it('should create the todo list', async(() => {
		let fixture = TestBed.createComponent(TodoListComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('should expose the TodoItems from the storage helper', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;

		expect(todoList.TodoItems).toBeTruthy();
		expect(todoList.TodoItems.length).toBe(4);
	}));

	it('should call StorageHelper to add a new TodoItem', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let storageHelperMock: StorageHelperSpy = fixture.debugElement.injector.get(StorageHelper) as any;
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;

		todoList.AddNewItem('mock1');

		// Add should be called exactly 1 time
		expect(storageHelperMock.AddNewItem.calls.count()).toBe(1);
	}));

	it('should call StorageHelper to update an item', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let storageHelperMock: StorageHelperSpy = fixture.debugElement.injector.get(StorageHelper) as any;
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;

		todoList.UpdateItem('mock0', TodoItemStatus.Completed);

		// Add should be called exactly 1 time
		expect(storageHelperMock.UpdateItem.calls.count()).toBe(1);
	}));

	it('should have 5 todo items', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');
		expect(items.length).toBe(5);
	}));

	it('should have a blank todo item for user input', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');

		// There should be at least one todo item and the first one should be the blank field for user input
		expect(items.length).toBeGreaterThan(1);
		expect(items[0].classList.contains('new')).toBeTruthy();
	}));

	it('should show important items first', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');

		// There should be 5 todo items with the second on the list being the important item
		expect(items.length).toBe(5);
		expect(items[1].classList.contains('important')).toBeTruthy();
	}));

	it('should show active items second', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');

		// There should be 5 todo items with the third on the list being the active item
		expect(items.length).toBe(5);
		expect(items[2].classList.contains('active')).toBeTruthy();
	}));

	it('should show completed items third', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');

		// There should be 5 todo items with the fourth on the list being the complete item
		expect(items.length).toBe(5);
		expect(items[3].classList.contains('complete')).toBeTruthy();
	}));

	it('should show paused items items last', async(() => {
		let fixture: ComponentFixture<TodoListComponent> = TestBed.createComponent(TodoListComponent);
		let todoList: TodoListComponent = fixture.debugElement.componentInstance;
		fixture.detectChanges();

		let todoListElement: HTMLElement = fixture.debugElement.nativeElement;
		let items = todoListElement.querySelectorAll('.item-container');

		// There should be 5 todo items with the fifth on the list being the paused item
		expect(items.length).toBe(5);
		expect(items[4].classList.contains('paused')).toBeTruthy();
	}));
});