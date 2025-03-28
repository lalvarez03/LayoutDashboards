/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HighchartsService } from './highcharts.service';

describe('Service: Highcharts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighchartsService]
    });
  });

  it('should ...', inject([HighchartsService], (service: HighchartsService) => {
    expect(service).toBeTruthy();
  }));
});
