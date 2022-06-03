import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

 @Input() public listadoPacientes? : Paciente[];
  @Input() public listadoEsp? : Especialista[];
  constructor(public serv: UsuariosService) { 
   this.listadoPacientes = [];
   this.listadoEsp = [];
  }

  ngOnInit(): void {
   
  }

}