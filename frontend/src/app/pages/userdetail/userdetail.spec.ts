import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userdetail } from './userdetail';

describe('Userdetail', () => {
  let component: Userdetail;
  let fixture: ComponentFixture<Userdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userdetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
