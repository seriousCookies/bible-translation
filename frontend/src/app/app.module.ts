import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BibleBooksComponent } from './components/bible-books/bible-books.component';
import { FetchdataService } from './service/fetchdata.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BookChaptersComponent } from './components/book-chapters/book-chapters.component';
import { ChapterVersesComponent } from './components/chapter-verses/chapter-verses.component';

@NgModule({
  declarations: [
    AppComponent,
    BibleBooksComponent,
    BookChaptersComponent,
    ChapterVersesComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [FetchdataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
