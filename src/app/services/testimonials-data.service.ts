import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonials } from '../interface/testimonials';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsDataService {
  // Point to the file we need to get for the http fetch
  private _url: string = "../../assets/data/testimonials.json";

  constructor(private http: HttpClient) { }

  getData() : Observable<Testimonials[]> {
    return this.http.get<Testimonials[]>(this._url)
                    .catch(this.errorHandler)
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
