import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/class/turnos';
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

  constructor(public serv: TurnosService) { 
    this.turno = new Turnos();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
  }

  cancelarTurno() {
    this.turno.estado = 'cancelar';
    this.serv.actualizarEstado(this.turno!);
  }

}