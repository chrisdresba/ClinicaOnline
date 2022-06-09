import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { Administrador } from 'src/app/class/administrador';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-botones-usuarios',
  templateUrl: './botones-usuarios.component.html',
  styleUrls: ['./botones-usuarios.component.scss']
})
export class BotonesUsuariosComponent implements OnInit {

  @Output() public usuarioSeleccionado : EventEmitter<any> = new EventEmitter<Especialista>();
  @Input() public pacientes? : Paciente[];
   @Input() public especialistas? : Especialista[];
   @Input() public admin? : Administrador[];
   constructor(public serv: UsuariosService) { 
    this.pacientes = [];
    this.especialistas = [];
    this.admin = [];
   }

  ngOnInit(): void {
  }

  eligeUsuario( user : any ) {
    this.usuarioSeleccionado.emit( user );
  }

}
