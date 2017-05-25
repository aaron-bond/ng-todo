import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from '../header/header.component';

describe('ShellComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ShellComponent,
				HeaderComponent
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(ShellComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
