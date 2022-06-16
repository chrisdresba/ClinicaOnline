import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosComponent } from './turnos.component';
import { TurnosRoutingModule } from './turnos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisTurnosComponent } from './misTurnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnosComponent } from './solicitar/solicitar-turnos/solicitar-turnos.component';
import { ListadoTurnosComponent } from './listado-turnos/listado-turnos.component';
import { TurnosPacientesComponent } from './turnos-pacientes/turnos-pacientes.component';
import { TurnosEspecialistasComponent } from './turnos-especialistas/turnos-especialistas.component';




@NgModule({
  declarations: [
    TurnosComponent,
    MisTurnosComponent,
    SolicitarTurnosComponent,
    ListadoTurnosComponent,
    TurnosPacientesComponent,
    TurnosEspecialistasComponent,
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TurnosModule { }
