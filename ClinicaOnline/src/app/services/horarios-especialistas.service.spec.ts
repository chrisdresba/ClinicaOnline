import { TestBed } from '@angular/core/testing';

import { HorariosEspecialistasService } from './horarios-especialistas.service';

describe('HorariosEspecialistasService', () => {
  let service: HorariosEspecialistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariosEspecialistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
