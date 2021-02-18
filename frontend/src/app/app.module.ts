import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BibleBooksComponent } from './components/bible-books/bible-books.component';
import {FetchdataService} from "./service/fetchdata.service"
@NgModule({
  declarations: [
    AppComponent,
    BibleBooksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [FetchdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
