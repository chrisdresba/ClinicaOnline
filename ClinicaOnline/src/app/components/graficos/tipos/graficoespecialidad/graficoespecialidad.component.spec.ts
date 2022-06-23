import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoespecialidadComponent } from './graficoespecialidad.component';

describe('GraficoespecialidadComponent', () => {
  let component: GraficoespecialidadComponent;
  let fixture: ComponentFixture<GraficoespecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoespecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
