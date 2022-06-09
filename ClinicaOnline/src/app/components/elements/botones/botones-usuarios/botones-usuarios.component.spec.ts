import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesUsuariosComponent } from './botones-usuarios.component';

describe('BotonesUsuariosComponent', () => {
  let component: BotonesUsuariosComponent;
  let fixture: ComponentFixture<BotonesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
