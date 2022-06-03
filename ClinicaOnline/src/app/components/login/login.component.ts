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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public load: boolean;
  formulario: FormGroup;
  public email?: string;
  public password?: string;

  constructor(public router: Router, public afAuth: AngularFireAuth, public fb: FormBuilder, public servUsuario: UsuariosService, public database: FirebaseService) {
    this.load = false;
    this.formulario = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    this.load = false;
  }

  async ingresar() {
    try {
      this.load = true;
  
      if (this.validarEmail(this.email!) && this.validarContraseña(this.password!)) {

        this.afAuth.signInWithEmailAndPassword(this.email!, this.password!).then(res => {
          if (this.servUsuario.userAdmin(this.email!)) {
            localStorage.setItem('perfilAdmin', 'admin');
          }
            setTimeout(() => { this.router.navigate(['/home']) }, 4000)
            
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Problemas con la conexión!'
          })
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
    }

  }

  async ingresarPaciente() {
    this.email = 'paciente@gmail.com';
    this.password = '123456';
  }

  async ingresarEspecialista() {
    this.email = 'especialista@gmail.com';
    this.password = '123456';
  }

  async ingresarAdmin() {
    this.email = 'admin@admin.com';
    this.password = '123456';
  }

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

}
