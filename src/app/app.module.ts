import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';

import { TestimonialsDataService } from  './services/testimonials-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TestimonialsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
