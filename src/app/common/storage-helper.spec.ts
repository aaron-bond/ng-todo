import { TestBed, async, inject } from '@angular/core/testing';

import { StorageHelper  } from './storage-helper';
import { TodoItemStatus } from 'enums';

describe('StorageHelper', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({ providers: [StorageHelper] });

		let store = {};
		spyOn(localStorage, 'getItem').and.callFake(function (key) {
			return store[key] ? store[key] : null;
		});
		spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
			return store[key] = value + '';
		});
		spyOn(localStorage, 'clear').and.callFake(function () {
			store = {};
		});
	}));

	it('should initialise TodoItems to an empty array', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		expect(storageHelper.TodoItems).toBeTruthy();
		expect(storageHelper.TodoItems.length).toBe(0);
	})));

	it('should add an item to the array, and write to storage', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		storageHelper.AddNewItem('Tested todo item');

		// Set the todoItems to null so that they will be retrieved from storage (simulates app-load)
		storageHelper['todoItems'] = null;

		expect(storageHelper.TodoItems).toBeTruthy();
		expect(storageHelper.TodoItems.length).toBe(1);
	})));

	it('should set items to paused', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		let newItem = storageHelper.AddNewItem('Tested todo item');
		storageHelper.UpdateItem(newItem.Id, TodoItemStatus.Paused);

		let pausedItems = storageHelper.TodoItems.find(item => item.Status == TodoItemStatus.Paused);
		expect(pausedItems).toBeTruthy();
		expect(pausedItems.Title).toBe('Tested todo item');
	})));

	it('should set paused items to active the next day', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		let newItem = storageHelper.AddNewItem('Tested todo item');
		storageHelper.UpdateItem(newItem.Id, TodoItemStatus.Paused);

		// Set the todoItems to null so that they will be retrieved from storage (simulates app-load)
		storageHelper['todoItems'] = null;

		// Set the time to +24hours
		let tomorrow: Date = new Date();
		tomorrow.setHours(new Date().getHours() + 24);
		jasmine.clock().mockDate(tomorrow);

		let updatedItem = storageHelper.TodoItems.find(item => item.Title == 'Tested todo item');
		expect(updatedItem).toBeTruthy();
		expect(updatedItem.Status).toBe(TodoItemStatus.Active);
	})));

	it('should set items to important', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		let newItem = storageHelper.AddNewItem('Tested todo item');
		storageHelper.UpdateItem(newItem.Id, TodoItemStatus.Important);

		let importantItems = storageHelper.TodoItems.find(item => item.Status == TodoItemStatus.Important);
		expect(importantItems).toBeTruthy();
		expect(importantItems.Title).toBe('Tested todo item');
	})));

	it('should set items to completed', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		let newItem = storageHelper.AddNewItem('Tested todo item');
		storageHelper.UpdateItem(newItem.Id, TodoItemStatus.Completed);

		let completedItems = storageHelper.TodoItems.find(item => item.Status == TodoItemStatus.Completed);
		expect(completedItems).toBeTruthy();
		expect(completedItems.Title).toBe('Tested todo item');
	})));

	it('should remove completed items the next day', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
		let newItem = storageHelper.AddNewItem('Tested todo item');
		storageHelper.UpdateItem(newItem.Id, TodoItemStatus.Completed);

		// Set the todoItems to null so that they will be retrieved from storage (simulates app-load)
		storageHelper['todoItems'] = null;

		// Set the time to +24hours
		let tomorrow: Date = new Date();
		tomorrow.setHours(new Date().getHours() + 24);
		jasmine.clock().mockDate(tomorrow);

		expect(storageHelper.TodoItems).toBeTruthy();
		expect(storageHelper.TodoItems.length).toBe(0);
	})));
});
