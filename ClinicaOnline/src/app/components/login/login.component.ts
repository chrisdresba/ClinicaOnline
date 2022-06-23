import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { FirebaseService } from './../../services/firebase.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SesionService } from 'src/app/services/sesion.service';
import { Paciente } from 'src/app/class/paciente';
import { Administrador } from 'src/app/class/administrador';
import { Especialista } from 'src/app/class/especialista';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public load?: boolean;
  formulario: FormGroup;
  public email?: string;
  public password?: string;
  public pacientes: Paciente [] = [];
  public especialistas: Especialista [] = [];
  public admin?: any;
  usuarioSeleccionado: any;

  constructor(public router: Router, public afAuth: AngularFireAuth,public sesion:SesionService, public fb: FormBuilder, public servUsuario: UsuariosService, public database: FirebaseService) {

    this.formulario = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    })

    setTimeout(()=>{
      this.load = false;
    },1000)

  }

  ngOnInit(): void {
    this.load = true;
    this.servUsuario.getPacientes().subscribe(paciente => {
      this.pacientes = paciente.slice(0,3);
    })
    this.servUsuario.getEspecialistas().subscribe(esp => {
      this.especialistas = esp.slice(0,2);
    })
    this.servUsuario.getAdministradores().subscribe(adm => {
      this.admin = adm.slice(0,1);
    })

  }

  async ingresar() {
    try {
  
      if (this.validarEmail(this.email!) && this.validarContraseña(this.password!)) {
        this.load = true;
        this.afAuth.signInWithEmailAndPassword(this.email!, this.password!).then(res => {
          this.guardarLog(this.email!);
          this.servUsuario.ingresoUsuario(this.email!);
            setTimeout(() => { this.router.navigate(['/home']) }, 3000)

        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Problemas con la conexión!'
          })
          this.load = false;
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'El usuario o la contraseña son incorrectos!'
        })
   
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
      this.load = false;
    }

  }

  async ingresoRapido(usuario:any){
    this.email = usuario.mail;
    this.password = '123456';
  };

  validarEmail(email: string) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  validarContraseña(contraseña: string) {
    if (contraseña.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  guardarLog(usuario: any) {

    var res = new Date();
    let fecha = res.getDate() + "/" + (res.getMonth() + 1) + "/" + res.getFullYear();
    let hora = res.getHours() + ":"+ res.getMinutes() + ":"+ res.getSeconds();

    let log = {
      'usuario': usuario,
      'fechaIngreso': fecha,
      'hora': hora
    }

    this.database.crearDatos(log);
  }

}
