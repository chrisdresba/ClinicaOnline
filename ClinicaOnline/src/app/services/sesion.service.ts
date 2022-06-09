import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

public usuario: any;  
public sesionAdmin?:boolean;
public sesionEspecialista?:boolean;
public sesionPaciente?:boolean;

  constructor() { }

  public inicioUsuario(user:any){
        this.usuario = user;
  }
  
  public logAdmin(){
    this.sesionAdmin = true;
  }

  public logoutAdmin(){
    this.sesionAdmin = false;
  }

  public logEspecialista(){
    this.sesionEspecialista = true;
  }

  public logoutEspecialista(){
    this.sesionEspecialista = false;
  }

  public logPaciente(){
    this.sesionPaciente = true;
  }

  public logoutPaciente(){
    this.sesionPaciente = false;
  }
} 