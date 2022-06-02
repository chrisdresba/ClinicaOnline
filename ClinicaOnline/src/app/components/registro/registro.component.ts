import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  paciente: Paciente
  especialista: Especialista
  formulario: FormGroup;
  formularioAux: FormGroup;
  imagenes: any[] = [];
  auth?: boolean;
  especialidades: string[] = [
    'Traumatologo',
    'Pediatra',
    'Oftalmologo',
    'Odontologo',
  ];


  constructor(public storage: StorageService, public fb: FormBuilder, public router: Router, public afAuth: AngularFireAuth, public servUser: UsuariosService) {
    this.formulario = this.fb.group({
      'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'apellido': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'obraSocial': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'foto1': new FormControl("", Validators.required),
      'foto2': new FormControl("", Validators.required),
      'especialidad': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    })
    this.formularioAux = this.formulario;
    this.paciente = new Paciente();
    this.especialista = new Especialista();
  }

  ngOnInit(): void {
    this.auth = false;
   
  }


  async subirArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imagenes.push(reader.result);
        this.storage.subirImagen(this.formulario.value.dni + "_" + Date.now(), reader.result).then(urlImagen => {

          setTimeout(() => {
            if (!this.formulario.value.foto1) {
              this.formulario.value.foto1 = this.imagenes[0];
            } else {
              this.formulario.value.foto2 = this.imagenes[0];
            }
            this.imagenes = [];
          }, 3000)
        });
      }
    }
  }

     

  guardarPaciente() {
    try {
      const foto1 = this.formulario.value.foto1;
      const foto2 = this.formulario.value.foto2;
      const obraSocial = this.formulario.value.obraSocial;
      const dni = this.formulario.value.dni;
      const nombre = this.formulario.value.nombre;
      const apellido = this.formulario.value.apellido;
      const mail = this.formulario.value.mail;
      const edad = this.formulario.value.edad;
      const password = this.formulario.value.password;

      if (
        !nombre ||
        !apellido ||
        (!(edad < 120 && edad >= 18)) ||
        (!(dni < 99999999 && dni >= 1000000)) ||
        !obraSocial ||
        !mail ||
        !password ||
        !foto1 ||
        !foto2
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Debe ingresar todos los datos',
          showConfirmButton: false,
          timer: 1500,
        });
    
      } else {

        if (this.validarEmail(mail) && this.validarContraseña(password)) {

          this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {
            const uid = res.user?.uid;
            this.paciente.iniciarPaciente(nombre, apellido, edad, dni, obraSocial, mail, foto1, foto2);
            this.servUser.createDoc(this.paciente,'pacientes',uid!);
            this.reiniciarValores();
            Swal.fire({
              icon: 'success',
              title: 'La cuenta fue creada con exito',
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000)

          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'El usuario o la contraseña son incorrectos!'
            })
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El usuario o la contraseña son incorrectos!'
          })
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }
  }

  guardarEspecialista() {
    try {
      const foto1 = this.formularioAux.value.foto1;
      const especialidad = this.formularioAux.value.especialidad;
      const dni = this.formularioAux.value.dni;
      const nombre = this.formularioAux.value.nombre;
      const apellido = this.formularioAux.value.apellido;
      const mail = this.formularioAux.value.mail;
      const edad = this.formularioAux.value.edad;
      const password = this.formularioAux.value.password;

      if (
        !nombre ||
        !apellido ||
        (!(edad < 120 && edad >= 18)) ||
        (!(dni < 99999999 && dni >= 1000000)) ||
        !especialidad ||
        !mail ||
        !password ||
        !foto1 
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Debe ingresar todos los datos',
          showConfirmButton: false,
          timer: 1500,
        });
    
      } else {

        if (this.validarEmail(mail) && this.validarContraseña(password)) {

          this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {

            this.especialista.iniciarEspecialista(nombre, apellido, edad, dni,especialidad, mail, foto1);
            this.servUser.saveEspecialista(this.especialista);
            this.reiniciarValores();
            Swal.fire({
              icon: 'success',
              title: 'La cuenta fue creada con exito',
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 3000)

          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'El usuario o la contraseña son incorrectos!'
            })
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'El usuario o la contraseña son incorrectos!'
          })
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }
  }

  reiniciarValores() {
  }

  setPaciente() {
    this.auth = false;
    this.reiniciarValores();
  }

  setEspecialista() {
    this.auth = true;
    this.reiniciarValores();
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
