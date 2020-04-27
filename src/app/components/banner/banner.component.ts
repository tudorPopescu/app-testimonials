import { Component, OnInit, Input } from '@angular/core';
import { TestimonialsDataService } from '../../services/testimonials-data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() allData: any = {};
  @Input() bannerData: any;

  public errorMsg: string = '';

  constructor(private _testimonialsService: TestimonialsDataService) {}

  ngOnInit(): void {
    this._testimonialsService.getData().subscribe(data => this.allData = data, error => this.errorMsg = error);
    this.bannerData = '';
  }
}
