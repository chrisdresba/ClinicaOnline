import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/class/administrador';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  paciente: Paciente
  especialista: Especialista
  administrador: Administrador
  formulario: FormGroup;
  formularioAux: FormGroup;
  formularioAdmin: FormGroup;
  imagenes: any[] = [];
  pac?: boolean;
  esp?: boolean;
  adm?: boolean;
  imagenDosUrl: any;
  imagenUnoUrl: any;
  captcha: string | undefined;
  validado: boolean = false;
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
    this.formularioAdmin = this.formulario;
    this.paciente = new Paciente();
    this.especialista = new Especialista();
    this.administrador = new Administrador();
  }

  ngOnInit(): void {
    this.pac = false;
    this.esp = true;
    this.adm = true;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.validado = true;
  }


  async subirArchivo1(event: any) {
    const email = this.formulario.value.mail;
    const file = event.target.files[0];
    const imagenUnoNombre = email + "_1";
    if (file) {
      const tareaImagenUno = this.storage.subirImagen(imagenUnoNombre, file);
      tareaImagenUno.then((termino) => termino.ref.getDownloadURL().then((URL) => {
        this.imagenUnoUrl = URL;
      }))
    }
  }

  async subirArchivo2(event: any) {
    const email = this.formulario.value.mail;
    const file = event.target.files[0];
    const imagenUnoNombre = email + "_2";
    if (file) {
      const tareaImagenUno = this.storage.subirImagen(imagenUnoNombre, file);
      tareaImagenUno.then((termino) => termino.ref.getDownloadURL().then((URL) => {
        this.imagenDosUrl = URL;
      }))
    }
  }




  guardarPaciente() {
    try {
      const foto1 = this.imagenUnoUrl;
      const foto2 = this.imagenDosUrl;
      const obraSocial = this.formulario.value.obraSocial;
      const dni = this.formulario.value.dni;
      const nombre = this.formulario.value.nombre;
      const apellido = this.formulario.value.apellido;
      const mail = this.formulario.value.mail;
      const edad = this.formulario.value.edad;
      const password = this.formulario.value.password;
      console.log(nombre + apellido + edad + dni + obraSocial + mail + password)
      console.log(foto1)
      console.log(foto2)

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

        if (this.validado == false) {
          Swal.fire({
            icon: 'warning',
            title: 'Debe validar el captcha',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {

          if (this.validarEmail(mail) && this.validarContraseña(password)) {

            this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {
              const uid = res.user?.uid;
              this.paciente.iniciarPaciente(uid!, nombre, apellido, edad, dni, obraSocial, mail, foto1, foto2);
              this.servUser.savePaciente(this.paciente);
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
      const foto1 = this.imagenUnoUrl;
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

        if (this.validado == false) {
          Swal.fire({
            icon: 'warning',
            title: 'Debe validar el captcha',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {

          if (this.validarEmail(mail) && this.validarContraseña(password)) {

            this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {
              const uid = res.user?.uid;
              this.especialista.iniciarEspecialista(uid!, nombre, apellido, edad, dni, especialidad, mail, foto1);
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
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }
  }

  guardarAdmin() {
    try {
      const foto1 = this.imagenUnoUrl;
      const dni = this.formularioAdmin.value.dni;
      const nombre = this.formularioAdmin.value.nombre;
      const apellido = this.formularioAdmin.value.apellido;
      const mail = this.formularioAdmin.value.mail;
      const edad = this.formularioAdmin.value.edad;
      const password = this.formularioAdmin.value.password;

      if (
        !nombre ||
        !apellido ||
        (!(edad < 120 && edad >= 18)) ||
        (!(dni < 99999999 && dni >= 1000000)) ||
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

        if (this.validado == false) {
          Swal.fire({
            icon: 'warning',
            title: 'Debe validar el captcha',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {

          if (this.validarEmail(mail) && this.validarContraseña(password)) {

            this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {
              const uid = res.user?.uid;
              this.administrador.iniciarAdmin(uid!, nombre, apellido, edad, dni, mail, foto1);
              this.servUser.saveAdmin(this.administrador);
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
    this.validado = false;
  }

  setPaciente() {
    this.pac = false;
    this.esp = true;
    this.adm = true;
    this.reiniciarValores();
  }

  setEspecialista() {
    this.esp = false;
    this.pac = true;
    this.adm = true;
    this.reiniciarValores();
  }

  setAdmin() {
    this.adm = false;
    this.esp = true;
    this.pac = true;
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

