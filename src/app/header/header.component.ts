import { Component } from '@angular/core';

@Component({
	selector: 'todo-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	public Today: Date = new Date();
}