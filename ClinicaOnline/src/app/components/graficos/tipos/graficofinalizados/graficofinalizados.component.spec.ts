import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficofinalizadosComponent } from './graficofinalizados.component';

describe('GraficofinalizadosComponent', () => {
  let component: GraficofinalizadosComponent;
  let fixture: ComponentFixture<GraficofinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficofinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficofinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
