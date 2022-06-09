import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './misTurnos/mis-turnos/mis-turnos.component';
import { SolicitarTurnosComponent } from './solicitar/solicitar-turnos/solicitar-turnos.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
  {
    path: '',
    component:TurnosComponent,
  },
  {
    path: 'mis-turnos',
    component: MisTurnosComponent
  },
  {
    path: 'solicitar',
    component: SolicitarTurnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
