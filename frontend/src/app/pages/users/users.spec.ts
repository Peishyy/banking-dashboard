import { TestBed } from '@angular/core/testing';
import { UsersComponent } from './users'; // ✅ adjust path if needed
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientTestingModule] // ✅ use imports, not declarations
    }).compileComponents();
  });

  it('should create the UsersComponent', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize users as an empty array', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;
    expect(component.users).toEqual([]);
  });
});
