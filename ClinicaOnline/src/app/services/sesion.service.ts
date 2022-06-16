import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  public usuario: any;
  public usuarioActivo?:boolean;
  public sesionAdmin?: boolean;
  public sesionEspecialista?: boolean;
  public sesionPaciente?: boolean;

  constructor(public afAuth: AngularFireAuth) { }

  public inicioUsuario(user: any) {
    this.usuario = user;
  }

  public logAdmin() {
    this.sesionAdmin = true;
  }

  public logoutAdmin() {
    this.sesionAdmin = false;
  }

  public logEspecialista() {
    this.sesionEspecialista = true;
  }

  public logoutEspecialista() {
    this.sesionEspecialista = false;
  }

  public logPaciente() {
    this.sesionPaciente = true;
  }

  public logoutPaciente() {
    this.sesionPaciente = false;
  }

  public sesionActiva() {
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        return false;
      } else {
        this.usuario = user;
        this.usuarioActivo = true;
        return true;
      }
    })
  }
} 