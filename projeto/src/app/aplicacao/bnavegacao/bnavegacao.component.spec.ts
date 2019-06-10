import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BnavegacaoComponent } from './bnavegacao.component';

describe('BnavegacaoComponent', () => {
  let component: BnavegacaoComponent;
  let fixture: ComponentFixture<BnavegacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnavegacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnavegacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
