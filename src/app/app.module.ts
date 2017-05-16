import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from "./header/header.component";

@NgModule({
	declarations: [
		ShellComponent,
		HeaderComponent
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
