import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})

export class ListadoTurnosComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<Turnos>();
  @Input() public listadoTurnos?: Turnos[];
  public listadoFiltrado : Turnos[] = [];
  public usuarioLog:any;
  public usuario:any;

  constructor(public serv: TurnosService,public servUser:UsuariosService) {
  }

  async ngOnInit(){
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.servUser.traerUsuario(this.usuarioLog);
    }
  
    if(this.usuario.admin){
      this.serv.getTurnos().subscribe(turno => {
        this.listadoTurnos = turno;
      });
    }
    if(this.usuario.paciente){
      this.listadoTurnos = await this.serv.getTurnosPaciente(this.usuario.id);
    }
    if(this.usuario.especialista){
      this.listadoTurnos = await this.serv.getTurnosEspecialista(this.usuario.id);
    }

  }

 


  eligeTurno(turno: Turnos) {
    this.turnoSeleccionado.emit(turno);
  }

}
