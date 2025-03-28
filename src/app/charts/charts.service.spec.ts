/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartsService } from './charts.service';

describe('Service: Charts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartsService]
    });
  });

  it('should ...', inject([ChartsService], (service: ChartsService) => {
    expect(service).toBeTruthy();
  }));
});
