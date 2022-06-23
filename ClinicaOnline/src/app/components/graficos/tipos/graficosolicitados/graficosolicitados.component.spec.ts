import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosolicitadosComponent } from './graficosolicitados.component';

describe('GraficosolicitadosComponent', () => {
  let component: GraficosolicitadosComponent;
  let fixture: ComponentFixture<GraficosolicitadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosolicitadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
