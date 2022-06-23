import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianAdminPacienteGuard } from 'src/app/guards/guardian-admin-paciente.guard';
import { GuardianAdminGuard } from 'src/app/guards/guardian-admin.guard';
import { GuardianEspecialistaPacienteGuard } from 'src/app/guards/guardian-especialista-paciente.guard';
import { GuardianEspecialistaGuard } from 'src/app/guards/guardian-especialista.guard';
import { MisTurnosComponent } from './misTurnos/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { SolicitarTurnosComponent } from './solicitar/solicitar-turnos/solicitar-turnos.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
  {
    path: '',
    component:TurnosComponent,
    canActivate: [GuardianAdminGuard]
  },
  {
    path: 'mis-turnos',
    component: MisTurnosComponent,
    canActivate: [GuardianEspecialistaPacienteGuard]
  },
  {
    path: 'solicitar',
    component: SolicitarTurnosComponent,
    canActivate: [GuardianAdminPacienteGuard]
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [GuardianEspecialistaGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
