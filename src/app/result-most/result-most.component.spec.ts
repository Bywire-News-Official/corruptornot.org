import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMostComponent } from './result-most.component';

describe('ResultMostComponent', () => {
  let component: ResultMostComponent;
  let fixture: ComponentFixture<ResultMostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultMostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
