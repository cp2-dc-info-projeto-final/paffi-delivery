import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaLojaComponent } from './minha-loja.component';

describe('MinhaLojaComponent', () => {
  let component: MinhaLojaComponent;
  let fixture: ComponentFixture<MinhaLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhaLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
