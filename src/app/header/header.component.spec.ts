import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HeaderComponent
			]
		}).compileComponents();
	}));

	it('should create the header', async(() => {
		let fixture = TestBed.createComponent(HeaderComponent);
		let header = fixture.debugElement.componentInstance;
		expect(header).toBeTruthy();
	}));

	it(`should have a date property equal to today's date`, async(() => {
		let fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();

		let header: HeaderComponent = fixture.debugElement.componentInstance;
		let today: Date = new Date();

		expect(header.Today).toEqual(today);
	}));

	it('should render day of month in a span (format: 01)', async(() => {
		// Set date to Sunday 1st January, 2017
		jasmine.clock().mockDate(new Date('2017-01-01'));

		let fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();

		let headerElement: HTMLElement = fixture.debugElement.nativeElement;
		expect(headerElement.querySelector('#date').textContent).toBe('01');
	}));

	it('should render month of year in a span (format: Jan)', async(() => {
		// Set date to Sunday 1st January, 2017
		jasmine.clock().mockDate(new Date('2017-01-01'));

		let fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();

		let headerElement: HTMLElement = fixture.debugElement.nativeElement;
		expect(headerElement.querySelector('#month').textContent).toBe('Jan');
	}));

	it('should render year in a span (format: 2017)', async(() => {
		// Set date to Sunday 1st January, 2017
		jasmine.clock().mockDate(new Date('2017-01-01'));

		let fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();

		let headerElement: HTMLElement = fixture.debugElement.nativeElement;
		expect(headerElement.querySelector('#year').textContent).toBe('2017');
	}));

	it('should render day of week in a span (format: Monday)', async(() => {
		// Set date to Sunday 1st January, 2017
		jasmine.clock().mockDate(new Date('2017-01-01'));

		let fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
		fixture.detectChanges();

		let headerElement: HTMLElement = fixture.debugElement.nativeElement;
		expect(headerElement.querySelector('#day > span').textContent).toBe('Sunday');
	}));
});