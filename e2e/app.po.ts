import { browser, by, element } from 'protractor';

export class NgTodoPage {
	public NavigateTo() {
		return browser.get('/');
	}

	/*public get ParagraphText(): Promise<string> {
		return element(by.css('app-root h1')).getText();
	}*/
}
