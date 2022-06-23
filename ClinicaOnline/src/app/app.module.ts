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
import { ListadoEspecialidadesComponent } from './components/listado-especialidades/listado-especialidades.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InformesComponent } from './components/informes/informes.component';
import { DnipipePipe } from './pipes/dnipipe.pipe';
import { HorariopipePipe } from './pipes/horariopipe.pipe';
import { NgChartsModule } from 'ng2-charts';
import { GraficosComponent } from './components/graficos/graficos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SoloNumerosDirective } from './directivas/solo-numeros.directive';
import { SoloLetrasDirective } from './directivas/solo-letras.directive';
import { NotimageDirective } from './directivas/notimage.directive';
import { GraficoespecialidadComponent } from './components/graficos/tipos/graficoespecialidad/graficoespecialidad.component';
import { GraficodiarioComponent } from './components/graficos/tipos/graficodiario/graficodiario.component';
import { GraficosolicitadosComponent } from './components/graficos/tipos/graficosolicitados/graficosolicitados.component';
import { GraficofinalizadosComponent } from './components/graficos/tipos/graficofinalizados/graficofinalizados.component';


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
    ListadoEspecialidadesComponent,
    InformesComponent,
    DnipipePipe,
    HorariopipePipe,
    GraficosComponent,
    NotFoundComponent,
    SoloNumerosDirective,
    SoloLetrasDirective,
    NotimageDirective,
    GraficoespecialidadComponent,
    GraficodiarioComponent,
    GraficosolicitadosComponent,
    GraficofinalizadosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AppRoutingModule,
    NgChartsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
