import { TestBed } from '@angular/core/testing';

import { GuardianAdminPacienteGuard } from './guardian-admin-paciente.guard';

describe('GuardianAdminPacienteGuard', () => {
  let guard: GuardianAdminPacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianAdminPacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
