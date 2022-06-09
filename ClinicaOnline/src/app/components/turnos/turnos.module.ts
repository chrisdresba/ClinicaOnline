import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosComponent } from './turnos.component';
import { TurnosRoutingModule } from './turnos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisTurnosComponent } from './misTurnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnosComponent } from './solicitar/solicitar-turnos/solicitar-turnos.component';



@NgModule({
  declarations: [
    TurnosComponent,
    MisTurnosComponent,
    SolicitarTurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TurnosModule { }
