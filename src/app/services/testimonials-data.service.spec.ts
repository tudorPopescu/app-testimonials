import { TestBed } from '@angular/core/testing';

import { TestimonialsDataService } from './testimonials-data.service';

describe('TestimonialsDataService', () => {
  let service: TestimonialsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestimonialsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
