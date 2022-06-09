import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { AltaAdminComponent } from './components/alta-admin/alta-admin.component';
import { BotonesUsuariosComponent } from './components/elements/botones/botones-usuarios/botones-usuarios.component';
import { RecaptchaModule} from 'ng-recaptcha';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavComponent,
    UsuariosComponent,
    ListadoUsuariosComponent,
    AltaAdminComponent,
    BotonesUsuariosComponent,
    MiPerfilComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
