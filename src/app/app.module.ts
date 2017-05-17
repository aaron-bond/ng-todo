import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from "./header/header.component";
import { ProgressComponent } from "./progress/progress.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoItemComponent } from "./todo-list/todo-item/todo-item.component";

@NgModule({
	declarations: [
		ShellComponent,
		HeaderComponent,
		ProgressComponent,
		TodoListComponent,
		TodoItemComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [ShellComponent]
})
export class AppModule { }
