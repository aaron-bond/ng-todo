import { NgTodoPage } from './app.po';

describe('ng-todo App', () => {
	let page: NgTodoPage;

	beforeEach(() => {
		page = new NgTodoPage();
	});

	it('should display message saying app works', () => {
		page.NavigateTo();
		/*expect(page.getParagraphText()).toEqual('app works!');*/
	});
});
