import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router, UrlTree } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']);

    // Mock parseUrl to return a dummy UrlTree
    mockRouter.parseUrl.and.returnValue({ toString: () => '/login' } as unknown as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = guard.canActivate();
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/login');
    expect(result?.toString()).toBe('/login');
  });
});
