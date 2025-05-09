/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnchoComponenteService } from './ancho-componente.service';

describe('Service: AnchoComponente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnchoComponenteService]
    });
  });

  it('should ...', inject([AnchoComponenteService], (service: AnchoComponenteService) => {
    expect(service).toBeTruthy();
  }));
});
