import { TestBed } from '@angular/core/testing';

import { GuardianAdminGuard } from './guardian-admin.guard';

describe('GuardianAdminGuard', () => {
  let guard: GuardianAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
