import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authentifiactionGuard } from './authentifiaction.guard';

describe('authentifiactionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authentifiactionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
