import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InformesComponent } from './components/informes/informes.component';
import { LoginComponent } from './components/login/login.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GuardianAdminGuard } from './guards/guardian-admin.guard';
import { GuardianSesionactivaGuard } from './guards/guardian-sesionactiva.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ingreso',
    component : LoginComponent
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'registro',
    component :  RegistroComponent
  },
  {
    path: 'usuarios',
    component :  UsuariosComponent,
    canActivate: [GuardianAdminGuard]
  },
  {
  path: 'turnos',
    loadChildren: () => import('./components/turnos/turnos.module').then(m => m.TurnosModule)
  },
  {
    path: 'informes',
    component :  InformesComponent,
    canActivate: [GuardianAdminGuard]
  },
  {
    path: 'miperfil',
    component :  MiPerfilComponent,
    canActivate: [GuardianSesionactivaGuard]
  },
  {
    path: '**',
    component :  NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
