import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficodiarioComponent } from './graficodiario.component';

describe('GraficodiarioComponent', () => {
  let component: GraficodiarioComponent;
  let fixture: ComponentFixture<GraficodiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficodiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficodiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
