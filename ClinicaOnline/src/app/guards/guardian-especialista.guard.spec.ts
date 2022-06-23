import { TestBed } from '@angular/core/testing';

import { GuardianEspecialistaGuard } from './guardian-especialista.guard';

describe('GuardianEspecialistaGuard', () => {
  let guard: GuardianEspecialistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianEspecialistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
