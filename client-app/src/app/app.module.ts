import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';

import { TestimonialsDataService } from  './services/testimonials-data.service';
import { PaginationService } from './services/pagination.service';
import { AuthorComponent } from './components/author/author.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AuthorComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TestimonialsDataService, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
