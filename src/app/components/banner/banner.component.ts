import { Component, OnInit } from '@angular/core';
import { TestimonialsDataService } from '../../services/testimonials-data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public headers = {};
  public errorMsg = '';

  constructor(private _testimonialsService: TestimonialsDataService) { }

  ngOnInit(): void {
    this._testimonialsService.getData().subscribe(data => this.headers = data, error => this.errorMsg = error);
  }

}
