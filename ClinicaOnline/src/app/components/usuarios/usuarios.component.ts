import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public listadoPacientes : Paciente[] = [];
  public listadoEsp : Especialista[] = [];

  constructor(public serv:UsuariosService) { 
  }

  ngOnInit(): void {
    this.serv.getPacientes().subscribe(paciente => {
      this.listadoPacientes = paciente;
    })
    this.serv.getEspecialistas().subscribe(esp => {
      this.listadoEsp = esp;
    })
  }

}
