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
import { StorageService } from 'src/app/services/storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit {

  formulario: FormGroup;
  admin: Administrador;
  imagenes: any[] = [];
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
    })

    this.admin = new Administrador();
   
  }

  ngOnInit(): void {
   
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

  guardarAdmin() {
    try {
      const foto1 = this.formulario.value.foto1;
      const especialidad = this.formulario.value.especialidad;
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

            this.admin.iniciarAdmin(nombre, apellido, edad, dni, mail, foto1);
            this.servUser.saveAdmin(this.admin);
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
