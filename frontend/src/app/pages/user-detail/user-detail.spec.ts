import { TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // mock user ID
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserDetailComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
