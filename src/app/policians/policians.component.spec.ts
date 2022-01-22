import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciansComponent } from './policians.component';

describe('PoliciansComponent', () => {
  let component: PoliciansComponent;
  let fixture: ComponentFixture<PoliciansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
