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

	it('should do something', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
    
	})));
});
