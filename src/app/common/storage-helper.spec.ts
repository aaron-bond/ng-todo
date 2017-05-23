import { TestBed, async, inject } from '@angular/core/testing';

import { StorageHelper  } from './storage-helper';

describe('StorageHelper', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({ providers: [StorageHelper] });
    
		var store = {};
		spyOn(localStorage, 'getItem').and.callFake(function (key) {
			return store[key];
		});
		spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
			return store[key] = value + '';
		});
		spyOn(localStorage, 'clear').and.callFake((function () {
			store = {};
		});
	}));

	it('should initialise TodoItems to an empty array', async(inject([StorageHelper], (storageHelper: StorageHelper) => {    
	})));
		
	it('should add an item to the array, and write to storage', async(inject([StorageHelper], (storageHelper: StorageHelper) => {    
	})));
		
	it('should update item status to X', async(inject([StorageHelper], (storageHelper: StorageHelper) => {    
	})));
});
