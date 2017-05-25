import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { ProgressComponent } from './progress.component';
import { StorageHelper } from 'app/common/storage-helper';
import { TodoItemStatus } from 'enums';

class StorageHelperMock {
	public TodoItems: TodoItem[] = [{
		Id: 'mock0',
		Title: 'Item 0',
		Status: TodoItemStatus.Active
	}, {
		Id: 'mock1',
		Title: 'Item 1',
		Status: TodoItemStatus.Active
	}, {
		Id: 'mock2',
		Title: 'Item 2',
		Status: TodoItemStatus.Active
	}, {
		Id: 'mock3',
		Title: 'Item 3',
		Status: TodoItemStatus.Active
	}, {
		Id: 'mock4',
		Title: 'Item 4',
		Status: TodoItemStatus.Completed
	}, {
		Id: 'mock5',
		Title: 'Item 5',
		Status: TodoItemStatus.Completed
	}, {
		Id: 'mock6',
		Title: 'Item 6',
		Status: TodoItemStatus.Completed
	}, {
		Id: 'mock7',
		Title: 'Item 7',
		Status: TodoItemStatus.Paused
	}, {
		Id: 'mock8',
		Title: 'Item 8',
		Status: TodoItemStatus.Paused
	}, {
		Id: 'mock9',
		Title: 'Item 9',
		Status: TodoItemStatus.Important
	}];
}

describe('ProgressComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ProgressComponent
			],
			providers: [{ provide: StorageHelper, useClass: StorageHelperMock }]
		}).compileComponents();
	}));

	it('should create the progress bar', async(() => {
		let fixture = TestBed.createComponent(ProgressComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('should show 30% complete', async(() => {
		let fixture = TestBed.createComponent(ProgressComponent);
		let progress: ProgressComponent = fixture.debugElement.componentInstance;

		expect(progress.CompletePercentage).toBe(30);
	}));

	it('should show 20% paused', async(() => {
		let fixture = TestBed.createComponent(ProgressComponent);
		let progress: ProgressComponent = fixture.debugElement.componentInstance;

		expect(progress.PausedPercentage).toBe(20);
	}));

	it('should show 10% important', async(() => {
		let fixture = TestBed.createComponent(ProgressComponent);
		let progress: ProgressComponent = fixture.debugElement.componentInstance;

		expect(progress.ImportantPercentage).toBe(10);
	}));

	it('should render paused progress as 60% (paused + important + complete)', async(() => {
		let fixture: ComponentFixture<ProgressComponent> = TestBed.createComponent(ProgressComponent);
		fixture.detectChanges();

		let progressElement: HTMLElement = fixture.debugElement.nativeElement;
		let pausedSpan: HTMLSpanElement = progressElement.querySelector('#progress > .paused') as HTMLSpanElement;

		expect(pausedSpan.style.width).toBe('60%');
	}));

	it('should render completed progress as 40% (important + complete)', async(() => {
		let fixture: ComponentFixture<ProgressComponent> = TestBed.createComponent(ProgressComponent);
		fixture.detectChanges();

		let progressElement: HTMLElement = fixture.debugElement.nativeElement;
		let pausedSpan: HTMLSpanElement = progressElement.querySelector('#progress > .completed') as HTMLSpanElement;

		expect(pausedSpan.style.width).toBe('40%');
	}));

	it('should render important progress as 10%', async(() => {
		let fixture: ComponentFixture<ProgressComponent> = TestBed.createComponent(ProgressComponent);
		fixture.detectChanges();

		let progressElement: HTMLElement = fixture.debugElement.nativeElement;
		let pausedSpan: HTMLSpanElement = progressElement.querySelector('#progress > .important') as HTMLSpanElement;

		expect(pausedSpan.style.width).toBe('10%');
	}));
});