import { TestBed } from '@angular/core/testing';

import { GuardianEspecialistaPacienteGuard } from './guardian-especialista-paciente.guard';

describe('GuardianEspecialistaPacienteGuard', () => {
  let guard: GuardianEspecialistaPacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianEspecialistaPacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
