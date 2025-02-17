import { Component, OnInit } from '@angular/core';
import { TestimonialsDataService } from '../../services/testimonials-data.service';
import { Router } from '@angular/router';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  public allData: any = {};
  public filteredData: any[];
  public selectedFilter: any;

  constructor(public pagerService: PaginationService, private router: Router, private _testimonialsService: TestimonialsDataService) { }

  ngOnInit(): void {
    this._testimonialsService.getData().subscribe(data => {
      this.allData = data;
      this.filteredData = this.allData['user'];
      this.pagerService.setData(this.filteredData);
      this.router.navigate(['/country/all']);
      this.selectedFilter = '';
    });
  }

  onSelect(country) {
    this.selectedFilter = country.id;

    if (country.id == '') {
      this.filteredData = this.allData['user'];
      this.pagerService.setData(this.filteredData);
      this.router.navigate(['/country/all']);
    } else {
      this.filteredData = this.allData['user'].filter(c => c.countries.includes(country.id));
      this.pagerService.setData(this.filteredData);
      this.router.navigate(['/country', country.id]);
    }
  }
}
