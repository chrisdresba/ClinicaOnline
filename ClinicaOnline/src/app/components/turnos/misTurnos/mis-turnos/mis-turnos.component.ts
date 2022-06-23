import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/class/turnos';
import { SesionService } from 'src/app/services/sesion.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;
  usuarioPaciente:boolean=false;

  constructor(public serv: TurnosService,public sesion: SesionService) { 
    this.turno = new Turnos();
  }

  ngOnInit(): void {
    if(this.sesion.sesionPaciente){
      this.usuarioPaciente = true
    }
   
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
  }


}