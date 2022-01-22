import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultLeastComponent } from './result-least.component';

describe('ResultLeastComponent', () => {
  let component: ResultLeastComponent;
  let fixture: ComponentFixture<ResultLeastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultLeastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultLeastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
