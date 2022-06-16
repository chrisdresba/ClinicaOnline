import { TestBed } from '@angular/core/testing';

import { GuardianSesionactivaGuard } from './guardian-sesionactiva.guard';

describe('GuardianSesionactivaGuard', () => {
  let guard: GuardianSesionactivaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianSesionactivaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
