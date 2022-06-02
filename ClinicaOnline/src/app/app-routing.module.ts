import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GuardianAdminGuard } from './guards/guardian-admin.guard';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
