import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  usuario: any;
  accion: any;
  public auth: boolean = false;

  constructor(public router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.auth = false;
        this.accion = 'Ingresar'
      } else {
        this.auth = true;
        this.accion = 'Cerrar sesión'
      }
    }
    )
  }

  async sesion() {
    this.router.navigate(['/ingreso']);
  }

  async cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('perfilAdmin')
      this.auth = false;
      this.router.navigate(['/home']);
    }).catch((error) => {

    });
  }

}
