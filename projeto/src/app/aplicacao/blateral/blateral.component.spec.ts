import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlateralComponent } from './blateral.component';

describe('BlateralComponent', () => {
  let component: BlateralComponent;
  let fixture: ComponentFixture<BlateralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlateralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
