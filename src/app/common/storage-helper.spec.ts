import { TestBed, async } from '@angular/core/testing';

import { StorageHelper  } from './storage-helper';

describe('StorageHelper', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({ providers: [StorageHelper] });
    
		var store = {};
		spyOn(localStorage, 'getItem').andCallFake(function (key) {
			return store[key];
		});
		spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
			return store[key] = value + '';
		});
		spyOn(localStorage, 'clear').andCallFake(function () {
			store = {};
		});
	}));

	it('should do something', async(inject([StorageHelper], (storageHelper: StorageHelper) => {
    
	})));
});
